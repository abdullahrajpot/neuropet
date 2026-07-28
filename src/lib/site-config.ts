export const siteConfig = {
  name: "NeuroPet",
  tagline: "Expert pet behaviour consultation for happier homes",
  description:
    "Professional dog and cat behavioural consultation, puppy training, and virtual sessions tailored to your pet's needs.",
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
    label: "Training & Behaviour",
    href: "/training-behaviour",
    children: [
      { label: "Dog Behavioural Consultation", href: "/training-behaviour/dog-behaviour" },
      { label: "Cat Behavioural Consultation", href: "/training-behaviour/cat-behaviour" },
      { label: "Puppy Training", href: "/training-behaviour/puppy-training" },
      { label: "Virtual/Online Consultation", href: "/training-behaviour/virtual-consultation" },
      { label: "Pet Behaviour Expert Witness", href: "/training-behaviour/expert-witness" },
    ],
  },
  { label: "Media & Speaking", href: "/media-speaking" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
];

export const footerExplore = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Book a Consultation", href: "/book" },
  { label: "Pet Profile / My Pets", href: "/pet-profile" },
  { label: "Contact", href: "/contact" },
];

export const footerMedia = [
  { label: "Press, Radio, Podcasts & TV", href: "/media-speaking" },
  { label: "Speaking Engagements", href: "/media-speaking#speaking" },
  { label: "Events", href: "/events" },
];

export const footerTraining = [
  { label: "Dog Behavioural Consultation", href: "/training-behaviour/dog-behaviour" },
  { label: "Cat Behavioural Consultation", href: "/training-behaviour/cat-behaviour" },
  { label: "Puppy Training", href: "/training-behaviour/puppy-training" },
  { label: "Pet Behaviour Expert Witness", href: "/training-behaviour/expert-witness" },
];

export const services = [
  {
    title: "Dog Behaviour",
    description: "Tailored plans for anxiety, aggression, reactivity, and everyday obedience challenges.",
    href: "/training-behaviour/dog-behaviour",
    image: "/images/service1.jpg",
    icon: "dog",
  },
  {
    title: "Cat Behaviour",
    description: "Support for litter issues, multi-cat tension, scratching, and indoor enrichment.",
    href: "/training-behaviour/cat-behaviour",
    image: "/images/cat.jpg",
    icon: "cat",
  },
  {
    title: "Puppy Training",
    description: "Early socialisation, bite inhibition, and foundation skills for confident puppies.",
    href: "/training-behaviour/puppy-training",
    image: "/images/service2.jpg",
    icon: "puppy",
  },
  {
    title: "Virtual Consultation",
    description: "Remote sessions with video review — ideal for follow-ups and busy schedules.",
    href: "/training-behaviour/virtual-consultation",
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
