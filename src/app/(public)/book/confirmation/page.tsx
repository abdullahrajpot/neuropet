"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, User, Key, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const petName = searchParams.get("petName");
  const [copied, setCopied] = useState(false);

  const copyClientId = () => {
    if (clientId) {
      navigator.clipboard.writeText(clientId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-28 pb-16">
      <Container className="max-w-3xl">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl text-primary-900 mb-3">
            Assessment Submitted Successfully!
          </h1>
          
          <p className="text-lg text-ink-600 mb-8">
            Thank you for completing the behaviour assessment
            {petName && <span className="font-semibold"> for {petName}</span>}.
            We&apos;ll review your submission and get back to you within 1-2 business days.
          </p>

          {/* Client ID Card */}
          {clientId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Key className="w-5 h-5 text-primary-700" />
                <h2 className="font-display text-xl text-primary-900">Your Client ID</h2>
              </div>
              
              <div className="bg-white rounded-xl p-4 mb-4 border-2 border-primary-300">
                <p className="text-3xl font-bold text-primary-900 tracking-wider font-mono">
                  {clientId}
                </p>
              </div>

              <button
                onClick={copyClientId}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Client ID"}
              </button>

              <p className="text-sm text-ink-600 mt-4 leading-relaxed">
                <strong className="text-primary-900">Important:</strong> Save this ID! You&apos;ll need it to create your client portal account and track your assessment progress.
              </p>
            </motion.div>
          )}

          {/* Portal Access Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-accent-50 border-2 border-accent-200 rounded-2xl p-6 mb-8 text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-accent-600" />
              <h3 className="font-display text-lg text-primary-900">Next Steps: Create Your Account</h3>
            </div>
            
            <ol className="space-y-3 text-ink-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Click the button below to create your client portal account</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Enter your Client ID, name, email, and create a password</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Access your dashboard to track assessment status and communicate with our behaviourist</span>
              </li>
            </ol>

            <Link href="/client/register" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent-600 text-white font-bold hover:bg-accent-700 transition-all shadow-lg hover:shadow-xl">
              <User className="w-5 h-5" />
              Create Client Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/"
              className="px-6 py-3 rounded-full border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border-2 border-ink-300 text-ink-700 font-semibold hover:bg-ink-50 transition-all"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-sm text-ink-600">
            Already have an account?{" "}
            <Link href="/client/login" className="text-primary-700 hover:underline font-semibold">
              Login to Client Portal
            </Link>
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
        >
          <h3 className="font-display text-xl mb-4">What Happens Next?</h3>
          <ul className="space-y-3 text-sm text-primary-100">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-accent-400 rounded-full mt-1.5"></span>
              <span>Our expert behaviourist will review your assessment within 1-2 business days</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-accent-400 rounded-full mt-1.5"></span>
              <span>You&apos;ll receive updates via your client portal dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-accent-400 rounded-full mt-1.5"></span>
              <span>We&apos;ll contact you to schedule your consultation appointment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-accent-400 rounded-full mt-1.5"></span>
              <span>Use the portal messaging to ask any questions or provide additional information</span>
            </li>
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
