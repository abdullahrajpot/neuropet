"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site-config";
import { useRouter } from "next/navigation";

const steps = ["Your details", "Pet info", "Review"];

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0].title,
    petName: "",
    petType: "Dog",
    message: "",
    preferredDate: "",
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
      <PageHeader
        eyebrow="Book a Consultation"
        title="Let's get started"
        description="Complete the form below and we'll be in touch to confirm your appointment."
      />
      <section className="bg-white py-14 md:py-20">
        <Container className="max-w-2xl">
          <div className="mb-10 flex items-center justify-between">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    i <= step
                      ? "bg-primary-700 text-white"
                      : "bg-primary-100 text-ink-600"
                  }`}
                >
                  {i < step ? <Check className="h-5 w-5" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      i < step ? "bg-primary-700" : "bg-ink-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-5"
            >
              {step === 0 && (
                <>
                  <Field label="Full name" value={form.name} onChange={(v) => update("name", v)} />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
                  <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="peer w-full rounded-input border-[1.5px] border-ink-300 bg-transparent px-4 pb-2 pt-6 text-ink-900 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
                    >
                      {services.map((s) => (
                        <option key={s.title}>{s.title}</option>
                      ))}
                      <option>Pet Behaviour Expert Witness</option>
                    </select>
                    <label className="pointer-events-none absolute left-4 top-2 text-xs text-ink-600">
                      Service
                    </label>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <Field label="Pet name" value={form.petName} onChange={(v) => update("petName", v)} />
                  <div className="relative">
                    <select
                      value={form.petType}
                      onChange={(e) => update("petType", e.target.value)}
                      className="peer w-full rounded-input border-[1.5px] border-ink-300 bg-transparent px-4 pb-2 pt-6"
                    >
                      {["Dog", "Cat", "Other"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <label className="pointer-events-none absolute left-4 top-2 text-xs text-ink-600">
                      Pet type
                    </label>
                  </div>
                  <Field label="Preferred date (optional)" type="date" value={form.preferredDate} onChange={(v) => update("preferredDate", v)} />
                  <div>
                    <label className="text-sm text-ink-600">Pet video (optional)</label>
                    <div
                      className="mt-2 flex cursor-pointer flex-col items-center rounded-input border-2 border-dashed border-ink-300 p-8 transition-colors hover:border-primary-700"
                      onClick={() => setUploadSuccess(true)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setUploadSuccess(true)}
                    >
                      {uploadSuccess ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="flex flex-col items-center text-success"
                        >
                          <Check className="h-8 w-8" />
                          <span className="mt-2 text-sm">Video ready (demo)</span>
                        </motion.div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-ink-600" strokeWidth={1.5} />
                          <span className="mt-2 text-sm text-ink-600">
                            Click to upload a short behaviour clip
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={4}
                      className="peer w-full rounded-input border-[1.5px] border-ink-300 px-4 pb-2 pt-6 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
                    />
                    <label className="pointer-events-none absolute left-4 top-2 text-xs text-ink-600">
                      Tell us about the behaviour concern
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="rounded-card bg-cream p-6 space-y-3 text-sm">
                  <p><strong>Name:</strong> {form.name}</p>
                  <p><strong>Email:</strong> {form.email}</p>
                  <p><strong>Phone:</strong> {form.phone}</p>
                  <p><strong>Service:</strong> {form.service}</p>
                  <p><strong>Pet:</strong> {form.petName} ({form.petType})</p>
                  {form.preferredDate && <p><strong>Preferred date:</strong> {form.preferredDate}</p>}
                  {form.message && <p><strong>Message:</strong> {form.message}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <Button
              variant="secondary"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={step === 0 ? "opacity-50" : ""}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={loading}>
                {loading ? "Submitting..." : "Submit booking"}
              </Button>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-input border-[1.5px] border-ink-300 bg-transparent px-4 pb-2 pt-6 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
      />
      <label className="pointer-events-none absolute left-4 top-2 text-xs text-ink-600">
        {label}
      </label>
    </div>
  );
}
