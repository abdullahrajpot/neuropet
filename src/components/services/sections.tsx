"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dog,
  Cat,
  Baby,
  Video,
  ShieldCheck,
  ClipboardList,
  Plus,
  Minus,
} from "lucide-react";
import { Container } from "@/components/ui/shared";
import { fadeUp } from "@/lib/motion";

/* ─────────────────────────────────────────────
   1. HERO  — full-image, title bottom-left,
              pink pill breadcrumb (matches screenshot)
───────────────────────────────────────────── */
export function ServicesHero() {
  return (
    <section style={{ position: "relative", height: "430px", overflow: "hidden" }}>
      {/* Full-bleed background photo — dog & cat */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/servicebg.png"
        alt="Dog and cat relaxing together"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        loading="eager"
      />

      {/* Very subtle left-side shadow so white text reads — matches screenshot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(10,15,25,.32) 0%, rgba(10,15,25,0) 50%)",
        }}
      />

      {/* Content — bottom-left, matches screenshot exactly */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "70px",
        }}
      >
        <Container>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            {/* "Service" — Poppins 600, large white */}
            <h1
              style={{
                fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                fontSize: "56px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "1px",
                marginBottom: "22px",
                lineHeight: 1.1,
              }}
            >
              Service
            </h1>

            {/* Pink pill breadcrumb — rounded, matches screenshot */}
            <span
              style={{
                display: "inline-block",
                background: "#e6266f",
                color: "#fff",
                padding: "9px 22px",
                fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: ".3px",
                borderRadius: "4px",
              }}
            >
              NeuroPet &nbsp;›&nbsp; Service
            </span>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2. QUALITY SECTION
      Left:  h2 (Poppins bold), pink subhead,
             thin pink rule, grey body, blue rounded button
      Right: single image (matches screenshot)
───────────────────────────────────────────── */
export function ServicesIntro() {
  return (
    <section style={{ padding: "90px 0", background: "#fff" }}>
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="max-lg:grid-cols-1"
        >
          {/* ── Left: text ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Heading — Poppins 700, dark navy, matches screenshot weight */}
            <h2
              style={{
                fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                fontSize: "34px",
                fontWeight: 700,
                color: "#182b49",
                marginBottom: "14px",
                lineHeight: 1.25,
              }}
            >
              Quality for your best friend
            </h2>

            {/* Pink subheading */}
            <div
              style={{
                color: "#e6266f",
                fontWeight: 600,
                fontSize: "15px",
                fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                marginBottom: "18px",
              }}
            >
              We offer quick &amp; easy services for cats and dogs
            </div>

            {/* Thin pink horizontal rule */}
            <div
              style={{
                width: "46px",
                height: "3px",
                background: "#e6266f",
                marginBottom: "22px",
              }}
            />

            {/* Body text — Open Sans, grey */}
            <p
              style={{
                fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                color: "#7a8291",
                fontSize: "14.5px",
                marginBottom: "30px",
                maxWidth: "440px",
                lineHeight: 1.75,
              }}
            >
              We understand that your pets are family. Our evidence-based
              training and behavioural consultations are designed to address
              anxiety, reactivity, aggression, and everyday habits with
              compassionate, force-free solutions that truly fit into your home.
            </p>

            {/* Blue rounded button — matches screenshot exactly */}
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                background: "#1c58a9",
                color: "#fff",
                padding: "14px 32px",
                fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: ".5px",
                borderRadius: "26px",
                transition: "background .2s",
              }}
            >
              CONTACT US
            </Link>
          </motion.div>

          {/* ── Right: single image ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/servicepg.jpg"
              alt="Couple with their cat"
              style={{
                width: "100%",
                height: "370px",
                objectFit: "cover",
                display: "block",
                borderRadius: "4px",
              }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. SERVICES ICON STRIP
      Light grey bg, 3 icon cards,
      left/right arrows, square dot pagination
───────────────────────────────────────────── */
const allServices = [
  {
    icon: Dog,
    title: "Dog Behaviour",
    description:
      "Comprehensive in-home assessments for reactivity, aggression, separation anxiety, and fear-based challenges.",
    href: "/training-behaviour/dog-behaviour",
  },
  {
    icon: Cat,
    title: "Cat Behaviour",
    description:
      "Specialised support for litter avoidance, multi-cat tension, scratching, and indoor stress enrichment.",
    href: "/training-behaviour/cat-behaviour",
  },
  {
    icon: Baby,
    title: "Puppy Training",
    description:
      "Early foundation training, bite inhibition, toilet training, and safe socialisation for confident puppies.",
    href: "/training-behaviour/puppy-training",
  },
  {
    icon: Video,
    title: "Virtual Consultation",
    description:
      "Remote video coaching sessions with continuous chat support — perfect for busy schedules.",
    href: "/training-behaviour/virtual-consultation",
  },
  {
    icon: ShieldCheck,
    title: "Reactivity & Anxiety",
    description:
      "Custom desensitisation and counter-conditioning for leash reactivity, sound phobias, and separation distress.",
    href: "/training-behaviour/dog-behaviour",   // covered under dog behaviour
  },
  {
    icon: ClipboardList,
    title: "Expert Witness",
    description:
      "Independent legal expert reports, risk assessments, and court testimony for animal behaviour cases.",
    href: "/training-behaviour/expert-witness",
  },
];

export function ServicesGrid() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(allServices.length / perPage);
  const visible = allServices.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      style={{ background: "#f4f5f7", padding: "90px 0", position: "relative" }}
    >
      <Container>
        <div style={{ position: "relative" }}>
          {/* Left arrow */}
          <button
            onClick={() => setPage((p) => (p > 0 ? p - 1 : totalPages - 1))}
            style={{
              position: "absolute",
              top: "50%",
              left: "-30px",
              transform: "translateY(-50%)",
              fontSize: "28px",
              color: "#e6266f",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontWeight: 700,
              lineHeight: 1,
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Right arrow */}
          <button
            onClick={() => setPage((p) => (p < totalPages - 1 ? p + 1 : 0))}
            style={{
              position: "absolute",
              top: "50%",
              right: "-30px",
              transform: "translateY(-50%)",
              fontSize: "28px",
              color: "#e6266f",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontWeight: 700,
              lineHeight: 1,
            }}
            aria-label="Next"
          >
            ›
          </button>

          {/* 3-column grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "40px",
                textAlign: "center",
              }}
              className="max-lg:grid-cols-1"
            >
              {visible.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title}>
                    {/* SVG-style icon circle */}
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        margin: "0 auto 26px",
                        color: "#e6266f",
                      }}
                    >
                      <Icon
                        style={{
                          width: "100%",
                          height: "100%",
                          stroke: "#e6266f",
                          fill: "none",
                          strokeWidth: 1.6,
                        }}
                      />
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                        fontSize: "19px",
                        color: "#182b49",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#7a8291",
                        maxWidth: "280px",
                        margin: "0 auto 16px",
                        lineHeight: 1.7,
                      }}
                    >
                      {service.description}
                    </p>

                    <Link
                      href={service.href}
                      style={{
                        display: "inline-block",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: "#1c58a9",
                        borderTop: "1px solid #e4e6ea",
                        paddingTop: "10px",
                        letterSpacing: ".3px",
                        fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                      }}
                    >
                      « read more
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Square dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "46px",
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                style={{
                  width: "9px",
                  height: "9px",
                  border: `1.5px solid ${i === page ? "#e6266f" : "#c7cbd3"}`,
                  background: i === page ? "#e6266f" : "transparent",
                  cursor: "pointer",
                  borderRadius: 0,
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   4. GET IN TOUCH — exact 50/50 split
      Left: full photo
      Right: blue bg, centered text + pink pill button
───────────────────────────────────────────── */
export function ServicesGetInTouch() {
  return (
    <section
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      className="max-lg:grid-cols-1"
    >
      {/* Left — photo */}
      <div style={{ height: "420px", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/servicepg2.jpg"
          alt="Happy dog running in park"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Right — blue CTA */}
      <motion.div
        style={{
          background: "#1c58a9",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: "440px",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontSize: "30px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Get in touch with us
          </h2>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.9,
              marginBottom: "30px",
              lineHeight: 1.7,
            }}
          >
            Have questions about our training or behaviour plans? Reach out
            today to speak with our certified specialists and start your
            journey toward a calmer, happier home.
          </p>

          {/* Pink pill button — matches HTML exactly */}
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: "#e6266f",
              color: "#fff",
              borderRadius: "26px",
              padding: "15px 38px",
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: ".5px",
              transition: "background .2s",
            }}
          >
            CONTACT US
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   5. FAQ
      Left: dogs image
      Right: h2, pink rule, accordion items
             with pink circle markers + vertical line
───────────────────────────────────────────── */
const faqList = [
  {
    question: "Our Philosophy",
    answer:
      "Our force-free, evidence-based methods prioritise animal welfare and positive reinforcement. We never use aversive tools, physical force, or intimidation — ensuring long-lasting trust between you and your pet.\n\nEvery behaviour plan is built around your pet's individual history, triggers, and household dynamics, with measurable milestones and clear owner guidance.",
  },
  {
    question: "Our Organisation",
    answer:
      "NeuroPet is a specialist pet behaviour consultancy founded on clinical science and compassionate practice. Our team holds internationally recognised qualifications in veterinary behaviour.",
  },
  {
    question: "Partnerships with our team",
    answer:
      "We collaborate closely with primary veterinarians and veterinary specialists to rule out medical causes for behavioural changes and coordinate holistic, multidisciplinary support for your pet.",
  },
];

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: "100px 0", background: "#fff" }}>
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "70px",
            alignItems: "start",
          }}
          className="max-lg:grid-cols-1"
        >
          {/* Left — dogs image */}
          <motion.div
            style={{ position: "relative" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/servicepg3.jpg"
              alt="Three happy dogs"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                fontSize: "32px",
                fontWeight: 700,
                color: "#182b49",
                marginBottom: "14px",
              }}
            >
              Frequently asked questions
            </h2>

            {/* Pink rule */}
            <div
              style={{
                width: "46px",
                height: "3px",
                background: "#e6266f",
                marginBottom: "40px",
              }}
            />

            {/* FAQ items with connecting vertical line */}
            <div>
              {faqList.map((faq, i) => {
                const isOpen = openIndex === i;
                const isLast = i === faqList.length - 1;

                return (
                  <div
                    key={faq.question}
                    style={{
                      display: "flex",
                      gap: "22px",
                      position: "relative",
                      paddingBottom: isLast ? "0" : "38px",
                    }}
                  >
                    {/* Vertical connecting line */}
                    {!isLast && (
                      <div
                        style={{
                          position: "absolute",
                          left: "19px",
                          top: "44px",
                          bottom: 0,
                          width: "2px",
                          background: "#f0c3d5",
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Pink circle marker */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      style={{
                        flexShrink: 0,
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#e6266f",
                        color: "#fff",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "20px",
                        fontWeight: 700,
                        zIndex: 1,
                        position: "relative",
                        fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                      }}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? (
                        <Minus style={{ width: "16px", height: "16px" }} strokeWidth={3} />
                      ) : (
                        <Plus style={{ width: "16px", height: "16px" }} strokeWidth={3} />
                      )}
                    </button>

                    {/* Body */}
                    <div style={{ flex: 1 }}>
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          paddingBottom: "16px",
                          borderBottom: "1px solid #e4e6ea",
                          marginBottom: "0",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                            fontSize: "17px",
                            color: "#1c58a9",
                            fontWeight: 700,
                          }}
                        >
                          {faq.question}
                        </h3>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#7a8291",
                                maxWidth: "520px",
                                paddingTop: "14px",
                                lineHeight: 1.7,
                                whiteSpace: "pre-line",
                              }}
                            >
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   6. NEWSLETTER
      Full-width bg image with dark overlay,
      left-aligned text + inline input+button form
───────────────────────────────────────────── */
export function ServicesNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "70px 0",
        overflow: "hidden",
        background: "#b3665a",
      }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/servicepg4.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.55,
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(60,30,25,.55) 0%, rgba(60,30,25,.15) 60%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ color: "#fff" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontSize: "28px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Subscribe to our newsletter
          </h2>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.95,
              marginBottom: "26px",
            }}
          >
            We send e-mails once a month, we never send Spam!
          </p>

          {subscribed ? (
            <p style={{ fontWeight: 600, fontSize: "15px" }}>
              ✓ Thank you for subscribing!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", maxWidth: "480px" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here"
                style={{
                  flex: 1,
                  border: "none",
                  padding: "0 18px",
                  fontSize: "14px",
                  fontFamily: "var(--font-open-sans, Open Sans, sans-serif)",
                  outline: "none",
                  height: "52px",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#e6266f",
                  color: "#fff",
                  border: "none",
                  padding: "0 30px",
                  fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: ".4px",
                  cursor: "pointer",
                  height: "52px",
                  transition: "background .2s",
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
