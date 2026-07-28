import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  PawPrint,
  Twitter,
} from "lucide-react";
import { Container } from "@/components/ui/shared";
import {
  footerExplore,
  footerMedia,
  footerTraining,
  siteConfig,
} from "@/lib/site-config";

const socialIcons = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <PawPrint className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-display text-xl">{siteConfig.name}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/75">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent-600"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-label mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerExplore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              Media & Events
            </h3>
            <ul className="space-y-3">
              {footerMedia.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              Training & Behaviour
            </h3>
            <ul className="space-y-3">
              {footerTraining.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-white/15 pt-8 text-sm text-white/65">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>Write a Review:</span>
            <a
              href={siteConfig.reviewLinks.google}
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a>
            <span aria-hidden>·</span>
            <a
              href={siteConfig.reviewLinks.facebook}
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
          <p>Office: {siteConfig.address}</p>
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
