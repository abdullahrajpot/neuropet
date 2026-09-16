import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// SECURITY: No fallback key - requires proper configuration
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "FATAL: STRIPE_SECRET_KEY environment variable is not configured. " +
    "Application cannot process payments without proper Stripe configuration."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-08-26.dahlia',
});

// Define allowed consultation types and their prices
const CONSULTATION_PRICES: Record<string, number> = {
  'discovery': 0, // Free
  'behavior-essentials': 270,
  'behavior-intensive': 470,
  'puppy-foundations': 220,
};

/**
 * POST /api/create-payment-intent
 * 
 * SECURITY: Validates amounts server-side, prevents price manipulation
 * Public endpoint but with server-side validation
 */
export async function POST(req: NextRequest) {
  try {
    const { amount, consultationType, customerEmail, customerName, tipAmount = 0 } = await req.json();

    // Input validation
    if (!consultationType || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // SECURITY: Validate consultation type exists
    if (!(consultationType in CONSULTATION_PRICES)) {
      return NextResponse.json(
        { error: 'Invalid consultation type' },
        { status: 400 }
      );
    }

    // SECURITY: Validate amount matches consultation type
    const expectedBaseAmount = CONSULTATION_PRICES[consultationType];
    const expectedTotalAmount = expectedBaseAmount + tipAmount;
    
    if (Math.abs(amount - expectedTotalAmount) > 0.01) { // Allow for floating point precision
      console.error(
        `Price manipulation attempt: Expected ${expectedTotalAmount}, got ${amount} ` +
        `for ${consultationType} with tip ${tipAmount}`
      );
      return NextResponse.json(
        { error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Validate tip amount is reasonable (0-100)
    if (tipAmount < 0 || tipAmount > 100) {
      return NextResponse.json(
        { error: 'Invalid tip amount' },
        { status: 400 }
      );
    }

    // If it's a free consultation, no payment needed
    if (expectedTotalAmount === 0) {
      return NextResponse.json({ 
        clientSecret: null,
        requiresPayment: false 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // SECURITY: Use server-validated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(expectedTotalAmount * 100), // Use validated amount
      currency: 'gbp',
      metadata: {
        consultationType,
        customerEmail,
        customerName,
        baseAmount: expectedBaseAmount.toString(),
        tipAmount: tipAmount.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
      description: `NeuroPet ${consultationType} consultation${tipAmount > 0 ? ` + £${tipAmount} tip` : ''}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      requiresPayment: true,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
