"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/shared";
import { services, siteConfig } from "@/lib/site-config";
import { fadeUp } from "@/lib/motion";

/* ─────────────────────────────────────────────
   INPUT STYLES
───────────────────────────────────────────── */
const BASE: React.CSSProperties = {
  fontFamily: "var(--font-inter,'Inter',sans-serif)",
  border: "1.5px solid #D8D2C8",
  background: "#fff",
  borderRadius: "999px",      /* fully-rounded pill inputs — matches screenshot */
  padding: "11px 18px",
  fontSize: "14px",
  color: "#2A2A2A",
  width: "100%",
  outline: "none",
  transition: "border-color .18s, box-shadow .18s",
};

const LABEL: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "var(--font-inter,'Inter',sans-serif)",
  color: "#4c5566",
  marginBottom: "6px",
  display: "block",
};

function FInput({
  id, label, type = "text", placeholder, value, onChange, required = true,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [f, setF] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={LABEL}>{label}</label>
      <input
        id={id} type={type} placeholder={placeholder}
        required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          ...BASE,
          borderColor: f ? "#2F6B5E" : "#D8D2C8",
          boxShadow: f ? "0 0 0 3px rgba(47,107,94,0.12)" : "none",
        }}
      />
    </div>
  );
}

function FSelect({
  id, label, value, onChange, options,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  const [f, setF] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={LABEL}>{label}</label>
      <select
        id={id} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          ...BASE,
          borderColor: f ? "#2F6B5E" : "#D8D2C8",
          boxShadow: f ? "0 0 0 3px rgba(47,107,94,0.12)" : "none",
          cursor: "pointer",
        }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ SECTION
   Left-aligned h2 + subtitle
   2-col card grid — white cards, pink bg when open,
   chevron-circle icon (outline → filled dark)
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

        {/* Heading — LEFT aligned, large Fraunces */}
        <div style={{ marginBottom: "36px" }}>
          <h2 style={{
            fontFamily: "var(--font-fraunces,'Fraunces',Georgia,serif)",
            fontSize: "42px", fontWeight: 500,
            color: "#182b49", lineHeight: 1.1, marginBottom: "14px",
          }}>
            Frequently asked questions
          </h2>
          <p style={{
            fontFamily: "var(--font-inter,'Inter',sans-serif)",
            fontSize: "14.5px", color: "#7a8291",
            maxWidth: "420px", lineHeight: 1.65,
          }}>
            Quick answers to the questions we hear most from pet owners
            before booking their first consultation.
          </p>
        </div>

        {/* 2-col card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}>
          {FAQ_DATA.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  background: isOpen ? "#FFE4F0" : "#ffffff",
                  borderRadius: "16px",
                  padding: "20px 22px",
                  cursor: "pointer",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                  transition: "background .22s ease",
                }}
              >
                {/* Row: question + chevron icon */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "14px",
                }}>
                  <span style={{
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: "15px", fontWeight: 600,
                    color: "#182b49", lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>

                  {/* Chevron-in-circle — outline closed, dark filled open */}
                  <span style={{
                    flexShrink: 0,
                    width: "30px", height: "30px",
                    borderRadius: "50%",
                    border: `1.5px solid ${isOpen ? "#182b49" : "#bbb"}`,
                    background: isOpen ? "#182b49" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2px",
                    transition: "all .22s ease",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform .22s ease",
                      }}>
                      <path d="M1.5 3.5L5.5 7.5L9.5 3.5"
                        stroke={isOpen ? "#fff" : "#666"}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{
                        fontFamily: "var(--font-inter,'Inter',sans-serif)",
                        fontSize: "13.5px", color: "#5B5F55",
                        lineHeight: 1.75,
                        marginTop: "12px",
                        marginBottom: 0,
                      }}>
                        {faq.a}
                      </p>
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
   FOLLOW SECTION
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
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-nunito,'Nunito Sans',sans-serif)",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#D97540", marginBottom: "6px",
            }}>On the socials</p>
            <h2 style={{
              fontFamily: "var(--font-fraunces,'Fraunces',Georgia,serif)",
              fontSize: "32px", fontWeight: 500, color: "#1E4A40",
              marginBottom: "8px", lineHeight: 1.15,
            }}>Follow along</h2>
            <p style={{
              fontFamily: "var(--font-inter,'Inter',sans-serif)",
              fontSize: "14px", color: "#6B6B6B",
              maxWidth: "340px", lineHeight: 1.65,
            }}>Training clips, behaviour tips, and the odd very good boy.</p>
          </div>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-inter,'Inter',sans-serif)",
              fontSize: "13px", fontWeight: 600, color: "#1E4A40",
              textDecoration: "none", borderBottom: "1.5px solid #1E4A40",
              paddingBottom: "2px",
            }}>View more →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          {GALLERY.map((g) => (
            <div key={g.src} style={{
              position: "relative", borderRadius: "20px",
              overflow: "hidden", aspectRatio: "3/4",
              boxShadow: "0 12px 32px -12px rgba(30,74,64,0.18)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.alt} style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transition: "transform .45s ease",
              }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
              />
              <span style={{
                position: "absolute", top: "12px", left: "12px",
                background: "rgba(255,255,255,0.92)", borderRadius: "999px",
                padding: "5px 12px",
                fontFamily: "var(--font-nunito,'Nunito Sans',sans-serif)",
                fontSize: "11.5px", fontWeight: 700, color: "#1E4A40",
              }}>{g.tag}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
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
      {/* ═══════════════════════════════════════
          HERO
          White bg, no section color
          Left = pale-yellow card, same height as right
          Right = huge bold title + description + large dog overflowing circle
      ═══════════════════════════════════════ */}
      <section style={{
        background: "#ffffff",
        paddingTop: "100px",
        paddingBottom: "60px",
      }}>
        <Container>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "stretch",   /* ← both columns same height */
          }}>

            {/* ════ LEFT — pale yellow card, flex col so it fills height ════ */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex" }}
            >
              <div style={{
                background: "#FEFBD8",
                borderRadius: "24px",
                padding: "40px 36px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                {sent ? (
                  <div style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    textAlign: "center",
                  }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: "#E4EFEB",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "22px", marginBottom: "14px",
                    }}>✓</div>
                    <h3 style={{
                      fontFamily: "var(--font-inter,'Inter',sans-serif)",
                      fontSize: "22px", fontWeight: 700, color: "#182b49",
                      marginBottom: "8px",
                    }}>Message sent!</h3>
                    <p style={{
                      fontFamily: "var(--font-inter,'Inter',sans-serif)",
                      fontSize: "14px", color: "#6B6B6B",
                    }}>We'll follow up within one business day.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={submit}
                    style={{ display: "flex", flexDirection: "column", flex: 1, gap: "20px" }}
                  >
                    {/* Row 1 — Name + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <FInput id="name" label="Name" placeholder="John Carter"
                        value={form.name} onChange={(v) => set("name", v)} />
                      <FInput id="email" label="Email address" type="email"
                        placeholder="email@example.com"
                        value={form.email} onChange={(v) => set("email", v)} />
                    </div>

                    {/* Row 2 — Phone + Service */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <FInput id="phone" label="Phone number" type="tel"
                        placeholder="(135) 435 – 5323" required={false}
                        value={form.phone} onChange={(v) => set("phone", v)} />
                      <FSelect id="service" label="Service"
                        value={form.service} onChange={(v) => set("service", v)}
                        options={[
                          ...services.map((s) => s.title),
                          "Virtual Online Consultation",
                          "Pet Behaviour Expert Witness",
                        ]}
                      />
                    </div>

                    {/* Row 3 — Message, flex-grows to fill remaining card height */}
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <label htmlFor="msg" style={LABEL}>Leave us a message</label>
                      <textarea
                        id="msg"
                        placeholder="Please type your message here..."
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        style={{
                          ...BASE,
                          borderRadius: "16px",
                          flex: 1,
                          minHeight: "120px",
                          resize: "none",
                          padding: "14px 18px",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#2F6B5E";
                          e.target.style.boxShadow = "0 0 0 3px rgba(47,107,94,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#D8D2C8";
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
                          padding: "13px 32px",
                          borderRadius: "999px",
                          background: loading ? "#6FA394" : "#1a1a1a",
                          color: "#fff",
                          border: "none",
                          cursor: loading ? "not-allowed" : "pointer",
                          fontFamily: "var(--font-inter,'Inter',sans-serif)",
                          fontWeight: 600,
                          fontSize: "15px",
                          transition: "transform .18s, box-shadow .18s",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 10px 28px -8px rgba(0,0,0,0.28)";
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

            {/* ════ RIGHT — big title top, large dog image bottom ════ */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Title + description — top of column */}
              <div>
                {/* Very large bold sans title — matches screenshot exactly */}
                <h1 style={{
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "64px",
                  fontWeight: 800,
                  color: "#111111",
                  lineHeight: 1.0,
                  marginBottom: "22px",
                  letterSpacing: "-0.02em",
                }}>
                  Book your<br />appointment
                </h1>

                <p style={{
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "15px",
                  color: "#7a8291",
                  lineHeight: 1.72,
                  maxWidth: "400px",
                }}>
                  Whether it&apos;s separation anxiety, reactivity, or a new
                  puppy finding their feet — we&apos;ll build a plan around your
                  pet, not a script. First sessions run 60–75 minutes, in person
                  or online.
                </p>
              </div>

              {/* Dog image overflowing a light-blue circle — bottom of column */}
              <div style={{
                position: "relative",
                height: "340px",
                marginTop: "32px",
              }}>
                {/* Light blue circle — sits in lower-center */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  background: "#D5EEE9",
                }} />

                {/* Dog PNG — taller than circle, overflows above it */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dog5.png"
                  alt="Happy dog"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "360px",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    zIndex: 1,
                  }}
                />

                {/* Small pink decorative ring — centered below the image, matches screenshot */}
                <div style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "3.5px solid #e6266f",
                  background: "transparent",
                  zIndex: 2,
                }} />
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      <FAQSection />
      <FollowSection />
    </>
  );
}
