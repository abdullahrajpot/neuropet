"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/shared";
import { services, siteConfig } from "@/lib/site-config";
import { fadeUp } from "@/lib/motion";

/* ─────────────────────────────────────────────
   Reusable field components
───────────────────────────────────────────── */
function Field({
  id, label, type = "text", placeholder, value, onChange, required = true,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label htmlFor={id} style={{
        fontSize: "13.5px", fontWeight: 600,
        fontFamily: "var(--font-inter,'Inter',sans-serif)",
        color: "#3d3d3d",
      }}>{label}</label>
      <input
        id={id} type={type} placeholder={placeholder}
        required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: "var(--font-inter,'Inter',sans-serif)",
          fontSize: "14px", color: "#2A2A2A",
          background: "#fff",
          border: `1.5px solid ${focused ? "#2F6B5E" : "#e0dbd0"}`,
          borderRadius: "999px",           /* fully-rounded pill */
          padding: "11px 18px",
          outline: "none",
          width: "100%",
          boxShadow: focused ? "0 0 0 3px rgba(47,107,94,0.10)" : "none",
          transition: "border-color .18s, box-shadow .18s",
        }}
      />
    </div>
  );
}

function ServiceSelect({
  id, label, value, onChange, options,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label htmlFor={id} style={{
        fontSize: "13.5px", fontWeight: 600,
        fontFamily: "var(--font-inter,'Inter',sans-serif)",
        color: "#3d3d3d",
      }}>{label}</label>
      <select
        id={id} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: "var(--font-inter,'Inter',sans-serif)",
          fontSize: "14px", color: "#2A2A2A",
          background: "#fff",
          border: `1.5px solid ${focused ? "#2F6B5E" : "#e0dbd0"}`,
          borderRadius: "999px",
          padding: "11px 18px",
          outline: "none",
          width: "100%",
          cursor: "pointer",
          boxShadow: focused ? "0 0 0 3px rgba(47,107,94,0.10)" : "none",
          transition: "border-color .18s, box-shadow .18s",
        }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ — left-aligned heading, 2-col card grid
   White cards, pink bg when open, chevron icon
───────────────────────────────────────────── */
const FAQ_DATA = [
  {
    q: "What should I bring to my first consultation?",
    a: "Just your pet, their regular food or treats, and anything they're already anxious around — a leash, a crate, a specific toy. If you have vet records on hand, bring those too.",
  },
  {
    q: "How can I improve my pet's dental hygiene at home?",
    a: "Daily brushing with a pet-safe toothpaste, dental chews between meals, and a yearly vet check are the three things that make the biggest difference.",
  },
  {
    q: "Do you offer virtual consultations?",
    a: "Yes — most behaviour work translates well to video, especially with a short clip of the behaviour beforehand. You'll get the same written plan as an in-person session.",
  },
  {
    q: "What vaccinations does my pet need and when?",
    a: "This depends on age and species — we'll flag anything relevant during intake, but for a full schedule your regular vet is the best source.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#f0f0f0", padding: "80px 0" }}>
      <Container>
        <div style={{ marginBottom: "36px" }}>
          <h2 style={{
            fontFamily: "var(--font-fraunces,'Fraunces',Georgia,serif)",
            fontSize: "40px", fontWeight: 500,
            color: "#182b49", lineHeight: 1.1, marginBottom: "12px",
          }}>Frequently asked questions</h2>
          <p style={{
            fontFamily: "var(--font-inter,'Inter',sans-serif)",
            fontSize: "14.5px", color: "#7a8291",
            maxWidth: "400px", lineHeight: 1.65,
          }}>
            Quick answers to the questions we hear most from pet owners
            before booking their first consultation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {FAQ_DATA.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  background: isOpen ? "#FFE4F0" : "#fff",
                  borderRadius: "16px", padding: "20px 22px",
                  cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                  transition: "background .22s",
                }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px" }}>
                  <span style={{
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: "15px", fontWeight: 600,
                    color: "#182b49", lineHeight: 1.4,
                  }}>{faq.q}</span>
                  <span style={{
                    flexShrink: 0, width: "30px", height: "30px", borderRadius: "50%",
                    border: `1.5px solid ${isOpen ? "#182b49" : "#bbb"}`,
                    background: isOpen ? "#182b49" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: "2px", transition: "all .22s",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .22s" }}>
                      <path d="M1.5 3.5L5.5 7.5L9.5 3.5"
                        stroke={isOpen ? "#fff" : "#666"}
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}>
                      <p style={{
                        fontFamily: "var(--font-inter,'Inter',sans-serif)",
                        fontSize: "13.5px", color: "#5B5F55",
                        lineHeight: 1.75, marginTop: "12px", marginBottom: 0,
                      }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Follow section
───────────────────────────────────────────── */
const GALLERY = [
  { src: "/images/gallery1.jpg",   tag: "Instagram", alt: "Dog training session" },
  { src: "/images/servicepg3.jpg", tag: "Instagram", alt: "Behaviour consultation" },
  { src: "/images/gallery8.jpg",   tag: "Instagram", alt: "Happy pet moment" },
];

function FollowSection() {
  return (
    <section style={{ background: "#FBF7F0", padding: "80px 0 100px" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-nunito,'Nunito Sans',sans-serif)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D97540", marginBottom: "6px" }}>On the socials</p>
            <h2 style={{ fontFamily: "var(--font-fraunces,'Fraunces',Georgia,serif)", fontSize: "32px", fontWeight: 500, color: "#1E4A40", marginBottom: "8px", lineHeight: 1.15 }}>Follow along</h2>
            <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14px", color: "#6B6B6B", maxWidth: "340px", lineHeight: 1.65 }}>Training clips, behaviour tips, and the odd very good boy.</p>
          </div>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "13px", fontWeight: 600, color: "#1E4A40", textDecoration: "none", borderBottom: "1.5px solid #1E4A40", paddingBottom: "2px" }}>
            View more →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          {GALLERY.map((g) => (
            <div key={g.src} style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 12px 32px -12px rgba(30,74,64,0.18)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .45s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
              <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.92)", borderRadius: "999px", padding: "5px 12px", fontFamily: "var(--font-nunito,'Nunito Sans',sans-serif)", fontSize: "11.5px", fontWeight: 700, color: "#1E4A40" }}>{g.tag}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: services[0].title,
    message: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          White page background
          Left  = pale-yellow rounded card (same height as right)
          Right = badge + large title + desc + bullets + dog image
                  dog image: large, bottom-right, overflows circle
      ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", paddingTop: "100px", paddingBottom: "80px" }}>
        <Container>

          {/* 2-col grid, stretch = both sides same height */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "stretch",
          }}>

            {/* ──────────────────────────────
                LEFT — pale yellow card
            ────────────────────────────── */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex" }}
            >
              {/* Card stretches full column height */}
              <div style={{
                background: "#FEFBD8",   /* pale yellow */
                borderRadius: "24px",
                padding: "40px 36px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}>
                {sent ? (
                  /* Success state */
                  <div style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", textAlign: "center",
                  }}>
                    <div style={{
                      width: "54px", height: "54px", borderRadius: "50%",
                      background: "#E4EFEB", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "24px", marginBottom: "16px",
                    }}>✓</div>
                    <h3 style={{
                      fontFamily: "var(--font-inter,'Inter',sans-serif)",
                      fontSize: "20px", fontWeight: 700, color: "#182b49", marginBottom: "8px",
                    }}>Message sent!</h3>
                    <p style={{
                      fontFamily: "var(--font-inter,'Inter',sans-serif)",
                      fontSize: "14px", color: "#6B6B6B",
                    }}>We&apos;ll follow up within one business day.</p>
                  </div>
                ) : (
                  /* Form — flex col, textarea fills remaining height */
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", flex: 1, gap: "18px" }}>

                    {/* Row 1: Name + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <Field id="name" label="Name" placeholder="John Carter"
                        value={form.name} onChange={(v) => set("name", v)} />
                      <Field id="email" label="Email address" type="email"
                        placeholder="email@example.com"
                        value={form.email} onChange={(v) => set("email", v)} />
                    </div>

                    {/* Row 2: Phone + Service */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <Field id="phone" label="Phone number" type="tel"
                        placeholder="(135) 435 – 5323" required={false}
                        value={form.phone} onChange={(v) => set("phone", v)} />
                      <ServiceSelect id="service" label="Service"
                        value={form.service} onChange={(v) => set("service", v)}
                        options={[
                          ...services.map((s) => s.title),
                          "Virtual Online Consultation",
                          "Pet Behaviour Expert Witness",
                        ]}
                      />
                    </div>

                    {/* Row 3: Message — flex: 1 so it fills remaining card height */}
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <label htmlFor="msg" style={{
                        fontSize: "13.5px", fontWeight: 600,
                        fontFamily: "var(--font-inter,'Inter',sans-serif)",
                        color: "#3d3d3d", marginBottom: "7px",
                      }}>
                        Leave us a message
                      </label>
                      <textarea
                        id="msg"
                        placeholder="Please type your message here..."
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        style={{
                          fontFamily: "var(--font-inter,'Inter',sans-serif)",
                          fontSize: "14px", color: "#2A2A2A",
                          background: "#fff",
                          border: "1.5px solid #e0dbd0",
                          borderRadius: "16px",   /* rect not pill for textarea */
                          padding: "14px 18px",
                          outline: "none",
                          width: "100%",
                          flex: 1,
                          minHeight: "120px",
                          resize: "none",
                          transition: "border-color .18s, box-shadow .18s",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#2F6B5E";
                          e.target.style.boxShadow = "0 0 0 3px rgba(47,107,94,0.10)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e0dbd0";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Send button — dark pill, left-aligned */}
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          padding: "12px 30px",
                          borderRadius: "999px",
                          background: loading ? "#888" : "#1a1a1a",
                          color: "#fff",
                          border: "none",
                          cursor: loading ? "not-allowed" : "pointer",
                          fontFamily: "var(--font-inter,'Inter',sans-serif)",
                          fontWeight: 600, fontSize: "15px",
                          transition: "transform .18s, box-shadow .18s",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 10px 24px -6px rgba(0,0,0,0.3)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {loading ? "Sending…" : "Send message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ──────────────────────────────
                RIGHT — title, description, bullets, dog image
                Uses flexbox column: content top, image bottom-right
            ────────────────────────────── */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Top content */}
              <div>
                {/* Trust badge pill */}
                <span style={{
                  display: "inline-block",
                  background: "#FBE4D2",
                  color: "#D97540",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "12.5px", fontWeight: 700,
                  letterSpacing: ".02em",
                  marginBottom: "20px",
                }}>
                  Force-free · Evidence-based
                </span>

                {/* Large bold title — same weight/style as screenshot */}
                <h1 style={{
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "60px",
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  marginBottom: "18px",
                  color: "#1E4A40",      /* site primary-900 teal */
                }}>
                  Book your<br />
                  <span style={{ color: "#D97540" }}>appointment</span>
                </h1>

                {/* Description */}
                <p style={{
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "15px", color: "#7a8291",
                  lineHeight: 1.7, maxWidth: "380px",
                  marginBottom: "24px",
                }}>
                  Complete the form and we&apos;ll confirm your consultation
                  within one business day. In-person and virtual sessions
                  available across the UK.
                </p>

                {/* Bullet points — orange dots */}
                {[
                  "Certified Clinical Animal Behaviourist",
                  "In-home, clinic & virtual sessions",
                  "Personalised written behaviour plan",
                ].map((item) => (
                  <div key={item} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    marginBottom: "10px",
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: "14px", color: "#555",
                  }}>
                    <span style={{
                      width: "9px", height: "9px",
                      borderRadius: "50%",
                      background: "#D97540",
                      flexShrink: 0,
                    }} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Dog image area — fills bottom of right column
                  Large dog PNG, bottom-right, overflows above light-blue circle */}
              <div style={{
                position: "relative",
                height: "280px",
                marginTop: "28px",
                overflow: "visible",
              }}>
                {/* Light blue/teal circle — sits at bottom-right */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "230px",
                  height: "230px",
                  borderRadius: "50%",
                  background: "#D5EEE9",
                }} />

                {/* Dog image — overflows above the circle */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dog5.png"
                  alt="Happy dog"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "-10px",
                    height: "310px",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    zIndex: 1,
                  }}
                />
              </div>
            </motion.div>

          </div>

          {/* Small pink decorative ring — centred below the hero grid */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "36px",
          }}>
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "50%",
              border: "3px solid #e6266f",
              background: "transparent",
            }} />
          </div>

        </Container>
      </section>

      <FAQSection />
      <FollowSection />
    </>
  );
}
