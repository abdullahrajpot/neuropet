"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have a question before booking? We'd love to hear from you."
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              {[
                { icon: MapPin, text: siteConfig.address },
                { icon: Phone, text: siteConfig.phone },
                { icon: Mail, text: siteConfig.email },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <p className="text-ink-600">{text}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-7">
              {sent ? (
                <div className="rounded-card bg-success-bg p-8 text-success">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="mt-2 text-sm">We&apos;ll respond within 2 business days.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  {(["name", "email", "subject"] as const).map((field) => (
                    <input
                      key={field}
                      required
                      type={field === "email" ? "email" : "text"}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [field]: e.target.value }))
                      }
                      className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
                    />
                  ))}
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
