import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireClient, canAccessAssessment } from "@/middleware/auth";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import Stripe from 'stripe';

// Validate Stripe configuration
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-08-26.dahlia',
});

// Define allowed consultation types and their prices
const CONSULTATION_PRICES: Record<string, number> = {
  'discovery': 0,
  'behavior-essentials': 270,
  'behavior-intensive': 470,
  'puppy-foundations': 220,
};

/**
 * POST /api/client/upgrade-plan
 * 
 * SECURITY: 
 * - Uses JWT authentication
 * - Validates user owns the assessment
 * - Verifies payment amount server-side
 * - Validates payment intent with Stripe
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Verify authentication and get user from JWT
    const user = await requireClient(request);
    if (user instanceof NextResponse) {
      return user; // Return error response
    }

    const body = await request.json();
    const { consultationType, paymentIntentId, paymentAmount, tipAmount = 0 } = body;

    // Input validation
    if (!consultationType) {
      return NextResponse.json(
        { error: "Consultation type is required" },
        { status: 400 }
      );
    }

    // SECURITY: Validate consultation type
    if (!(consultationType in CONSULTATION_PRICES)) {
      return NextResponse.json(
        { error: "Invalid consultation type" },
        { status: 400 }
      );
    }

    // SECURITY: Validate amount matches consultation type
    const expectedBaseAmount = CONSULTATION_PRICES[consultationType];
    const expectedTotalAmount = expectedBaseAmount + tipAmount;
    
    if (Math.abs(paymentAmount - expectedTotalAmount) > 0.01) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    // Validate tip amount
    if (tipAmount < 0 || tipAmount > 100) {
      return NextResponse.json(
        { error: "Invalid tip amount" },
        { status: 400 }
      );
    }

    await connectDB();

    // SECURITY: Use assessmentId from verified JWT
    const assessment = await Appointment.findById(user.assessmentId);
    
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    // SECURITY: Double-check user owns this assessment
    if (!canAccessAssessment(user, assessment._id.toString())) {
      return NextResponse.json(
        { error: "Unauthorized access to assessment" },
        { status: 403 }
      );
    }

    // SECURITY: If payment required, verify payment intent with Stripe
    if (paymentIntentId && expectedTotalAmount > 0) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        // Verify payment intent is valid and succeeded
        if (paymentIntent.status !== 'succeeded') {
          return NextResponse.json(
            { error: "Payment has not been completed" },
            { status: 400 }
          );
        }

        // Verify amount matches
        const paidAmount = paymentIntent.amount / 100; // Convert from cents
        if (Math.abs(paidAmount - expectedTotalAmount) > 0.01) {
          console.error(
            `Payment amount mismatch: Expected ${expectedTotalAmount}, paid ${paidAmount}`
          );
          return NextResponse.json(
            { error: "Payment amount mismatch" },
            { status: 400 }
          );
        }
      } catch (stripeError) {
        console.error("Stripe verification error:", stripeError);
        return NextResponse.json(
          { error: "Failed to verify payment" },
          { status: 400 }
        );
      }
    }

    // Update the assessment with new plan
    assessment.consultationType = consultationType;
    assessment.paymentIntentId = paymentIntentId;
    assessment.paymentAmount = expectedTotalAmount; // Use server-validated amount
    assessment.tipAmount = tipAmount;
    assessment.paymentStatus = paymentIntentId && expectedTotalAmount > 0 ? "succeeded" : 
                                expectedTotalAmount > 0 ? "pending" : "succeeded";
    assessment.paymentDate = new Date();
    
    await assessment.save();

    return NextResponse.json({
      success: true,
      message: "Plan upgraded successfully",
    });
  } catch (error) {
    console.error("Upgrade plan error:", error);
    return NextResponse.json(
      { error: "Failed to upgrade plan" },
      { status: 500 }
    );
  }
}
