"use client";

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  consultationType: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

export function StripePaymentForm({ 
  amount, 
  consultationType,
  onPaymentSuccess, 
  onPaymentError 
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/book/confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onPaymentError(error.message || 'Payment failed');
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (err) {
      onPaymentError('An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Amount Display */}
      <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-600">Total Amount</p>
              <p className="text-2xl font-bold text-primary-900">£{amount.toFixed(2)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-ink-500 mb-1">Consultation Type</p>
            <p className="text-sm font-semibold text-primary-900 capitalize">
              {consultationType.replace('-', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Element */}
      <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-green-600" strokeWidth={2.5} />
          <span className="text-xs font-semibold text-ink-600">Secure Payment</span>
        </div>
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
        className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all shadow-lg ${
          isProcessing || !stripe
            ? 'bg-ink-300 text-ink-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-700 to-primary-900 text-white hover:shadow-xl'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay £${amount.toFixed(2)} & Complete Booking`
        )}
      </motion.button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink-500">
        <Lock className="w-3 h-3" />
        <span>Powered by Stripe • Your payment information is secure</span>
      </div>
    </form>
  );
}
