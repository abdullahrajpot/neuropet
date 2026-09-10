export const siteConfig = {
  name: "NeuroPet",
  tagline: "Expert dog behaviour consultation for happier homes",
  description:
    "Professional dog behaviour consultation, puppy training, and virtual sessions with daily WhatsApp support. Evidence-based training delivered remotely.",
  url: "https://neuropet.com",
  address: "123 Pet Care Lane, London, UK",
  phone: "+44 20 7946 0958",
  email: "hello@neuropet.com",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  reviewLinks: {
    google: "https://google.com/maps",
    facebook: "https://facebook.com/reviews",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services Overview", href: "/services" },
      { label: "Dog Behaviourist", href: "/services/dog-behaviourist" },
      { label: "Dog Whisperer", href: "/services/dog-whisperer" },
      { label: "Dog Anxiety Treatment", href: "/services/dog-anxiety" },
      { label: "Separation Anxiety Program", href: "/services/dog-separation-anxiety" },
      { label: "Aggression Management", href: "/services/dog-aggression-management" },
      { label: "Leash Reactivity Training", href: "/services/leash-reactivity-training" },
      { label: "Puppy Foundations", href: "/services/puppy-foundations" },
      { label: "Virtual Consultation", href: "/services/virtual-consultation" },
    ],
  },
  { label: "Pricing & Plans", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export const footerExplore = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing & Plans", href: "/pricing" },
  { label: "Book a Consultation", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export const footerMedia = [
  { label: "Press & Media", href: "/media-speaking" },
  { label: "Speaking Engagements", href: "/media-speaking#speaking" },
  { label: "Events", href: "/events" },
];

export const footerTraining = [
  { label: "Behaviour Essentials Program", href: "/pricing#essentials" },
  { label: "Behaviour Intensive Program", href: "/pricing#intensive" },
  { label: "Puppy Foundations Program", href: "/pricing#puppy" },
  { label: "Free Discovery Call", href: "/book?type=discovery" },
];

export const services = [
  {
    title: "Dog Behaviourist",
    description: "Expert behavioural consultation and assessment for all dog behaviour issues. Personalised training plans with daily WhatsApp support.",
    href: "/services/dog-behaviourist",
    image: "/images/dog2.png",
    icon: "dog",
  },
  {
    title: "Dog Anxiety Treatment",
    description: "Comprehensive treatment plans for generalized anxiety, fear, and stress-related behaviours in dogs.",
    href: "/services/dog-anxiety",
    image: "/images/dog anxiety.webp",
    icon: "shield",
  },
  {
    title: "Puppy Foundations",
    description: "30-day program for puppies under 6 months. Build confidence, prevent problems, and start right.",
    href: "/services/puppy-foundations",
    image: "/images/dog4.png",
    icon: "puppy",
  },
  {
    title: "Virtual Consultation",
    description: "Remote video coaching sessions with daily WhatsApp support — perfect for busy schedules or distance clients.",
    href: "/services/virtual-consultation",
    image: "/images/service3.jpg",
    icon: "video",
  },
];

export const stats = [
  { value: 35, suffix: "+", label: "Years experience" },
  { value: 500, suffix: "+", label: "Pets helped" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 12, suffix: "", label: "Certifications" },
];

export const testimonials = [
  {
    quote: "Our reactive rescue finally walks calmly past other dogs. The plan was clear, compassionate, and actually worked.",
    author: "Sarah M.",
    pet: "Luna, rescue terrier mix",
  },
  {
    quote: "The virtual follow-ups made all the difference. We felt supported every step of the way with our anxious cat.",
    author: "James T.",
    pet: "Mochi, domestic shorthair",
  },
  {
    quote: "Professional, warm, and never judgmental. Puppy training gave us confidence we didn't know we needed.",
    author: "Emma R.",
    pet: "Biscuit, golden retriever puppy",
  },
];

export const blogPosts = [
  {
    slug: "understanding-dog-reactivity",
    title: "Understanding Dog Reactivity: Signs, Triggers & First Steps",
    excerpt: "Reactivity isn't stubbornness — it's communication. Learn how to read the signs and build a safer routine.",
    category: "Dog Behaviour",
    date: "2026-03-12",
    image: "/images/gallery1.jpg",
  },
  {
    slug: "cat-enrichment-indoors",
    title: "Indoor Enrichment Ideas That Actually Calm Anxious Cats",
    excerpt: "Simple environmental tweaks and play routines that reduce stress without overwhelming your cat.",
    category: "Cat Behaviour",
    date: "2026-02-28",
    image: "/images/gallery8.jpg",
  },
  {
    slug: "puppy-socialisation-window",
    title: "Making the Most of Your Puppy's Socialisation Window",
    excerpt: "What to expose your puppy to — and how to do it safely — during those critical early weeks.",
    category: "Puppy Training",
    date: "2026-02-15",
    image: "/images/pet.jpg",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Book & share",
    description: "Tell us about your pet, upload a short video, and pick a consultation slot that suits you.",
  },
  {
    step: "02",
    title: "Assessment",
    description: "We review behaviour in context — at home, on walks, or via video — and identify root causes.",
  },
  {
    step: "03",
    title: "Personalised plan",
    description: "You receive a clear, step-by-step behaviour plan tailored to your pet and household.",
  },
  {
    step: "04",
    title: "Ongoing support",
    description: "Follow-up sessions and check-ins help you stay on track as progress builds.",
  },
];
