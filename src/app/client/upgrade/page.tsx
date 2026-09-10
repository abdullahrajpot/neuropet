"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, CreditCard, Sparkles, Clock, ArrowRight, Shield } from "lucide-react";
import { PaymentStep } from "@/components/booking/PaymentStep";

const PLANS = [
  {
    id: "behavior-essentials",
    name: "Behaviour Essentials",
    price: 270,
    duration: "30 Days",
    color: "from-primary-700 to-primary-900",
    badge: "Most Popular",
    features: [
      "2× One-to-One Video Calls",
      "Personalised Behaviour Plan",
      "30 Days WhatsApp Support",
      "Progress Check-Ins",
      "Training Resources Library",
      "Email Support",
    ],
  },
  {
    id: "behavior-intensive",
    name: "Behaviour Intensive",
    price: 470,
    duration: "60 Days",
    color: "from-accent-600 to-accent-800",
    badge: "Best Value",
    features: [
      "4× One-to-One Video Calls",
      "Advanced Behaviour Plan",
      "60 Days WhatsApp Support",
      "Weekly Progress Reviews",
      "Training Resources Library",
      "Priority Email Support",
      "Emergency Support Line",
      "Lifetime Resources Access",
    ],
  },
  {
    id: "puppy-foundations",
    name: "Puppy Foundations",
    price: 220,
    duration: "4 Weeks",
    color: "from-green-600 to-green-800",
    badge: "For Puppies",
    features: [
      "1× One-to-One Video Call",
      "Puppy Training Roadmap",
      "4 Weeks WhatsApp Support",
      "Socialisation Guidance",
      "Puppy Training Resources",
      "Email Support",
    ],
  },
];

export default function ClientUpgradePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<any>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/client/dashboard");
        if (!res.ok) {
          router.push("/client/login");
          return;
        }
        const data = await res.json();
        setClientData(data);
        
        // Check if already has a paid plan
        if (data.assessment.consultationType && data.assessment.consultationType !== 'discovery') {
          // Already has a plan
          router.push("/client/dashboard");
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/client/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePaymentComplete = async (paymentIntentId?: string) => {
    if (!selectedPlan || !clientData) return;

    try {
      setLoading(true);
      const plan = PLANS.find(p => p.id === selectedPlan);
      
      // Update the assessment with new plan
      const res = await fetch("/api/client/upgrade-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: clientData.assessment._id,
          consultationType: selectedPlan,
          paymentIntentId,
          paymentAmount: (plan?.price || 0) + tipAmount,
          tipAmount,
        }),
      });

      if (res.ok) {
        router.push("/client/dashboard?upgraded=true");
      } else {
        alert("Failed to upgrade plan. Please contact support.");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("An error occurred. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading...</p>
        </div>
      </div>
    );
  }

  const selectedPlanData = PLANS.find(p => p.id === selectedPlan);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 text-accent-800 text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" />
          Upgrade Your Plan
        </span>
        <h1 className="font-display text-3xl md:text-4xl text-primary-900 mb-3">
          Continue Your Journey
        </h1>
        <p className="text-ink-600 max-w-2xl mx-auto">
          {clientData && `Hi ${clientData.user.name.split(' ')[0]}! `}
          Ready to take the next step with {clientData?.assessment.petName}? Choose a plan that works best for you.
        </p>
      </div>

      {!showPayment ? (
        <>
          {/* Plans Grid */}
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden ${
                  plan.id === 'behavior-intensive' ? 'ring-2 ring-accent-600 scale-105' : ''
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${plan.color}`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Header */}
                  <h3 className="font-display text-2xl text-primary-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-primary-900">£{plan.price}</span>
                    <span className="text-ink-600">/ {plan.duration}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm text-ink-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 px-4 rounded-full font-bold text-white transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${plan.color} hover:shadow-lg`}
                  >
                    Select Plan
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mt-12">
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="font-semibold text-primary-900 text-sm">Secure Payment</p>
                <p className="text-xs text-ink-600">Protected by Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-primary-900 text-sm">No Hidden Fees</p>
                <p className="text-xs text-ink-600">What you see is what you pay</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-accent-700" />
              </div>
              <div>
                <p className="font-semibold text-primary-900 text-sm">Instant Access</p>
                <p className="text-xs text-ink-600">Start immediately</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Selected Plan Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="font-display text-2xl text-primary-900 mb-4">Order Summary</h2>
            <div className="flex items-center justify-between py-3 border-b border-primary-100">
              <div>
                <p className="font-semibold text-primary-900">{selectedPlanData?.name}</p>
                <p className="text-sm text-ink-600">{selectedPlanData?.duration} Programme</p>
              </div>
              <p className="text-xl font-bold text-primary-900">£{selectedPlanData?.price}</p>
            </div>

            {/* Tip Section */}
            <div className="py-4 border-b border-primary-100">
              <p className="text-sm font-semibold text-primary-900 mb-3">Add a tip? (Optional)</p>
              <div className="flex gap-2">
                {[0, 5, 10, 15].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTipAmount(amount)}
                    className={`flex-1 py-2 px-3 rounded-full text-sm font-semibold transition-all ${
                      tipAmount === amount
                        ? 'bg-accent-600 text-white'
                        : 'bg-primary-100 text-primary-900 hover:bg-primary-200'
                    }`}
                  >
                    {amount === 0 ? 'No Tip' : `£${amount}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-3">
              <p className="font-bold text-lg text-primary-900">Total</p>
              <p className="text-2xl font-bold text-primary-900">
                £{((selectedPlanData?.price || 0) + tipAmount).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Payment Form */}
          {clientData && selectedPlanData && (
            <PaymentStep
              amount={(selectedPlanData.price || 0) + tipAmount}
              consultationType={selectedPlan || 'behavior-essentials'}
              customerEmail={clientData.user.email}
              customerName={clientData.user.name}
              onPaymentComplete={handlePaymentComplete}
            />
          )}

          {/* Back Button */}
          <button
            onClick={() => {
              setShowPayment(false);
              setSelectedPlan(null);
              setTipAmount(0);
            }}
            className="w-full mt-4 py-3 px-4 rounded-full font-semibold text-primary-700 border-2 border-primary-200 hover:bg-primary-50 transition-all"
          >
            ← Choose Different Plan
          </button>
        </div>
      )}
    </div>
  );
}
