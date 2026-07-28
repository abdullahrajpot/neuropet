# Design System — Pet Behaviour Consultation Website

> Companion file to `PET-BEHAVIOUR-SITE-BUILD-PROMPT.md`. This is the single source of truth for **visual design, motion, and page/navigation structure**. Give this to your coding agent alongside the build prompt so every page — home, services, blog, booking, admin — comes out of the same design system instead of drifting page to page.

**References used:**
- Visual/interaction direction: "Pet X — Vet" Figma template (bright, friendly, clean, trust-first vet/pet-care layout with team, services, and testimonial sections) and the "United Pets" Elementor theme (cute, rounded, warm pet-clinic aesthetic).
- Content/navigation structure: `petsbehave.com` (a real pet-behaviour-consultant site) — its navbar and footer are mirrored 1:1 in Section 8 below, then adapted to include booking/admin.

---

## 1. Design Principles (how to *not* look AI-generated)

Generic AI-website look usually comes from: centered everything, identical card grids with no hierarchy, stock-photo hero with a gradient overlay, one font, one shade of purple/blue, and no real editorial detail. Avoid all of that deliberately:

1. **Break the grid on purpose.** At least one section per page should be asymmetric (e.g. image bleeding off one side, text column offset, overlapping cards) rather than a perfectly centered 3-column grid.
2. **Real photography direction, not stock-gloss.** Warm, natural-light photos of real pets/trainer interactions (or high-quality stock chosen for candid, imperfect moments) — never glossy studio stock with fake smiles.
3. **One accent color used sparingly, not everywhere.** The terracotta accent (Section 2) should appear on ~10-15% of any given screen — CTAs, small icons, underlines — never as a background flood.
4. **Type does the heavy lifting.** Use the display serif (Section 3) for 3-6 word statements at large size as section dividers — this alone reads as "designed," not "templated."
5. **Hand-drawn/organic details.** Blob shapes, torn-paper edges, a single wavy SVG divider between sections, paw-print motif used once or twice as an easter egg — not on every element.
6. **Consistent but not identical cards.** Service cards, blog cards, and testimonial cards should share the same corner radius/shadow language but differ in internal layout so the page doesn't feel like one repeating component.
7. **Motion with restraint.** Subtle, physics-based (spring) motion — never bouncy cartoon easing, never everything fading in at once.

---

## 2. Color System

```css
:root {
  /* Brand */
  --color-primary-900: #1E4A40;   /* deep teal - headings, footer bg */
  --color-primary-700: #2F6B5E;   /* primary brand teal - nav, buttons */
  --color-primary-400: #6FA394;   /* muted teal - secondary buttons, icons */
  --color-primary-100: #E4EFEB;   /* pale teal tint - section backgrounds */

  /* Accent */
  --color-accent-600: #D97540;    /* terracotta - primary CTA, highlights */
  --color-accent-400: #E98A4E;    /* lighter terracotta - hover state */
  --color-accent-100: #FBE4D2;    /* pale peach - badges, tags */

  /* Neutrals */
  --color-cream: #FBF7F0;         /* main background */
  --color-white: #FFFFFF;
  --color-ink-900: #2A2A2A;       /* body text */
  --color-ink-600: #6B6B6B;       /* muted text */
  --color-ink-300: #D8D2C8;       /* borders, dividers on cream */

  /* Feedback */
  --color-success: #5C9271;
  --color-success-bg: #E7F0EA;
  --color-warning: #D9A441;
  --color-error: #C1594A;
}
```

**Usage rules:**
- Backgrounds alternate `--color-cream` → `--color-primary-100` → `--color-white` between sections to create rhythm without needing hard borders.
- `--color-primary-900` is reserved for the footer and one dark "CTA banner" section — gives the page a visual anchor point instead of being uniformly light throughout.
- Never place accent-on-accent or put body text in the accent color.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display / Section headers | **Fraunces** (variable, use "soft" optical size) | Warm serif, used large (40–72px), often with 1–2 words in italic for emphasis |
| Body / UI | **Inter** | 16px base, 1.6 line-height for long-form (blog), 1.4 for UI |
| Accent / labels | **Nunito Sans**, semibold, uppercase, letter-spacing 0.08em | Small eyebrow labels above headings (e.g. "OUR SERVICES") |

**Scale (desktop / mobile):**
- Display XL: 72px / 40px — Home hero only
- Display L: 48px / 32px — section headers
- Display M: 32px / 24px — card/subsection headers
- Body L: 18px / 16px
- Body: 16px / 15px
- Small/label: 13px / 12px, uppercase, tracked

**Pairing rule:** every section header = eyebrow label (Nunito Sans) + Fraunces headline. Never use Fraunces for body copy or buttons.

---

## 4. Spacing, Grid & Radius

- Base spacing unit: **8px**. Section vertical padding: 96px desktop / 56px mobile.
- Container max-width: 1280px, 24px side gutters (16px mobile).
- Grid: 12-column, but most content sections use an intentionally uneven split — e.g. 7/5 or 8/4, not 6/6 — for the "designed, not templated" feel.
- Border radius: **20px** for cards/images, **999px** (full pill) for buttons and tags, **12px** for form inputs.
- Shadows: one soft elevation only —
  `box-shadow: 0 12px 32px -12px rgba(30, 74, 64, 0.18);`
  Never stack multiple shadow levels; use this same one consistently.

---

## 5. Core Components

**Buttons**
- Primary: pill shape, `--color-accent-600` bg, white text, 16px/24px padding, on hover: darken 8% + scale(1.03) + shadow lift, transition 200ms ease-out.
- Secondary: pill, transparent bg, 1.5px `--color-primary-700` border, teal text; hover fills teal bg, text goes white.
- Ghost/text link: teal text with animated underline that grows from 0→100% width on hover (220ms).

**Cards** (services, blog, testimonials)
- 20px radius, white or cream bg depending on section, 1px `--color-ink-300` border OR the soft shadow (pick one per section, not both), 32px internal padding.
- Image inside card: 16px radius, slightly inset from card edge (not edge-to-edge) — this alone reads as more custom than a full-bleed image card.

**Nav bar**
- Transparent over hero, transitions to solid `--color-cream` with soft shadow after 40px scroll (200ms).
- Logo left, links center-right, "Book a Consultation" pill button far right in accent color (always visually distinct from other nav items).
- Mobile: slide-in drawer from right, staggered link fade-in (40ms delay per item).

**Forms (booking, contact, pet profile)**
- Floating label pattern, 12px radius inputs, 1.5px border `--color-ink-300` → `--color-primary-700` on focus with a soft teal glow (`box-shadow: 0 0 0 4px rgba(47,107,94,0.12)`).
- Multi-step booking form: horizontal progress stepper with connecting line that fills teal as steps complete; step transitions slide horizontally (300ms, ease-in-out) rather than hard-cutting.

**Badges/Tags**
- Pill, `--color-accent-100` bg, `--color-accent-600` text, 12px label type — used for blog categories, service tags, appointment status ("Pending" = warning colors, "Confirmed" = success colors).

---

## 6. Animation & Motion Spec

Use **Framer Motion** (React) with these standard variants — reuse the same few across the whole site rather than inventing new motion per component:

```js
// Scroll-reveal (use for section headers, cards entering viewport)
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// Staggered children (service cards, blog grid, testimonial list)
export const staggerContainer = {
  visible: { transition: { staggerChildren: 0.12 } }
};

// Hover lift (cards, images)
// whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }}

// Button press
// whileTap={{ scale: 0.97 }}
```

**Where to use motion (and where not to):**
- Hero: headline + subhead fade-up staggered on page load only (not scroll-triggered) — subtle, ~400ms total.
- Section headers: fade-up on scroll into view, trigger once (`viewport={{ once: true }}`).
- Card grids (services/blog/testimonials): staggered fade-up, 100–120ms between items — never more than 6 items staggered (cap it, or it feels slow).
- Stat counters ("35+ years experience", "500+ pets helped"): count up from 0 when scrolled into view, 1.2s duration.
- Nav & footer: **no scroll animation** — these should feel stable/always-available, only the color-fade-in-on-scroll for the nav background.
- Page transitions: soft 200ms cross-fade between routes (Next.js `template.tsx` with AnimatePresence) — not a full slide/wipe, which reads as "template demo," not "professional site."
- Video/image upload in pet-profile form: on successful upload, a small success checkmark animates in with a spring bounce (`type: "spring", stiffness: 300, damping: 20`) — this is the one place a slightly playful bounce is appropriate, echoing the "cute pet" theme.
- **Never:** auto-playing carousels that can't be paused, parallax on every image, text that types itself out, more than one looping/infinite animation per screen.

---

## 7. Imagery & Iconography

- Icon set: `lucide-react`, 1.5px stroke, rounded caps — paw, calendar, heart, chat-bubble, shield-check (for trust/certifications), video camera (for the pet video upload feature).
- Photography: warm, natural light, candid framing (mid-action shots of pet + trainer over posed portraits). Crop hero and "meet the trainer" images into soft blob/organic shapes (SVG clip-path), not perfect circles or squares — this is the signature "pet-care" motif borrowed from the theme references.
- Illustration accents (optional but recommended): simple single-line paw-print or leash-loop SVG doodles used *only* as small section dividers or background texture at 5–8% opacity — never as a dominant graphic.

---

## 8. Sitemap, Navbar & Footer — mirrored from petsbehave.com

petsbehave.com's actual structure (fetched directly) is reused below, renamed/extended to fit your business (booking system + admin + pet profiles), keeping the same *pattern* of navbar and footer organization.

### Navbar (top nav, matches petsbehave.com's 7-item pattern)

```
Logo   Home   About   Training & Behaviour ▾   Media & Speaking   Events   Blog        [Book a Consultation →]
```

- "Training & Behaviour" is a dropdown (matches the source site) containing: Dog Behavioural Consultation, Cat Behavioural Consultation, Puppy Training, Virtual/Online Consultation, Pet Behaviour Expert Witness.
- "Book a Consultation" stays visually separated as the pill CTA button, exactly like petsbehave.com's "Book an appointment" nav CTA.
- On admin-authenticated sessions, an additional small "Admin" link/avatar appears far right (not shown to public visitors).

### Footer (4-column layout, mirrors petsbehave.com's footer exactly in structure)

```
Column 1: Logo (vertical) + short tagline + social icons (Facebook, Instagram, Twitter/X, LinkedIn)

Column 2 — "Explore"
  - About
  - Blog
  - Book a Consultation
  - Pet Profile / My Pets
  - Contact

Column 3 — "Media & Events"
  - Press, Radio, Podcasts & TV
  - Speaking Engagements
  - Events

Column 4 — "Training & Behaviour"
  - Dog Behavioural Consultation
  - Cat Behavioural Consultation
  - Puppy Training
  - Pet Behaviour Expert Witness

Bottom bar:
  Legal: Privacy Policy · Terms of Service
  Write a Review: Google · Facebook
  Office: [Business address]
  © [Year] [Business Name]. All Rights Reserved.
```

- Cookie consent banner (bottom-fixed, dismissible), matching the source site's pattern — "We use cookies... [Privacy Policy link] [Got it]".

### Full Page List (derived from the navbar/footer above)

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Hero, trust strip, services overview, how-it-works, about teaser, testimonials, latest blog, CTA banner |
| About | `/about` | Trainer bio, philosophy, certifications, "as seen in" media logos |
| Training & Behaviour (hub) | `/training-behaviour` | Overview grid linking to the 5 sub-services below |
| — Dog Behavioural Consultation | `/training-behaviour/dog-behaviour` | |
| — Cat Behavioural Consultation | `/training-behaviour/cat-behaviour` | |
| — Puppy Training | `/training-behaviour/puppy-training` | |
| — Virtual/Online Consultation | `/training-behaviour/virtual-consultation` | |
| — Pet Behaviour Expert Witness | `/training-behaviour/expert-witness` | |
| Media & Speaking | `/media-speaking` | Press mentions, logos, speaking topics |
| Events | `/events` | Upcoming/past events list |
| Blog | `/blog` + `/blog/[slug]` | List + single post |
| Book a Consultation | `/book` | Multi-step booking + pet details + video upload |
| Pet Profile | `/pet-profile` | Standalone pet details/video form for returning users |
| Contact | `/contact` | Form, map, address, socials |
| Booking Confirmation | `/book/confirmation` | Post-booking success screen |
| Privacy Policy | `/privacy-policy` | Legal |
| Terms of Service | `/terms` | Legal |
| Admin Login | `/admin/login` | Auth-gated |
| Admin Dashboard | `/admin/dashboard` | Auth-gated |
| Admin Appointments | `/admin/appointments` | Auth-gated |
| Admin Pets | `/admin/pets` | Auth-gated |
| Admin Blog | `/admin/blog` | Auth-gated |
| Admin Messages | `/admin/messages` | Auth-gated |

---

## 9. Responsive Breakpoints

```
sm:  480px   mobile
md:  768px   tablet
lg:  1024px  small laptop
xl:  1280px  desktop (container max-width)
2xl: 1536px  large desktop
```
Design mobile-first; the asymmetric desktop layouts (Section 1) should simplify to clean single-column stacks on `sm`/`md` — don't force the offset grid onto mobile.

---

## 10. Accessibility Notes

- Color contrast: `--color-ink-900` on `--color-cream` = AA compliant; verify `--color-accent-600` on white for button text (use white text on accent, not accent text on white, to be safe).
- All motion must respect `prefers-reduced-motion` — wrap Framer Motion variants with a check and fall back to opacity-only, no movement.
- Video upload widget must have a text-based fallback/status (not rely on color alone for upload success/failure).
- Focus states: visible teal focus ring (`outline: 2px solid var(--color-primary-700); outline-offset: 2px;`) on every interactive element — don't remove default focus without replacing it.

---

## 11. Instruction to the coding agent

> Apply this exact design system (colors, type, spacing, radius, motion variants) to every single page and component in the project — home, all service pages, blog, booking flow, contact, and the admin panel. Do not introduce new colors, fonts, or shadow styles outside Sections 2–4. Use the Section 6 motion variants consistently rather than one-off animations per page. Build the navbar and footer exactly per Section 8, including the dropdown, cookie banner, and 4-column footer layout. Each page should feel like it belongs to the same brand — cross-check by comparing button styles, card styles, and section spacing across pages before considering a page "done."
