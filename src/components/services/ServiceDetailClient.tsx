"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { ServicesNewsletter } from "@/components/services/sections";
import { fadeUp } from "@/lib/motion";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ServiceContent {
  title: string;
  heroTitle: string;
  lead: string;
  body: string;
  thumbs: string[];
  checklist: string[];
  accordion: { question: string; answer: string }[];
  image: string;
}

/* Sidebar service list */
const allSidebarServices = [
  { label: "Dog Behaviour Consultation",   slug: "dog-behaviour" },
  { label: "Cat Behaviour Consultation",   slug: "cat-behaviour" },
  { label: "Puppy Training & Socialisation", slug: "puppy-training" },
  { label: "Virtual Online Consultation",  slug: "virtual-consultation" },
  { label: "Pet Behaviour Expert Witness", slug: "expert-witness" },
];

/* ─────────────────────────────────────────────
   Accordion
───────────────────────────────────────────── */
function ServiceAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ marginTop: "56px" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const isLast = i === items.length - 1;

        return (
          <div
            key={item.question}
            style={{
              display: "flex",
              gap: "22px",
              position: "relative",
              paddingBottom: isLast ? "0" : "34px",
            }}
          >
            {/* Vertical connecting line */}
            {!isLast && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "19px",
                  top: "44px",
                  bottom: 0,
                  width: "2px",
                  background: "#f0c3d5",
                }}
              />
            )}

            {/* Pink circle toggle */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
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
                zIndex: 1,
                position: "relative",
              }}
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
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                    fontSize: "17px",
                    color: "#1c58a9",
                    fontWeight: 700,
                  }}
                >
                  {item.question}
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
                        fontFamily:
                          "var(--font-open-sans, 'Open Sans', sans-serif)",
                        fontSize: "14px",
                        color: "#7a8291",
                        maxWidth: "560px",
                        paddingTop: "14px",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main client component
───────────────────────────────────────────── */
export function ServiceDetailClient({
  slug,
  content,
}: {
  slug: string;
  content: ServiceContent;
}) {
  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section
        style={{ position: "relative", height: "430px", overflow: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.image}
          alt={content.heroTitle}
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

        {/* Gradient — left-heavy so text is readable */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,15,25,.55) 0%, rgba(10,15,25,.1) 60%)",
          }}
        />

        {/* Content — bottom-left, matches services hero */}
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
                {content.heroTitle}
              </h1>

              {/* Pink pill breadcrumb */}
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
                NeuroPet &nbsp;›&nbsp; Services &nbsp;›&nbsp; {content.heroTitle}
              </span>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* ══════════════════ SERVICE DETAIL ══════════════════ */}
      <section style={{ padding: "90px 0", background: "#fff" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.1fr 1fr",
              gap: "60px",
              alignItems: "start",
            }}
            className="max-lg:grid-cols-1"
          >
            {/* ── MAIN CONTENT ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* ── Title ── */}
              <h2
                style={{
                  fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#182b49",
                  marginBottom: "16px",
                  lineHeight: 1.25,
                }}
              >
                {content.title}
              </h2>

              {/* ── Lead ── */}
              <p
                style={{
                  fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                  fontSize: "16px",
                  color: "#7a8291",
                  marginBottom: "20px",
                  lineHeight: 1.7,
                }}
              >
                {content.lead}
              </p>

              {/* ── Body text ── */}
              <p
                style={{
                  fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                  fontSize: "14.5px",
                  color: "#7a8291",
                  marginBottom: "26px",
                  lineHeight: 1.75,
                }}
              >
                {content.body}
              </p>

              {/* ── THUMBNAIL + CHECKLIST ROW ──
                  Left col: 3 thumbnail images
                  Right col: paw checklist + CONTACT US button
              ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "30px",
                  alignItems: "start",
                  marginBottom: "0",
                }}
              >
                {/* Left — 3 stacked thumbnails */}
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "10px",
                    }}
                  >
                    {content.thumbs.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={src}
                        alt=""
                        style={{
                          width: "100%",
                          height: "90px",
                          objectFit: "cover",
                          borderRadius: "2px",
                          display: "block",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right — checklist + button */}
                <div>
                  {/* Paw checklist */}
                  <ul style={{ marginBottom: "26px" }}>
                    {content.checklist.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          marginBottom: "12px",
                          fontFamily:
                            "var(--font-open-sans, 'Open Sans', sans-serif)",
                          fontSize: "14px",
                          color: "#7a8291",
                          lineHeight: 1.6,
                        }}
                      >
                        {/* Blue circle paw badge — matches screenshot */}
                        <span
                          style={{
                            flexShrink: 0,
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#1c58a9",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "9px",
                            marginTop: "2px",
                          }}
                        >
                          🐾
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Blue rounded CONTACT US button — directly below checklist */}
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-block",
                      background: "#1c58a9",
                      color: "#fff",
                      padding: "14px 36px",
                      fontFamily:
                        "var(--font-poppins, 'Poppins', sans-serif)",
                      fontWeight: 700,
                      fontSize: "13px",
                      letterSpacing: ".5px",
                      borderRadius: "26px",
                      transition: "background .2s",
                    }}
                  >
                    CONTACT US
                  </Link>
                </div>
              </div>

              {/* ── Accordion — full width below the row ── */}
              <ServiceAccordion items={content.accordion} />

              {/* ── Back link ── */}
              <Link
                href="/services"
                style={{
                  display: "inline-block",
                  marginTop: "50px",
                  paddingTop: "14px",
                  borderTop: "1px solid #e4e6ea",
                  fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#1c58a9",
                  letterSpacing: ".2px",
                }}
              >
                « Go back to services
              </Link>
            </motion.div>

            {/* ── SIDEBAR ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div
                style={{
                  background: "#f4f5f7",
                  padding: "34px 30px 44px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "#182b49",
                    marginBottom: "12px",
                  }}
                >
                  All Services
                </h3>

                {/* Pink rule */}
                <div
                  style={{
                    width: "34px",
                    height: "2px",
                    background: "#e6266f",
                    margin: "0 auto 22px",
                  }}
                />

                {/* Service links */}
                <ul style={{ position: "relative", zIndex: 1 }}>
                  {allSidebarServices.map((s) => {
                    const isActive = s.slug === slug;
                    return (
                      <li key={s.slug} style={{ marginBottom: "10px" }}>
                        <Link
                          href={`/training-behaviour/${s.slug}`}
                          style={{
                            display: "block",
                            background: "#fff",
                            padding: "16px 20px",
                            fontFamily:
                              "var(--font-poppins, 'Poppins', sans-serif)",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: isActive ? "#e6266f" : "#182b49",
                            textAlign: "left",
                            boxShadow: "0 2px 6px rgba(0,0,0,.04)",
                            borderLeft: isActive
                              ? "3px solid #e6266f"
                              : "3px solid transparent",
                            transition: "all .2s",
                          }}
                        >
                          {s.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Paw watermark */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    opacity: 0.12,
                    fontSize: "70px",
                    lineHeight: 1,
                    zIndex: 0,
                    userSelect: "none",
                  }}
                >
                  🐾
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <ServicesNewsletter />
    </>
  );
}
