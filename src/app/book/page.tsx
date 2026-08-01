"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Upload } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { services, siteConfig } from "@/lib/site-config";
import { useRouter } from "next/navigation";
import { fadeUp } from "@/lib/motion";

const STEPS = ["Your Details", "Pet Info", "Review"];

/* ── pill input ── */
function PillInput({ id, label, type = "text", placeholder, value, onChange, required = true }: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [f, setF] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label htmlFor={id} style={{ fontSize: "13.5px", fontWeight: 600, fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#1E4A40" }}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} required={required} value={value}
        onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14px", color: "#2A2A2A", background: "#fff", border: `1.5px solid ${f ? "#2F6B5E" : "#b8d4cc"}`, borderRadius: "999px", padding: "11px 18px", outline: "none", width: "100%", boxShadow: f ? "0 0 0 3px rgba(47,107,94,0.10)" : "none", transition: "border-color .18s, box-shadow .18s" }} />
    </div>
  );
}

/* ── pill select ── */
function PillSelect({ id, label, value, onChange, options }: {
  id: string; label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  const [f, setF] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label htmlFor={id} style={{ fontSize: "13.5px", fontWeight: 600, fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#1E4A40" }}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14px", color: "#2A2A2A", background: "#fff", border: `1.5px solid ${f ? "#2F6B5E" : "#b8d4cc"}`, borderRadius: "999px", padding: "11px 18px", outline: "none", width: "100%", cursor: "pointer", boxShadow: f ? "0 0 0 3px rgba(47,107,94,0.10)" : "none", transition: "border-color .18s" }}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ── step bar ── */
function StepBar({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, background: i <= step ? "#2F6B5E" : "#E4EFEB", color: i <= step ? "#fff" : "#6B6B6B", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "13px", fontWeight: 700 }}>
            {i < step ? <Check style={{ width: "14px", height: "14px" }} strokeWidth={3} /> : i + 1}
          </div>
          <span style={{ marginLeft: "6px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "12px", fontWeight: 600, color: i <= step ? "#2F6B5E" : "#6B6B6B", whiteSpace: "nowrap" }}>{label}</span>
          {i < STEPS.length - 1 && <div style={{ flex: 1, height: "2px", margin: "0 10px", background: i < step ? "#2F6B5E" : "#D8D2C8" }} />}
        </div>
      ))}
    </div>
  );
}

/* ── FAQ ── */
const FAQ_DATA = [
  { q: "How often should I bring my pet in for a check-up?", a: "We recommend a behavioural review every 6–12 months, or whenever you notice a change in your pet's behaviour, energy, or social interactions." },
  { q: "How can I improve my pet's dental hygiene at home?", a: "Daily brushing with pet-safe toothpaste is ideal. We can also show you enrichment feeding techniques that support dental health." },
  { q: "What are the signs of common pet emergencies?", a: "Signs include sudden aggression, unresponsiveness, inability to settle, excessive vocalisation, or sudden changes in eating and toilet habits. Contact your vet immediately." },
  { q: "What vaccinations does my pet need and when?", a: "Core vaccinations depend on species and lifestyle. Your vet will advise — we work closely with veterinary practices to coordinate care." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#f0f0f0", padding: "80px 0" }}>
      <Container>
        <div style={{ marginBottom: "36px" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces,'Fraunces',Georgia,serif)", fontSize: "40px", fontWeight: 500, color: "#182b49", lineHeight: 1.1, marginBottom: "12px" }}>Frequently asked questions</h2>
          <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14.5px", color: "#7a8291", maxWidth: "400px", lineHeight: 1.65 }}>Quick answers to the questions we hear most often from pet owners.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {FAQ_DATA.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} onClick={() => setOpen(isOpen ? null : i)}
                style={{ background: isOpen ? "#FFE4F0" : "#fff", borderRadius: "16px", padding: "20px 22px", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", transition: "background .22s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px" }}>
                  <span style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "15px", fontWeight: 600, color: "#182b49", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ flexShrink: 0, width: "30px", height: "30px", borderRadius: "50%", border: `1.5px solid ${isOpen ? "#182b49" : "#bbb"}`, background: isOpen ? "#182b49" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px", transition: "all .22s" }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .22s" }}>
                      <path d="M1.5 3.5L5.5 7.5L9.5 3.5" stroke={isOpen ? "#fff" : "#666"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
                      <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "13.5px", color: "#5B5F55", lineHeight: 1.75, marginTop: "12px", marginBottom: 0 }}>{faq.a}</p>
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

/* ── Follow section ── */
function FollowUs() {
  const posts = [
    { image: "/images/gallery1.jpg", tag: "Instagram", caption: "Dog training session" },
    { image: "/images/servicepg3.jpg", tag: "Instagram", caption: "Behaviour consultation" },
    { image: "/images/gallery8.jpg", tag: "Instagram", caption: "Happy pet & owner" },
  ];
  return (
    <section style={{ background: "#FBF7F0", padding: "80px 0 100px" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-nunito,'Nunito Sans',sans-serif)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D97540", marginBottom: "6px" }}>On the socials</p>
            <h2 style={{ fontFamily: "var(--font-fraunces,'Fraunces',Georgia,serif)", fontSize: "30px", fontWeight: 500, color: "#1E4A40", marginBottom: "8px" }}>Follow along</h2>
            <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14px", color: "#7a8291", maxWidth: "340px", lineHeight: 1.65 }}>Training clips, behaviour tips, and the odd very good boy.</p>
          </div>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "13px", fontWeight: 600, color: "#1E4A40", textDecoration: "none", borderBottom: "1.5px solid #1E4A40", paddingBottom: "2px" }}>
            View more →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          {posts.map((p) => (
            <div key={p.image} style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 12px 32px -12px rgba(30,74,64,0.18)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .45s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
              <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.92)", borderRadius: "999px", padding: "5px 12px", fontFamily: "var(--font-nunito,'Nunito Sans',sans-serif)", fontSize: "11.5px", fontWeight: 700, color: "#1E4A40" }}>{p.tag}</span>
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
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: services[0].title,
    petName: "", petType: "Dog",
    message: "", preferredDate: "",
  });
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/book/confirmation");
    } finally { setLoading(false); }
  };

  return (
    <>
      <section style={{ background: "#ffffff", paddingTop: "100px", paddingBottom: "60px" }}>
        <Container>
          {/* 2-col — stretch so both sides same height */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "stretch" }}>

            {/* ════ LEFT — pale yellow card, full height ════ */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ display: "flex" }}>
              <div style={{ background: "#E4EFEB", borderRadius: "24px", padding: "40px 36px", width: "100%", display: "flex", flexDirection: "column", boxShadow: "0 4px 24px rgba(30,74,64,0.08)" }}>
                <StepBar step={step} />
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ display: "flex", flexDirection: "column", flex: 1, gap: "18px" }}>

                    {step === 0 && (<>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <PillInput id="name" label="Name" placeholder="John Carter" value={form.name} onChange={(v) => update("name", v)} />
                        <PillInput id="email" label="Email address" type="email" placeholder="email@example.com" value={form.email} onChange={(v) => update("email", v)} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <PillInput id="phone" label="Phone number" type="tel" placeholder="(135) 435 – 5323" required={false} value={form.phone} onChange={(v) => update("phone", v)} />
                        <PillSelect id="service" label="Service" value={form.service} onChange={(v) => update("service", v)}
                          options={[...services.map((s) => s.title), "Pet Behaviour Expert Witness", "Virtual Online Consultation"]} />
                      </div>
                      {/* Message — flex:1 fills remaining card height */}
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <label htmlFor="msg" style={{ fontSize: "13.5px", fontWeight: 600, fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#1E4A40", marginBottom: "7px" }}>Leave a message</label>
                        <textarea id="msg" placeholder="Please type your message here..." value={form.message} onChange={(e) => update("message", e.target.value)}
                          style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14px", color: "#2A2A2A", background: "#fff", border: "1.5px solid #b8d4cc", borderRadius: "16px", padding: "14px 18px", outline: "none", width: "100%", flex: 1, minHeight: "120px", resize: "none", transition: "border-color .18s" }}
                          onFocus={(e) => { e.target.style.borderColor = "#2F6B5E"; e.target.style.boxShadow = "0 0 0 3px rgba(47,107,94,0.12)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#b8d4cc"; e.target.style.boxShadow = "none"; }} />
                      </div>
                    </>)}

                    {step === 1 && (<>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <PillInput id="petName" label="Pet's name" placeholder="Buddy" value={form.petName} onChange={(v) => update("petName", v)} />
                        <PillSelect id="petType" label="Pet type" value={form.petType} onChange={(v) => update("petType", v)} options={["Dog", "Cat", "Other"]} />
                      </div>
                      <PillInput id="date" label="Preferred date (optional)" type="date" placeholder="" required={false} value={form.preferredDate} onChange={(v) => update("preferredDate", v)} />
                      <div onClick={() => setUploadDone(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setUploadDone(true)}
                        style={{ border: "2px dashed #D8D2C8", borderRadius: "12px", padding: "22px", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", background: "#fff" }}>
                        {uploadDone
                          ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#5C9271" }}>
                              <Check style={{ width: "28px", height: "28px" }} strokeWidth={2.5} />
                              <span style={{ marginTop: "6px", fontSize: "13px", fontFamily: "var(--font-inter,'Inter',sans-serif)" }}>Video ready</span>
                            </motion.div>
                          : <><Upload style={{ width: "26px", height: "26px", color: "#6B6B6B" }} strokeWidth={1.5} />
                              <span style={{ marginTop: "8px", fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-inter,'Inter',sans-serif)" }}>Click to upload a behaviour clip (optional)</span></>}
                      </div>
                    </>)}

                    {step === 2 && (
                      <div style={{ background: "#fff", borderRadius: "12px", border: "1.5px solid #e0dbd0", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                        {[["Name", form.name], ["Email", form.email], ["Phone", form.phone], ["Service", form.service], ["Pet", `${form.petName} (${form.petType})`],
                          ...(form.preferredDate ? [["Date", form.preferredDate]] : []),
                          ...(form.message ? [["Message", form.message]] : [])
                        ].map(([label, val]) => (
                          <div key={label} style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
                            <span style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontWeight: 700, color: "#182b49", minWidth: "90px" }}>{label}:</span>
                            <span style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#7a8291" }}>{val}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
                  {step > 0
                    ? <button onClick={() => setStep((s) => s - 1)} style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "1.5px solid #D8D2C8", borderRadius: "26px", padding: "10px 20px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "13px", fontWeight: 600, color: "#6B6B6B", cursor: "pointer" }}>
                        <ChevronLeft style={{ width: "15px", height: "15px" }} strokeWidth={2.5} /> Back
                      </button>
                    : <span />}
                  {step < 2
                    ? <button onClick={() => setStep((s) => s + 1)} style={{ background: "#2F6B5E", color: "#fff", border: "none", borderRadius: "26px", padding: "12px 32px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontWeight: 700, fontSize: "13px", letterSpacing: ".4px", cursor: "pointer" }}>
                        {step === 0 ? "Next →" : "Review →"}
                      </button>
                    : <button onClick={submit} disabled={loading} style={{ background: loading ? "#6FA394" : "#D97540", color: "#fff", border: "none", borderRadius: "26px", padding: "12px 32px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontWeight: 700, fontSize: "13px", cursor: loading ? "not-allowed" : "pointer" }}>
                        {loading ? "Submitting…" : "Submit Booking"}
                      </button>}
                </div>
              </div>
            </motion.div>

            {/* ════ RIGHT — badge, large title, desc, bullets, dog overflowing circle ════ */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

              {/* Top content */}
              <div>
                {/* Badge pill — site accent colors */}
                <span style={{ display: "inline-block", background: "#FBE4D2", color: "#D97540", borderRadius: "999px", padding: "6px 16px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "12.5px", fontWeight: 700, letterSpacing: ".02em", marginBottom: "20px" }}>
                  Force-free · Evidence-based
                </span>

                {/* Title — full width, no maxWidth, no forced line break */}
                <h1 style={{
                  fontFamily: "var(--font-inter,'Inter',sans-serif)",
                  fontSize: "clamp(42px, 5.5vw, 68px)",   /* scales to fill full column width */
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  marginBottom: "18px",
                  color: "#1E4A40",
                  width: "100%",                           /* full right-column width */
                }}>
                  Book your <span style={{ color: "#D97540" }}>appointment</span>
                </h1>

                <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.7, marginBottom: "24px" }}>
                  Complete the form and we&apos;ll confirm your consultation within one business day. In-person and virtual sessions available across the UK.
                </p>

                {["Certified Clinical Animal Behaviourist", "In-home, clinic & virtual sessions", "Personalised written behaviour plan"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: "14px", color: "#4c5566" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#D97540", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Dog — circular clip, centered in right column, sized to match screenshot */}
              <div style={{
                position: "relative", height: "260px", marginTop: "32px",
                display: "flex", justifyContent: "center", alignItems: "flex-end",
              }}>
                {/* Light-teal circle background */}
                <div style={{
                  position: "absolute", bottom: 0,
                  left: "50%", transform: "translateX(-50%)",
                  width: "220px", height: "220px",
                  borderRadius: "50%", background: "#E4EFEB",  /* site primary-100 */
                }} />
                {/* Dog image — sits inside/on circle, head peeks out above */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dog5.png" alt="Happy dog" style={{
                  position: "absolute", bottom: 0,
                  left: "50%", transform: "translateX(-60%)",  /* slightly left of center */
                  height: "270px", width: "auto",
                  objectFit: "contain", objectPosition: "bottom", zIndex: 1,
                }} />
              </div>   {/* ← closes dog area div */}
            </motion.div>

          </div>

          {/* Pink decorative ring below hero — centered */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "36px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #e6266f", background: "transparent" }} />
          </div>

        </Container>
      </section>

      <FAQSection />
      <FollowUs />
    </>
  );
}
