"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, PawPrint } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { siteConfig } from "@/lib/site-config";

/* ── column data ── */
const otherPages = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Services",         href: "/services" },
  { label: "Contact",          href: "/contact" },
  { label: "Events",           href: "/events" },
  { label: "Media & Speaking", href: "/media-speaking" },
];

const quickLinks = [
  { label: "Privacy Policy",   href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Blog",             href: "/blog" },
  { label: "Book a Consultation", href: "/book" },
  { label: "Pet Profile",      href: "/pet-profile" },
];

const socialLinks = [
  { label: "Facebook",  href: siteConfig.social.facebook,  letter: "f" },
  { label: "Twitter",   href: siteConfig.social.twitter,   letter: "t" },
  { label: "Instagram", href: siteConfig.social.instagram, letter: "◎" },
  { label: "LinkedIn",  href: siteConfig.social.linkedin,  letter: "in" },
];

/* ── shared arrow bullet ── */
function Arrow() {
  return (
    <span style={{
      color: "#D97540",          /* accent-600 terracotta */
      fontWeight: 700,
      fontSize: "11px",
      flexShrink: 0,
      marginTop: "1px",
    }}>›</span>
  );
}

/* ── column heading ── */
function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{
      fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
      fontSize: "17px",
      fontWeight: 700,
      color: "#fff",
      marginBottom: "22px",
    }}>{children}</h4>
  );
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#1E4A40" /* primary-900 */ }}>

      {/* ── MAIN GRID ── */}
      <Container>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.4fr",
          gap: "48px",
          padding: "72px 0 56px",
        }}
          className="max-lg:grid-cols-2 max-md:grid-cols-1"
        >

          {/* ── COL 1: Brand + contact ── */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <PawPrint style={{ width: "20px", height: "20px", color: "#D97540", strokeWidth: 1.5 }} />
              </span>
              <span style={{
                fontFamily: "var(--font-fraunces, 'Fraunces', Georgia, serif)",
                fontSize: "22px",
                fontWeight: 700,
                color: "#fff",
              }}>{siteConfig.name}</span>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
              fontSize: "14px",
              color: "rgba(255,255,255,0.70)",
              lineHeight: 1.7,
              marginBottom: "24px",
              maxWidth: "280px",
            }}>{siteConfig.tagline}</p>

            {/* Contact details */}
            {[
              { Icon: MapPin, text: siteConfig.address },
              { Icon: Mail,   text: siteConfig.email },
              { Icon: Phone,  text: siteConfig.phone },
            ].map(({ Icon, text }) => (
              <div key={text} style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                marginBottom: "12px",
                fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.72)",
              }}>
                <Icon style={{ width: "15px", height: "15px", color: "#D97540", flexShrink: 0, marginTop: "2px" }} strokeWidth={1.75} />
                {text}
              </div>
            ))}
          </div>

          {/* ── COL 2: Other Pages ── */}
          <div>
            <ColHead>Other Pages</ColHead>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {otherPages.map((l) => (
                <li key={l.href} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Arrow />
                  <Link href={l.href} style={{
                    fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.80)",
                    textDecoration: "none",
                    transition: "color .18s",
                  }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#D97540")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.80)")}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3: Quick Links ── */}
          <div>
            <ColHead>Quick Links</ColHead>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((l) => (
                <li key={l.href} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Arrow />
                  <Link href={l.href} style={{
                    fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.80)",
                    textDecoration: "none",
                    transition: "color .18s",
                  }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#D97540")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.80)")}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 4: Newsletter + socials ── */}
          <div>
            <ColHead>Newsletter</ColHead>

            {done ? (
              <p style={{
                fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "20px",
              }}>✓ Thank you for subscribing!</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
                style={{ display: "flex", marginBottom: "14px" }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  style={{
                    flex: 1,
                    height: "48px",
                    border: "none",
                    padding: "0 16px",
                    fontSize: "13.5px",
                    fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
                    outline: "none",
                    background: "#fff",
                    color: "#2A2A2A",
                    borderRadius: "4px 0 0 4px",
                  }}
                />
                <button type="submit" style={{
                  height: "48px",
                  padding: "0 20px",
                  background: "#D97540",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: ".3px",
                  borderRadius: "0 4px 4px 0",
                  transition: "background .2s",
                  whiteSpace: "nowrap",
                }}>Subscribe</button>
              </form>
            )}

            <p style={{
              fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.60)",
              marginBottom: "20px",
            }}>Get the latest news &amp; updates</p>

            {/* Social icon circles */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map(({ label, href, letter }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    background: "#D97540",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                    fontWeight: 700, fontSize: "13px",
                    textDecoration: "none",
                    transition: "background .2s",
                  }}
                >{letter}</a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.12)",
        background: "#162F29",   /* slightly darker teal */
      }}>
        <Container>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            padding: "18px 0",
          }}>
            <p style={{
              fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
            }}>
              {siteConfig.name} — Expert Pet Behaviour Consultation
            </p>
            <p style={{
              fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
            }}>
              © {year} {siteConfig.name}. All Rights Reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
