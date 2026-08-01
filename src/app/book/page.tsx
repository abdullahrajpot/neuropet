"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Upload } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { services, siteConfig } from "@/lib/site-config";
import { useRouter } from "next/navigation";
import { fadeUp } from "@/lib/motion";

/* ─────────────────────────────────────────────
   Step definitions  (same data as before)
───────────────────────────────────────────── */
const STEPS = ["Your Details", "Pet Info", "Review"];

/* ─────────────────────────────────────────────
   Reusable input styled to match the design
───────────────────────────────────────────── */
function Input({
  placeholder, value, onChange, type = "text", required = true,
}: {
  placeholder: string; value: string;
  onChange: (v: string) => void;
  type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", height: "46px",
        border: "1.5px solid #e4e6ea",
        borderRadius: "6px",
        padding: "0 14px",
        fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
        fontSize: "14px", color: "#2A2A2A",
        background: "#fff",
        outline: "none",
        transition: "border-color .18s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#2F6B5E")}
      onBlur={(e) => (e.target.style.borderColor = "#e4e6ea")}
    />
  );
}

function SelectField({
  label, value, onChange, options,
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%", height: "46px",
        border: "1.5px solid #e4e6ea",
        borderRadius: "6px",
        padding: "0 14px",
        fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
        fontSize: "14px", color: "#2A2A2A",
        background: "#fff", outline: "none",
        cursor: "pointer",
      }}
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

function Textarea({
  placeholder, value, onChange, rows = 4,
}: {
  placeholder: string; value: string;
  onChange: (v: string) => void; rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        border: "1.5px solid #e4e6ea",
        borderRadius: "6px",
        padding: "12px 14px",
        fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
        fontSize: "14px", color: "#2A2A2A",
        background: "#fff", outline: "none", resize: "vertical",
        transition: "border-color .18s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#2F6B5E")}
      onBlur={(e) => (e.target.style.borderColor = "#e4e6ea")}
    />
  );
}

/* ── Step progress indicator ── */
function StepBar({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "28px", gap: "0" }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? "1" : "none" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
            background: i <= step ? "#2F6B5E" : "#E4EFEB",
            color: i <= step ? "#fff" : "#6B6B6B",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
            fontSize: "13px", fontWeight: 700,
          }}>
            {i < step ? <Check style={{ width: "14px", height: "14px" }} strokeWidth={3} /> : i + 1}
          </div>
          <span style={{
            marginLeft: "6px",
            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
            fontSize: "12px", fontWeight: 600,
            color: i <= step ? "#2F6B5E" : "#6B6B6B",
            whiteSpace: "nowrap",
          }}>{label}</span>
          {i < STEPS.length - 1 && (
            <div style={{
              flex: 1, height: "2px", margin: "0 10px",
              background: i < step ? "#2F6B5E" : "#D8D2C8",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── FAQ data ── */
const faqs = [
  {
    q: "How often should I bring my pet in for a check-up?",
    a: "We recommend a behavioural review every 6–12 months, or whenever you notice a change in your pet's behaviour, energy, or social interactions.",
  },
  {
    q: "How can I improve my pet's dental hygiene at home?",
    a: "Daily brushing with pet-safe toothpaste is ideal. We can also show you enrichment feeding techniques that support dental health.",
  },
  {
    q: "What are the signs of common pet emergencies I should be aware of?",
    a: "Signs include sudden aggression, unresponsiveness, inability to settle, excessive vocalisation, or sudden changes in eating and toilet habits. Contact your vet immediately.",
  },
  {
    q: "What vaccinations does my pet need and when?",
    a: "Core vaccinations depend on species and lifestyle. Your vet will advise — we work closely with veterinary practices to coordinate behavioural and medical care.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: "#f4f5f7", padding: "80px 0" }}>
      <Container>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h2 style={{
            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
            fontSize: "32px", fontWeight: 700, color: "#182b49", marginBottom: "12px",
          }}>Frequently asked questions</h2>
          <p style={{
            fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
            fontSize: "15px", color: "#7a8291", maxWidth: "480px", margin: "0 auto",
          }}>
            Quick answers to the questions we hear most often from pet owners.
          </p>
        </motion.div>

        {/* 2-column grid of accordion items */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
        }} className="max-md:grid-cols-1">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} style={{
                background: "#fff",
                border: isOpen ? "1.5px solid #2F6B5E" : "1.5px solid #e4e6ea",
                borderRadius: "8px", overflow: "hidden",
                transition: "border-color .2s",
              }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", padding: "18px 20px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                    fontSize: "14.5px", fontWeight: 600,
                    color: isOpen ? "#2F6B5E" : "#182b49",
                    paddingRight: "12px", lineHeight: 1.4,
                  }}>{faq.q}</span>
                  <span style={{
                    flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%",
                    background: isOpen ? "#2F6B5E" : "#f4f5f7",
                    color: isOpen ? "#fff" : "#7a8291",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: 700, lineHeight: 1,
                    transition: "background .2s",
                  }}>{isOpen ? "−" : "+"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{
                        fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                        fontSize: "13.5px", color: "#7a8291",
                        padding: "0 20px 18px", lineHeight: 1.75,
                      }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Pink underline accent below grid — matches screenshot */}
        <div style={{
          width: "40px", height: "3px", background: "#e6266f",
          margin: "32px auto 0", borderRadius: "2px",
        }} />
      </Container>
    </section>
  );
}

/* ── Social follow section ── */
function FollowUs() {
  const posts = [
    { image: "/images/gallery1.jpg", caption: "Dog training session" },
    { image: "/images/servicepg3.jpg", caption: "Behaviour consultation" },
    { image: "/images/gallery8.jpg", caption: "Happy pet & owner" },
  ];

  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <Container>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
              fontSize: "30px", fontWeight: 700, color: "#182b49", marginBottom: "10px",
            }}>Follow us on</h2>
            <p style={{
              fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
              fontSize: "14px", color: "#7a8291", maxWidth: "360px", lineHeight: 1.7,
            }}>
              Stay up to date with the latest behaviour tips, client stories, and
              behind-the-scenes moments from our team.
            </p>
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#182b49", color: "#fff",
              padding: "12px 24px", borderRadius: "6px",
              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
              fontWeight: 700, fontSize: "13px", letterSpacing: ".3px",
              textDecoration: "none",
            }}
          >Follow on Instagram</a>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px",
        }} className="max-md:grid-cols-1">
          {posts.map((p) => (
            <div key={p.image} style={{
              borderRadius: "8px", overflow: "hidden", position: "relative",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image} alt={p.caption}
                style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
              />
              {/* Dark overlay + caption */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(24,43,73,.65) 0%, transparent 50%)",
              }} />
              <span style={{
                position: "absolute", bottom: "14px", left: "16px",
                fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                fontSize: "13px", fontWeight: 600, color: "#fff",
              }}>{p.caption}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function BookPage() {
  const router = useRouter();
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: services[0].title,
    petName: "", petType: "Dog",
    message: "", preferredDate: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/book/confirmation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ══════════════════════════════════
          BOOKING HERO SECTION
          Cream left panel + right text + dog
      ══════════════════════════════════ */}
      <section style={{ background: "#fff", paddingTop: "100px", paddingBottom: "0" }}>
        <Container>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "0", alignItems: "stretch",
            borderRadius: "12px", overflow: "hidden",
            boxShadow: "0 12px 48px -12px rgba(30,74,64,.14)",
            marginBottom: "0",
          }} className="max-lg:grid-cols-1">

            {/* ── LEFT: cream form panel ── */}
            <div style={{ background: "#FBF7F0", padding: "44px 44px 48px" }}>

              <StepBar step={step} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  {/* ── STEP 0: Your Details ── */}
                  {step === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {/* Row 1: Name + Email */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <Input placeholder="Name" value={form.name} onChange={(v) => update("name", v)} />
                        <Input placeholder="Email address" type="email" value={form.email} onChange={(v) => update("email", v)} />
                      </div>
                      {/* Row 2: Phone + Service */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <Input placeholder="Phone number" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
                        <SelectField
                          label="Service"
                          value={form.service}
                          onChange={(v) => update("service", v)}
                          options={[
                            ...services.map((s) => s.title),
                            "Pet Behaviour Expert Witness",
                            "Virtual Online Consultation",
                          ]}
                        />
                      </div>
                      {/* Row 3: Message */}
                      <Textarea
                        placeholder="Leave a message"
                        rows={4}
                        value={form.message}
                        onChange={(v) => update("message", v)}
                      />
                    </div>
                  )}

                  {/* ── STEP 1: Pet Info ── */}
                  {step === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <Input placeholder="Pet's name" value={form.petName} onChange={(v) => update("petName", v)} />
                        <SelectField
                          label="Pet type"
                          value={form.petType}
                          onChange={(v) => update("petType", v)}
                          options={["Dog", "Cat", "Other"]}
                        />
                      </div>
                      <Input
                        placeholder="Preferred date (optional)"
                        type="date" required={false}
                        value={form.preferredDate}
                        onChange={(v) => update("preferredDate", v)}
                      />
                      {/* Video upload */}
                      <div
                        onClick={() => setUploadDone(true)}
                        role="button" tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setUploadDone(true)}
                        style={{
                          border: "2px dashed #D8D2C8",
                          borderRadius: "6px", padding: "22px",
                          display: "flex", flexDirection: "column", alignItems: "center",
                          cursor: "pointer", background: "#fff",
                          transition: "border-color .18s",
                        }}
                      >
                        {uploadDone ? (
                          <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#5C9271" }}
                          >
                            <Check style={{ width: "28px", height: "28px" }} strokeWidth={2.5} />
                            <span style={{ marginTop: "6px", fontSize: "13px", fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)" }}>
                              Video ready
                            </span>
                          </motion.div>
                        ) : (
                          <>
                            <Upload style={{ width: "26px", height: "26px", color: "#6B6B6B" }} strokeWidth={1.5} />
                            <span style={{
                              marginTop: "8px", fontSize: "13px", color: "#6B6B6B",
                              fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                            }}>Click to upload a behaviour clip (optional)</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Review ── */}
                  {step === 2 && (
                    <div style={{
                      background: "#fff", borderRadius: "8px",
                      border: "1.5px solid #e4e6ea", padding: "24px",
                      display: "flex", flexDirection: "column", gap: "10px",
                    }}>
                      {[
                        ["Name", form.name],
                        ["Email", form.email],
                        ["Phone", form.phone],
                        ["Service", form.service],
                        ["Pet", `${form.petName} (${form.petType})`],
                        ...(form.preferredDate ? [["Preferred date", form.preferredDate]] : []),
                        ...(form.message ? [["Message", form.message]] : []),
                      ].map(([label, val]) => (
                        <div key={label} style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
                          <span style={{
                            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                            fontWeight: 700, color: "#182b49", minWidth: "100px",
                          }}>{label}:</span>
                          <span style={{
                            fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                            color: "#7a8291",
                          }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── Nav buttons ── */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: "24px",
              }}>
                {step > 0 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: "none", border: "1.5px solid #D8D2C8",
                      borderRadius: "26px", padding: "10px 20px",
                      fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                      fontSize: "13px", fontWeight: 600, color: "#6B6B6B",
                      cursor: "pointer",
                    }}
                  >
                    <ChevronLeft style={{ width: "15px", height: "15px" }} strokeWidth={2.5} />
                    Back
                  </button>
                ) : <span />}

                {step < 2 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    style={{
                      background: "#2F6B5E", color: "#fff",
                      border: "none", borderRadius: "26px", padding: "12px 32px",
                      fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                      fontWeight: 700, fontSize: "13px", letterSpacing: ".4px",
                      cursor: "pointer", transition: "background .2s",
                    }}
                  >
                    {step === 0 ? "Next →" : "Review →"}
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={loading}
                    style={{
                      background: loading ? "#6FA394" : "#D97540",
                      color: "#fff", border: "none", borderRadius: "26px",
                      padding: "12px 32px",
                      fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                      fontWeight: 700, fontSize: "13px", letterSpacing: ".4px",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Submitting…" : "Submit Booking"}
                  </button>
                )}
              </div>
            </div>

            {/* ── RIGHT: heading + description + dog image ── */}
            <div style={{
              background: "#fff",
              padding: "44px 48px",
              display: "flex", flexDirection: "column",
              justifyContent: "center",
            }}>
              {/* Trust badge */}
              <span style={{
                display: "inline-block", background: "#FBE4D2",
                color: "#D97540", borderRadius: "26px",
                padding: "5px 16px", marginBottom: "18px",
                fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                fontSize: "12px", fontWeight: 700, letterSpacing: ".5px",
                alignSelf: "flex-start",
              }}>Force-free · Evidence-based</span>

              <h1 style={{
                fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                fontSize: "38px", fontWeight: 700,
                color: "#182b49", lineHeight: 1.2, marginBottom: "18px",
              }}>
                Book your<br />
                <span style={{ color: "#2F6B5E" }}>appointment</span>
              </h1>

              <p style={{
                fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                fontSize: "14.5px", color: "#7a8291",
                lineHeight: 1.75, marginBottom: "28px", maxWidth: "340px",
              }}>
                Complete the form and we&apos;ll confirm your consultation
                within one business day. In-person and virtual sessions available
                across the UK.
              </p>

              {/* Quick info bullets */}
              {[
                "Certified Clinical Animal Behaviourist",
                "In-home, clinic & virtual sessions",
                "Personalised written behaviour plan",
              ].map((item) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "10px",
                  fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                  fontSize: "13.5px", color: "#7a8291",
                }}>
                  <span style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "#D97540", flexShrink: 0,
                  }} />
                  {item}
                </div>
              ))}

              {/* Dog image — circle clipped like screenshot */}
              <div style={{ marginTop: "28px", alignSelf: "flex-end" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dog5.png"
                  alt="Happy dog"
                  style={{
                    width: "180px", height: "180px",
                    objectFit: "cover", objectPosition: "top",
                    borderRadius: "50%",
                    border: "4px solid #E4EFEB",
                    boxShadow: "0 8px 32px -8px rgba(30,74,64,.22)",
                  }}
                />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Follow us */}
      <FollowUs />
    </>
  );
}
