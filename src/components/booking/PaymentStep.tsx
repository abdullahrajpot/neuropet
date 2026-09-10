"use client";

import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Load Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentStepProps {
  amount: number;
  consultationType: string;
  customerEmail: string;
  customerName: string;
  onPaymentComplete: (paymentIntentId?: string) => void;
}

export function PaymentStep({ 
  amount, 
  consultationType,
  customerEmail,
  customerName,
  onPaymentComplete 
}: PaymentStepProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [requiresPayment, setRequiresPayment] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            consultationType,
            customerEmail,
            customerName,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to initialize payment');
        }

        setClientSecret(data.clientSecret);
        setRequiresPayment(data.requiresPayment);
        setLoading(false);

        // If no payment required (free consultation), complete immediately
        if (!data.requiresPayment) {
          setTimeout(() => {
            setPaymentSuccess(true);
            setTimeout(() => onPaymentComplete(), 1500);
          }, 500);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize payment');
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, consultationType, customerEmail, customerName, onPaymentComplete]);

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentSuccess(true);
    setTimeout(() => onPaymentComplete(paymentIntentId), 1500);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="animate-spin h-12 w-12 text-primary-700 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-ink-600 font-semibold">Preparing payment...</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-primary-900 mb-2">
          {requiresPayment ? 'Payment Successful!' : 'Booking Confirmed!'}
        </h3>
        <p className="text-ink-600">Completing your booking...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-50 border-2 border-red-200 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <h3 className="font-bold text-red-900 mb-2">Payment Error</h3>
            <p className="text-sm text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Free consultation - no payment required
  if (!requiresPayment) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <CheckCircle className="w-12 h-12 text-primary-700" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-primary-900 mb-2">Free Consultation</h3>
        <p className="text-ink-600">No payment required for this booking</p>
      </div>
    );
  }

  // Stripe payment form
  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#1E4A40',
        colorBackground: '#ffffff',
        colorText: '#2c2438',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl text-primary-900 mb-2">Complete Your Payment</h3>
        <p className="text-ink-600">Secure payment powered by Stripe</p>
      </div>

      <Elements options={options} stripe={stripePromise}>
        <StripePaymentForm
          amount={amount}
          consultationType={consultationType}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </Elements>
    </div>
  );
}
