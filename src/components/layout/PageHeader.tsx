"use client";

import { motion } from "framer-motion";
import { Container, SectionEyebrow, SectionTitle } from "@/components/ui/shared";
import { fadeUp } from "@/lib/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="bg-cream pt-28 pb-12 md:pt-32 md:pb-16">
      <Container>
        <motion.div
          className="max-w-2xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <SectionTitle className="mt-3">{title}</SectionTitle>
          {description && (
            <p className="mt-4 text-lg text-ink-600">{description}</p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
