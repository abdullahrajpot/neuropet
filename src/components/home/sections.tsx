"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Heart, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  BlobImage,
  Container,
  RoundedImage,
  SectionEyebrow,
  SectionTitle,
  WavyDivider,
} from "@/components/ui/shared";
import {
  fadeUp,
  heroStagger,
  staggerContainer,
  cardHover,
} from "@/lib/motion";
import {
  blogPosts,
  howItWorks,
  services,
  siteConfig,
  stats,
  testimonials,
} from "@/lib/site-config";

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl text-primary-900 md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-ink-600">{label}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream pt-28 md:pt-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="lg:col-span-7"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <SectionEyebrow>Pet Behaviour Experts</SectionEyebrow>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-[40px] leading-[1.1] text-primary-900 md:text-[72px]"
            >
              Calmer pets,{" "}
              <em className="not-italic text-accent-600">happier</em> homes
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600"
            >
              {siteConfig.description} Evidence-based plans with compassionate,
              one-to-one support.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/book">Book a Consultation</Button>
              <Button href="/training-behaviour" variant="secondary">
                Our Services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <BlobImage
              src="/images/dog.png"
              alt="Happy dog with trainer"
              className="mx-auto aspect-[4/5] w-full max-w-md shadow-card lg:max-w-none"
              priority
            />
            <div className="absolute -bottom-4 -left-4 rounded-card bg-white p-4 shadow-card md:-left-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <Heart className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-2xl text-primary-900">500+</p>
                  <p className="text-xs text-ink-600">Pets helped</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      <WavyDivider className="mt-16 text-primary-100" />
    </section>
  );
}

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, text: "Certified behaviourist" },
    { icon: Calendar, text: "Flexible booking" },
    { icon: Heart, text: "Force-free methods" },
  ];

  return (
    <section className="bg-primary-100 py-10">
      <Container>
        <motion.ul
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map(({ icon: Icon, text }) => (
            <motion.li
              key={text}
              variants={fadeUp}
              className="flex items-center gap-3 text-primary-900"
            >
              <Icon className="h-5 w-5 text-accent-600" strokeWidth={1.5} />
              <span className="font-medium">{text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-white py-14 md:py-24">
      <Container>
        <motion.div
          className="max-w-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionEyebrow>Our Services</SectionEyebrow>
          <SectionTitle className="mt-3">
            Support for every <em className="not-italic text-primary-700">stage</em>
          </SectionTitle>
          <p className="mt-4 text-ink-600">
            From puppy foundations to complex behaviour cases — tailored plans
            built around your pet and your home.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, i) => (
            <motion.div key={service.href} variants={fadeUp}>
              <motion.article
                whileHover={cardHover}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-ink-300/50 bg-cream p-4"
              >
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl text-primary-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 transition-colors hover:text-accent-600"
                >
                  Learn more <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-14 md:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionEyebrow>How It Works</SectionEyebrow>
            <SectionTitle className="mt-3">
              A clear path to <em className="not-italic">real</em> change
            </SectionTitle>
            <p className="mt-4 text-ink-600">
              No guesswork — a structured process from first contact through
              follow-up support.
            </p>
            <div className="mt-8">
              <RoundedImage
                src="/images/pet2.png"
                alt="Pet consultation session"
                className="mx-auto aspect-square w-full max-w-sm"
              />
            </div>
          </motion.div>

          <motion.ol
            className="space-y-6 lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map((item, i) => (
              <motion.li
                key={item.step}
                variants={fadeUp}
                className="relative flex gap-6 rounded-card bg-white p-6 shadow-card md:p-8"
                style={{ marginLeft: i % 2 === 1 ? "2rem" : "0" }}
              >
                <span className="font-display text-3xl text-accent-600/40">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display text-xl text-primary-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-ink-600">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}

export function AboutTeaserSection() {
  return (
    <section className="bg-primary-100 py-14 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            className="order-2 lg:order-1 lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <BlobImage
              src="/images/gallery8.jpg"
              alt="Behaviour consultant with pet"
              className="aspect-[4/5] w-full"
            />
          </motion.div>
          <motion.div
            className="order-1 lg:order-2 lg:col-span-7 lg:pl-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionEyebrow>About NeuroPet</SectionEyebrow>
            <SectionTitle className="mt-3">
              Science-led care with a <em className="not-italic">human</em> touch
            </SectionTitle>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              With over three decades in veterinary behaviour, we combine
              clinical expertise with practical, compassionate coaching for
              families navigating challenging pet behaviours.
            </p>
            <p className="mt-4 text-ink-600">
              Every plan is individual — because no two pets, or households, are
              the same.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Meet the team
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-white">
      {/* Fixed parallax background — content scrolls over it */}
      <div
        className="relative min-h-[480px] bg-primary-900 bg-cover bg-center md:min-h-[560px]"
        style={{
          backgroundImage: "url(/images/gallery1.jpg)",
          backgroundAttachment: prefersReducedMotion ? "scroll" : "fixed",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/78" aria-hidden="true" />
        <Container className="relative z-10 flex flex-col items-center px-4 py-20 text-center md:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-label text-xs font-semibold uppercase tracking-[0.08em] text-accent-400">
              Testimonials
            </p>
            <h2 className="mt-3 font-display text-[32px] leading-tight text-white md:text-[48px]">
              What clients <em className="not-italic text-accent-400">say</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
              Real stories from pet parents who found calmer routines and stronger
              bonds through our behaviour plans.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Cards scroll up over the fixed background */}
      <Container className="relative z-20 -mt-20 pb-16 md:-mt-28 md:pb-24">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              variants={fadeUp}
              whileHover={cardHover}
              className="flex flex-col rounded-card bg-white p-8 shadow-card"
            >
              <p className="flex-1 leading-relaxed text-ink-900">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-ink-300/50 pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 font-display text-sm text-primary-700">
                  {t.author.charAt(0)}
                </span>
                <div>
                  <cite className="not-italic font-medium text-primary-900">
                    {t.author}
                  </cite>
                  <p className="text-sm text-ink-600">{t.pet}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export function BlogPreviewSection() {
  return (
    <section className="bg-cream py-14 md:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionEyebrow>From the Blog</SectionEyebrow>
            <SectionTitle className="mt-3">Latest insights</SectionTitle>
          </motion.div>
          <Button href="/blog" variant="ghost">
            View all posts →
          </Button>
        </div>

        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.article key={post.slug} variants={fadeUp} whileHover={cardHover}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-card bg-white shadow-card">
                  <div className="p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt=""
                      className="aspect-[16/10] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-display text-xl text-primary-900 group-hover:text-primary-700">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-600">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="bg-primary-900 py-16 md:py-20">
      <Container>
        <motion.div
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-xl">
            <h2 className="font-display text-[32px] text-white md:text-[48px]">
              Ready to help your pet <em className="not-italic text-accent-400">thrive</em>?
            </h2>
            <p className="mt-4 text-white/75">
              Book a consultation today — in-person or virtual — and take the
              first step toward a calmer home.
            </p>
          </div>
          <Button href="/book" className="shrink-0">
            Book a Consultation
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
