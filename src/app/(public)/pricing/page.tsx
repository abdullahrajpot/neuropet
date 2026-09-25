"use client";

import { Container } from "@/components/ui/shared";
import { dogBehaviorPlans } from "@/data/dogBehaviorServices";
import Link from "next/link";
import { Check, Phone, Calendar, FileText, Video, ClipboardCheck, MessageCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 3-tier pricing plans - replacing with behaviour programs
const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    duration: '30 minutes',
    description: 'No-obligation consultation to discuss your dog&apos;s behaviour',
    features: [
      'Free 30-minute consultation',
      'Discuss specific challenges',
      'Expert advice on next steps',
      'No obligation to purchase',
      'Friendly environment',
    ],
    cta: 'Book Free Call',
    popular: false,
    href: '/book?type=discovery',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '£270',
    duration: '/month',
    description: 'Perfect for most common behavioural challenges',
    features: [
      'Personalised training plan',
      'Daily WhatsApp support',
      'Unlimited video analysis',
      '2x 1-to-1 coaching calls',
      'Progress tracking',
      'Ongoing adjustments',
      'WhatsApp guidance & feedback',
    ],
    cta: 'Start Pro Plan',
    popular: true,
    href: '/book?plan=behavior-essentials',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '£470',
    duration: '/month',
    description: 'Extended support for complex behavioural issues',
    features: [
      'Everything in Pro',
      '60 days daily support',
      '4x 1-to-1 coaching calls',
      'Priority response times',
      'Advanced protocols',
      'Family training session',
      'Priority WhatsApp support',
    ],
    cta: 'Start Enterprise',
    popular: false,
    href: '/book?plan=behavior-intensive',
  },
];

// Why Virtual Training Works - Arc Layout Items
const virtualTrainingBenefits = {
  left: [
    {
      iconPath: "/icons/dog-training (1).png",
      title: "Real-Life Training",
      description: "Train where behaviour actually happens - at home, on walks, in the situations you struggle with most",
    },
    {
      iconPath: "/icons/dog (1).png",
      title: "Video Analysis",
      description: "Send videos of problem behaviors and get expert feedback on exactly what to do",
    },
  ],
  right: [
    {
      iconPath: "/icons/bark.png",
      title: "Daily Support",
      description: "Get answers when you need them, not weeks later at your next appointment",
    },
    {
      iconPath: "/icons/dog-competition.png",
      title: "Ongoing Adjustments",
      description: "Your training plan evolves as your dog progresses - no rigid, one-size-fits-all approach",
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] md:h-[600px] bg-primary-950 flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url(/images/servicepg3.jpg)",
          }}
          aria-hidden="true"
        />
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/90 to-primary-800/80" aria-hidden="true" />
        
        <Container className="relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
              Transform Your Dog&apos;s <span className="text-accent-400">Behaviour</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed drop-shadow-lg">
              Daily 1-to-1 expert support, personalised training plans, and real-life guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book?type=discovery"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-600 text-white text-lg font-bold hover:bg-accent-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Book Free Discovery Call
              </Link>
              <Link
                href="#programs"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white text-lg font-bold hover:bg-white/20 transition-all border-2 border-white/30"
              >
                View Programs
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Behaviour Programs - 4 Plans with Choose Plan styling */}
      <section id="programs" className="py-20 bg-white scroll-mt-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-primary-900 mb-4">
              Behaviour Programs
            </h2>
            <p className="text-xl text-ink-600 max-w-2xl mx-auto">
              Choose the program that best suits your dog&apos;s needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Free Discovery Call */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative bg-white rounded-3xl shadow-xl p-8 border-2 border-slate-200 hover:shadow-2xl transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  Free Discovery Call
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-primary-900">Free</span>
                </div>
                <p className="text-sm text-ink-600">30 minutes</p>
              </div>

              <p className="text-sm text-ink-700 mb-6 min-h-[48px] text-center">
                No-obligation consultation to discuss your dog&apos;s behaviour
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Free 30-minute consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Discuss specific challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Expert advice on next steps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">No obligation to purchase</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Friendly environment</span>
                </li>
              </ul>

              <Link
                href="/book?type=discovery"
                className="block w-full text-center py-3 px-6 rounded-full font-bold transition-all bg-primary-100 text-primary-900 hover:bg-primary-200"
              >
                Book Free Call
              </Link>
            </motion.div>

            {/* Behaviour Essentials - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-white rounded-3xl shadow-xl p-8 border-2 border-primary-700 ring-4 ring-primary-100 transform md:-translate-y-4 hover:shadow-2xl transition-all"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-block px-6 py-2 rounded-full bg-accent-600 text-white text-sm font-bold shadow-lg">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  Behaviour Essentials
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-primary-900">£270</span>
                </div>
                <p className="text-sm text-ink-600">30 days</p>
              </div>

              <p className="text-sm text-ink-700 mb-6 min-h-[48px] text-center">
                Perfect for most common behavioural challenges
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Personalised training plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Daily WhatsApp support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Unlimited video analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">2x 1-to-1 coaching calls</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Progress tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Ongoing adjustments</span>
                </li>
              </ul>

              <Link
                href="/book?plan=behavior-essentials"
                className="block w-full text-center py-3 px-6 rounded-full font-bold transition-all bg-primary-700 text-white hover:bg-primary-800 shadow-lg"
              >
                Start Program
              </Link>
            </motion.div>

            {/* Behaviour Intensive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-white rounded-3xl shadow-xl p-8 border-2 border-slate-200 hover:shadow-2xl transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  Behaviour Intensive
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-primary-900">£470</span>
                </div>
                <p className="text-sm text-ink-600">60 days</p>
              </div>

              <p className="text-sm text-ink-700 mb-6 min-h-[48px] text-center">
                Extended support for complex behavioural issues
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Everything in Essentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">60 days daily support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">4x 1-to-1 coaching calls</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Priority response times</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Advanced protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Family training session</span>
                </li>
              </ul>

              <Link
                href="/book?plan=behavior-intensive"
                className="block w-full text-center py-3 px-6 rounded-full font-bold transition-all bg-primary-100 text-primary-900 hover:bg-primary-200"
              >
                Start Intensive
              </Link>
            </motion.div>

            {/* Puppy Foundations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-white rounded-3xl shadow-xl p-8 border-2 border-slate-200 hover:shadow-2xl transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  Puppy Foundations
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-primary-900">£220</span>
                </div>
                <p className="text-sm text-ink-600">30 days</p>
              </div>

              <p className="text-sm text-ink-700 mb-6 min-h-[48px] text-center">
                Essential training and socialization for puppies
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Puppy-specific plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Daily WhatsApp support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Video analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">1x 1-to-1 coaching call</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">Socialization guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-ink-700">House training protocols</span>
                </li>
              </ul>

              <Link
                href="/book?plan=puppy-foundations"
                className="block w-full text-center py-3 px-6 rounded-full font-bold transition-all bg-primary-100 text-primary-900 hover:bg-primary-200"
              >
                Start Puppy Program
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 7 Steps To Success - How To Book */}
      <section className="relative py-20 bg-cream overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-64 h-64 rounded-full bg-primary-100/35 blur-3xl -top-20 -left-20 opacity-40" />
        <div className="absolute w-48 h-48 rounded-full bg-accent-100/35 blur-3xl -bottom-16 -right-16 opacity-40" />
        
        <Container className="relative z-10">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-900 font-bold text-sm uppercase tracking-wider px-5 py-2 rounded-full mb-4">
              <Phone className="w-4 h-4" />
              How To Book
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-primary-900 mb-4 font-bold">
              6 Steps To Success
            </h2>
            <p className="text-lg text-ink-600 max-w-2xl mx-auto">
              From choosing your consultation to walking away with a plan built around your dog — here&apos;s exactly what happens.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-start max-w-6xl mx-auto">
            {/* Step List with Dotted Line */}
            <div className="relative pl-1">
              {/* Dotted vertical line */}
              <div 
                className="absolute left-7 top-3 bottom-3 w-0.5 hidden md:block" 
                style={{
                  backgroundImage: 'linear-gradient(#8ec9d6 60%, transparent 0%)',
                  backgroundSize: '2px 14px',
                  backgroundRepeat: 'repeat-y'
                }}
              />

              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-cream relative z-10">
                  <ClipboardCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    1. Choose your consultation type
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Pick the plan that matches your dog&apos;s needs from the options above.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 - Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-cream relative z-10">
                  <Calendar className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    2. Pick a day and time
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Choose a slot that suits your schedule from our live calendar.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 - Book */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-cream relative z-10">
                  <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    3. Book your consultation
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Confirm your booking and secure your appointment instantly.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 - Questionnaire */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-cream relative z-10">
                  <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    4. Complete a behaviour questionnaire
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    This essential pre-assessment helps us understand your dog before we meet.
                  </p>
                </div>
              </motion.div>

              {/* Step 5 - Video Consultation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-cream relative z-10">
                  <Video className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    5. Attend your video consultation
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Meet your Behaviourist via Zoom, together with your dog.
                  </p>
                </div>
              </motion.div>

              {/* Step 6 - Custom Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-[56px_1fr] gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-cream relative z-10">
                  <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    6. Co-create your custom behaviour plan
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Guided by your Behaviourist, written by you — tailored entirely to your dog.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Photo Column - Random Collage Style */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-[380px]">
                {/* Main large image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/dog3.png"
                    alt="Pet owner on video consultation"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>

                {/* Small overlapping image - top left */}
                <div className="absolute -top-6 -left-6 w-32 h-32 overflow-hidden rounded-2xl shadow-xl border-4 border-white transform rotate-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/dog2.png"
                    alt="Happy dog"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating card - bottom */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-[200px] z-10">
                  <div className="w-11 h-11 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-primary-900">100% Online</p>
                    <p className="text-xs text-ink-600">Via Zoom, from home</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* After Your Consultation */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-64 h-64 rounded-full bg-accent-100/35 blur-3xl -top-20 -right-20 opacity-40" />
        
        <Container className="relative z-10">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-900 font-bold text-sm uppercase tracking-wider px-5 py-2 rounded-full mb-4">
              <Check className="w-4 h-4" />
              What Happens Next
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-primary-900 mb-4 font-bold">
              After Your Consultation
            </h2>
            <p className="text-lg text-ink-600 max-w-2xl mx-auto">
              The support doesn&apos;t stop when the call ends. Here&apos;s what continues after you leave.
            </p>
          </motion.div>

          {/* Two Column Layout - Reversed */}
          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-16 items-start max-w-6xl mx-auto">
            {/* Photo Column - Circle Style */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center order-2 md:order-1"
            >
              <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                {/* Teal circle background */}
                <div className="absolute w-[88%] h-[88%] rounded-full bg-[#8ec9d6]" />
                
                {/* Dog image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dog4.png"
                  alt="Happy dog after training"
                  className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl"
                />

                {/* Floating card */}
                <div className="absolute bottom-3 -left-3 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-[200px] z-20">
                  <div className="w-11 h-11 rounded-full bg-accent-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-primary-900">Free Follow-Up</p>
                    <p className="text-xs text-ink-600">Included with every plan</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step List */}
            <div className="relative pl-1 order-1 md:order-2">
              {/* Dotted vertical line */}
              <div 
                className="absolute left-7 top-3 bottom-3 w-0.5 hidden md:block" 
                style={{
                  backgroundImage: 'linear-gradient(#8ec9d6 60%, transparent 0%)',
                  backgroundSize: '2px 14px',
                  backgroundRepeat: 'repeat-y'
                }}
              />

              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-white relative z-10">
                  <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    Post-consultation resources
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    You&apos;ll receive tailored resources to support your plan at home.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-white relative z-10">
                  <Video className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    Free follow-up consultation
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Ensures you&apos;re on track to implement your plan with confidence.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-[56px_1fr] gap-5 mb-9"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-white relative z-10">
                  <ClipboardCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    Implement at your own pace
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Work through your tailored behaviour plan in a way that suits you both.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-[56px_1fr] gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-lg border-4 border-white relative z-10">
                  <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    Ongoing follow-ups
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Book additional follow-up consultations any time you need extra support.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Virtual Training Works - Arc Layout */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-semibold text-primary-900 mb-4">
              Why Virtual Training Works
            </h2>
            <p className="text-ink-600 text-base">
              Get expert guidance where your dog&apos;s behaviour actually happens
            </p>
          </motion.div>

          {/* 3-Column Grid Layout with Arc Design */}
          <motion.div
            className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-16 md:gap-20 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-12 md:gap-16">
              {virtualTrainingBenefits.left.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-center gap-5"
                >
                  {/* Icon Circle */}
                  <div className="w-20 h-20 min-w-[80px] rounded-full border-2 border-slate-200 bg-white flex items-center justify-center shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.iconPath}
                      alt=""
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CENTER PHOTO */}
            <motion.div
              variants={fadeUp}
              className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] mx-auto flex items-center justify-center md:order-none order-first"
            >
              {/* Teal circle background */}
              <div className="absolute w-full h-full rounded-full bg-[#8ec9d6] z-0" />
              {/* Dog image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dog5.png"
                alt="Virtual training with dog"
                className="relative z-10 w-[90%] h-[90%] object-cover rounded-full"
              />
            </motion.div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-12 md:gap-16 md:items-end">
              {virtualTrainingBenefits.right.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-center gap-5 md:flex-row-reverse md:text-right"
                >
                  {/* Icon Circle */}
                  <div className="w-20 h-20 min-w-[80px] rounded-full border-2 border-slate-200 bg-white flex items-center justify-center shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.iconPath}
                      alt=""
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Ready to Transform Your Dog&apos;s Behaviour?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Start with a free discovery call - no obligation, just expert advice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book?type=discovery"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-primary-900 text-lg font-bold hover:bg-cream transition-all shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Book Free Discovery Call
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-600 text-white text-lg font-bold hover:bg-accent-700 transition-all shadow-lg"
              >
                Start a Program
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
