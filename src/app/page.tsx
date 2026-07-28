"use client";

import { motion } from "framer-motion";
import {
  HeroSection,
  TrustStrip,
  ServicesSection,
  HowItWorksSection,
  AboutTeaserSection,
  TestimonialsSection,
  BlogPreviewSection,
  CtaBanner,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <HowItWorksSection />
      <AboutTeaserSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CtaBanner />
    </motion.div>
  );
}
