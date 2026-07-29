"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Wallet,
  Home,
  Award,
  ClipboardList,
  Phone,
  Stethoscope,
  Headphones,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, SectionEyebrow, SectionTitle, RoundedImage } from "@/components/ui/shared";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

/* ── 1. Hero with breadcrumb + paw watermark ── */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-28 pb-14 md:pt-32 md:pb-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/footprint.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[55%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] md:h-80 md:w-80"
      />
      <Container>
        <motion.div
          className="relative z-10 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-display text-[40px] text-primary-900 md:text-[56px]">
            About Us
          </h1>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-ink-600">
              <li>
                <Link href="/" className="transition-colors hover:text-primary-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-300">
                /
              </li>
              <li className="font-medium text-primary-700">About Us</li>
            </ol>
          </nav>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 2. Mission — overlapping images + Vetrio-style copy ── */
const missionFeatures = [
  {
    icon: Wallet,
    title: "Affordable Behaviour Consultation",
    description:
      "Transparent pricing with flexible payment options for every household.",
    tone: "teal" as const,
  },
  {
    icon: Home,
    title: "In-Person & Virtual Sessions",
    description:
      "Home visits, clinic appointments, or online consultations worldwide.",
    tone: "accent" as const,
  },
  {
    icon: Award,
    title: "Certified & Qualified Behaviourist",
    description:
      "ABTC-registered specialists with decades of clinical experience.",
    tone: "accent" as const,
  },
  {
    icon: ClipboardList,
    title: "Complete Behaviour Support Plans",
    description:
      "Written plans, follow-ups, and progress tracking from start to finish.",
    tone: "teal" as const,
  },
];

function MissionImageCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] pb-8 pl-4 pt-4 md:max-w-none md:pb-12 md:pl-8">
      {/* Main image — back/right */}
      <div className="relative ml-auto w-[78%] overflow-hidden rounded-2xl shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about1.jpg"
          alt="Behaviour consultant with a dog"
          className="aspect-[3/4] w-full object-cover"
        />
      </div>

      {/* Overlapping image — front/bottom-left with white frame */}
      <div className="absolute bottom-0 left-0 z-10 w-[58%] overflow-hidden rounded-2xl border-[5px] border-white shadow-card md:w-[52%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about2.jpg"
          alt="Specialist with a cat"
          className="aspect-[4/5] w-full object-cover"
        />
      </div>

      {/* Yellow paw — bottom-right overlap */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/footprint.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-6 right-0 z-20 h-16 w-16 md:bottom-10 md:right-4 md:h-24 md:w-24"
        style={{ filter: "brightness(0) saturate(100%) invert(72%) sepia(48%) saturate(600%) hue-rotate(340deg) brightness(98%) contrast(92%)" }}
      />
    </div>
  );
}

export function AboutMission() {
  return (
    <section className="bg-white py-14 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MissionImageCollage />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <SectionEyebrow>About {siteConfig.name}</SectionEyebrow>
              <h2 className="mt-3 font-display text-[28px] leading-snug text-primary-900 md:text-[36px] lg:text-[40px]">
                Your Pet&apos;s Behaviour Health is Very Important &amp; Our
                Priority
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-ink-600 md:text-base">
                We understand that behavioural challenges affect the whole
                family. Our team provides compassionate, evidence-based
                consultation for dogs and cats — helping you build calmer
                routines, stronger bonds, and lasting change at home.
              </p>
            </motion.div>

            {/* 2×2 feature grid — icon square + text, no card boxes */}
            <motion.div
              className="mt-10 grid gap-8 sm:grid-cols-2"
              variants={staggerContainer}
            >
              {missionFeatures.map(({ icon: Icon, title, description, tone }) => (
                <motion.div key={title} variants={fadeUp} className="flex gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      tone === "teal"
                        ? "bg-primary-700 text-white"
                        : "bg-accent-600 text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-ink-900">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Signature row */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-end gap-5 border-t border-ink-300/50 pt-8"
            >
              <p
                className="font-display text-3xl italic leading-none text-primary-900/80 md:text-4xl"
                aria-hidden="true"
              >
                Sarah Chen
              </p>
              <div>
                <p className="text-base font-semibold text-ink-900">Sarah Chen</p>
                <p className="text-sm text-ink-600">{siteConfig.name} CEO</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── 3. Expertise cards — Vetrio-style: 3 distinct rounded cards (2 white + 1 cyan CTA) ── */
const highlightCards = [
  {
    icon: Stethoscope,
    title: "17 Expertise",
    description:
      "Over three decades of veterinary behaviour experience across complex canine and feline cases.",
    variant: "light" as const,
  },
  {
    icon: Headphones,
    title: "24/7 Support Care",
    description:
      "Email and phone support between sessions so you never feel stuck implementing your plan.",
    variant: "light" as const,
  },
  {
    icon: Video,
    title: "Online Consultation",
    description:
      "Book a virtual session from anywhere — ideal for follow-ups and busy schedules.",
    variant: "cta" as const,
  },
];

export function AboutHighlightCards() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <motion.div
          className="grid gap-6 md:grid-cols-3 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlightCards.map(({ icon: Icon, title, description, variant }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className={
                variant === "cta"
                  ? "flex flex-col items-start rounded-2xl bg-[#139a9e] p-8 md:p-10 text-left text-white shadow-[0_12px_32px_rgba(19,154,158,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  : "flex flex-col items-start rounded-2xl bg-white p-8 md:p-10 text-left border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              }
            >
              <span
                className={
                  variant === "cta"
                    ? "flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white mb-6"
                    : "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f6] text-[#139a9e] mb-6"
                }
              >
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3
                className={`text-xl font-bold tracking-tight mb-3 ${
                  variant === "cta" ? "text-white" : "text-slate-900"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  variant === "cta" ? "text-white/85" : "text-slate-600"
                }`}
              >
                {description}
              </p>
              {variant === "cta" && (
                <Button
                  href="/book"
                  className="mt-auto bg-[#F8C245] hover:bg-[#eab308] text-slate-900 font-bold px-7 py-3 rounded-xl shadow border-none transition-all duration-200"
                >
                  Consult now
                </Button>
              )}
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 4. Parallax testimonial banner — Dark/dull overlay for high readability ── */
export function AboutParallaxBanner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[440px] bg-slate-950 md:min-h-[500px] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.7]"
        style={{
          backgroundImage: "url(/images/gallery1.jpg)",
          backgroundAttachment: prefersReducedMotion ? "scroll" : "fixed",
        }}
        aria-hidden="true"
      />
      {/* Dark dull overlay layer to guarantee text clarity as in 2nd pic */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-slate-950/60 md:from-slate-950/90 md:via-slate-950/75 md:to-slate-950/50" aria-hidden="true" />
      
      <Container className="relative z-10 py-16 md:py-24">
        <motion.div
          className="max-w-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-label text-xs font-bold uppercase tracking-[0.15em] text-[#F8C245]">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-[32px] font-bold leading-[1.2] text-white md:text-[46px] drop-shadow-sm">
            We Are The True Solution For Your Pet Health
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-200 md:text-base font-normal">
            Families across the UK trust us to guide them through reactivity,
            anxiety, and everyday behaviour challenges — with plans that work in
            real homes, not just on paper.
          </p>
          <Button 
            href="/contact" 
            className="mt-8 bg-[#F8C245] hover:bg-[#eab308] text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg border-none transition-all duration-200 hover:scale-105"
          >
            Contact us
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 5. Partners strip ── */
const partners = [
  "RSPCA Approved",
  "APBC Member",
  "ABTC Registered",
  "Pet Professional Guild",
];

export function AboutPartners() {
  return (
    <section className="border-y border-ink-300/40 bg-white py-12 md:py-14">
      <Container>
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-sans text-base font-medium text-ink-600 md:text-lg">
            We Cooperate with Your Favourite Pet Organisations
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
            {partners.map((name) => (
              <span
                key={name}
                className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-ink-600/45 md:text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 6. Why choose us + stats ── */
const aboutStats = [
  { value: "1,200", suffix: "+", label: "Happy Clients" },
  { value: "3,250", suffix: "+", label: "Pets Helped" },
  { value: "420", suffix: "+", label: "Consultations" },
];

export function AboutWhyChoose() {
  return (
    <section className="bg-cream py-14 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <RoundedImage
              src="/images/dog2.png"
              alt="Behaviourists examining a puppy"
              className="aspect-[4/5] w-full rounded-2xl"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <SectionEyebrow>Why Choose Us</SectionEyebrow>
              <h2 className="mt-3 font-display text-[28px] leading-snug text-primary-900 md:text-[36px]">
                We Always Focus On Help Your Pet Have A Better Life &amp; Health
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-ink-600">
                From first consultation to final follow-up, we stay beside you
                with clear guidance, realistic expectations, and methods rooted
                in animal welfare science — never shortcuts or aversive tools.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-8 border-y border-ink-300/50 py-8"
              variants={fadeUp}
            >
              {aboutStats.map(({ value, suffix, label }) => (
                <div key={label}>
                  <p className="font-sans text-2xl font-bold text-ink-900 md:text-3xl">
                    {value}
                    <span className="text-primary-700">{suffix}</span>
                  </p>
                  <p className="mt-1 text-sm text-ink-600">{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-600 text-white">
                  <Phone className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="font-semibold text-ink-900">{siteConfig.phone}</p>
              </a>
              <Button href="/contact">Discover further</Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── 7. Team — Vetrio doctor card style as in 2nd pic ── */
const team = [
  {
    name: "Vivian Marley",
    role: "Lead Behaviourist",
    image: "/images/about1.jpg",
  },
  {
    name: "Lorena Breanna",
    role: "Canine Specialist",
    image: "/images/about2.jpg",
  },
  {
    name: "Jack Cochran",
    role: "Feline Specialist",
    image: "/images/abouttab1.jpg",
  },
];

export function AboutTeam() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-label text-sm font-semibold uppercase tracking-wider text-[#139a9e]">
            Our Doctor
          </p>
          <h2 className="mt-2 font-display text-[32px] font-bold text-slate-900 md:text-[40px]">
            Meet With Professional Doctor
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
            Our certified behaviourists bring clinical expertise and genuine
            compassion to every consultation — in person or online.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map(({ name, role, image }) => (
            <motion.article
              key={name}
              variants={fadeUp}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-3.5 pb-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[3/4] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-5 text-center">
                <h3 className="font-sans text-lg font-bold text-slate-900 transition-colors group-hover:text-[#139a9e]">
                  {name}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{role}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
