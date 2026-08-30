"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Upload, Shield, Clock, Users } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { siteConfig } from "@/lib/site-config";
import { useRouter } from "next/navigation";
import { fadeUp } from "@/lib/motion";
import Link from "next/link";

const STEPS = [
  "Your Details",
  "About Your Pet", 
  "Living Situation",
  "Veterinary Care",
  "Behaviour History",
  "Main Concerns",
  "Daily Life",
  "Training & Diet",
  "Review & Submit"
];

/* ── pill input ── */
function PillInput({ id, label, type = "text", placeholder, value, onChange, required = true }: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [f, setF] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-primary-900 font-sans">{label}</label>
      <input 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        required={required} 
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        onFocus={() => setF(true)} 
        onBlur={() => setF(false)}
        className={`font-sans text-sm px-4 py-2.5 rounded-full border-2 outline-none transition-all ${
          f ? 'border-primary-700 ring-2 ring-primary-700/20' : 'border-primary-200'
        } bg-white`}
      />
    </div>
  );
}

/* ── pill select ── */
function PillSelect({ id, label, value, onChange, options }: {
  id: string; label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  const [f, setF] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-primary-900 font-sans">{label}</label>
      <select 
        id={id} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        onFocus={() => setF(true)} 
        onBlur={() => setF(false)}
        className={`font-sans text-sm px-4 py-2.5 rounded-full border-2 outline-none transition-all cursor-pointer ${
          f ? 'border-primary-700 ring-2 ring-primary-700/20' : 'border-primary-200'
        } bg-white`}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ── textarea ── */
function PillTextarea({ id, label, placeholder, value, onChange, required = true, rows = 3 }: {
  id: string; label: string; placeholder?: string; value: string; 
  onChange: (v: string) => void; required?: boolean; rows?: number;
}) {
  const [f, setF] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-primary-900 font-sans">{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        rows={rows}
        className={`font-sans text-sm px-4 py-3 rounded-2xl border-2 outline-none transition-all resize-none ${
          f ? 'border-primary-700 ring-2 ring-primary-700/20' : 'border-primary-200'
        } bg-white`}
      />
    </div>
  );
}

/* ── video upload ── */
function VideoUpload({ onUpload, onFilesChange }: { 
  onUpload: () => void;
  onFilesChange: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileInputRefValue, setFileInputRef] = useState<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const videoFiles = selectedFiles.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length > 0) {
      setFiles(prev => [...prev, ...videoFiles]);
      onFilesChange([...files, ...videoFiles]);
      onUpload();
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <input
        ref={(ref) => {
          setFileInputRef(ref);
        }}
        type="file"
        accept="video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="video-upload"
      />
      
      <label
        htmlFor="video-upload"
        className={`block border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
          files.length > 0
            ? 'border-primary-700 bg-primary-50' 
            : 'border-primary-200 bg-white hover:border-primary-400 hover:bg-primary-50/30'
        }`}
      >
        {files.length === 0 ? (
          <div className="flex flex-col items-center text-ink-600">
            <Upload className="w-10 h-10 mb-3 text-primary-700" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-primary-900 mb-1">
              Upload behaviour videos (optional)
            </span>
            <span className="text-xs text-ink-500">
              Click to select video files • Multiple videos allowed
            </span>
            <span className="text-xs text-ink-400 mt-2">
              Max 100MB per video • MP4, MOV, AVI supported
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-primary-700">
            <Check className="w-10 h-10 mb-2" strokeWidth={2.5} />
            <span className="text-sm font-semibold">
              {files.length} video{files.length > 1 ? 's' : ''} selected
            </span>
            <span className="text-xs text-ink-500 mt-1">
              Click to add more videos
            </span>
          </div>
        )}
      </label>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border-2 border-primary-200 rounded-xl p-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-ink-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFile(index);
                }}
                className="flex-shrink-0 ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── step bar ── */
function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-lg text-primary-900">Step {step + 1} of {STEPS.length}</span>
        <span className="text-xs font-semibold text-primary-700 font-sans">{STEPS[step]}</span>
      </div>
      <div className="relative h-2 bg-primary-100 rounded-full overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-700 to-accent-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

/* ── FAQ ── */
const FAQ_DATA = [
  { q: "How long does the assessment take?", a: "The initial consultation typically takes 60-90 minutes. This allows us to thoroughly understand your pet's behaviour and develop a comprehensive plan." },
  { q: "Do you offer virtual consultations?", a: "Yes! We offer both in-person and virtual consultations via video call. Virtual sessions are ideal for clients outside our immediate area." },
  { q: "What should I prepare before the consultation?", a: "Please complete this assessment form thoroughly. If possible, take short videos of the behaviour you&apos;re concerned about. Having your pet&apos;s vet records on hand is also helpful." },
  { q: "How soon can I expect results?", a: "Many clients see improvements within the first 2-4 weeks. However, behaviour modification takes time and consistency. We provide ongoing support throughout your journey." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-primary-50 py-16 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-3">Frequently asked questions</h2>
            <p className="text-ink-600">Quick answers to help you prepare for your consultation.</p>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div 
                  key={faq.q} 
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`rounded-2xl p-5 cursor-pointer transition-all ${
                    isOpen ? 'bg-accent-50 shadow-md' : 'bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-primary-900 text-base flex-1">{faq.q}</h3>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isOpen ? 'border-primary-900 bg-primary-900' : 'border-ink-300 bg-transparent'
                    }`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="M2 4L6 8L10 4" stroke={isOpen ? '#fff' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-ink-600 mt-3 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Follow section ── */
function FollowUs() {
  const posts = [
    { image: "/images/gallery1.jpg", tag: "Instagram" },
    { image: "/images/servicepg3.jpg", tag: "Instagram" },
    { image: "/images/gallery8.jpg", tag: "Instagram" },
  ];
  return (
    <section className="bg-cream py-16 md:py-20">
      <Container>
        <div className="text-center mb-10">
          <p className="font-label text-xs font-bold uppercase tracking-wider text-accent-600 mb-2">On the socials</p>
          <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-3">Follow along</h2>
          <p className="text-ink-600 max-w-md mx-auto">Training clips, behaviour tips, and happy pet moments.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.div 
              key={p.image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={p.image} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-white/95 rounded-full px-3 py-1 text-xs font-bold text-primary-900">
                {p.tag}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a 
            href={siteConfig.social.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-900 hover:text-accent-600 transition-colors border-b-2 border-primary-900 hover:border-accent-600 pb-1"
          >
            View more on Instagram →
          </a>
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
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [form, setForm] = useState({
    // Step 0: Your Details
    ownerName: "", email: "", phone: "", address: "", postcode: "",
    
    // Step 1: About Your Pet
    petName: "", species: "Dog", breed: "", age: "", gender: "Male", neutered: "Yes",
    dateAcquired: "", acquiredFrom: "", acquiredAge: "", rehomed: "No", rehomeReason: "",
    
    // Step 2: Living Situation
    householdAdults: "", householdChildren: "", childrenAges: "",
    otherPets: "No", otherPetsDetails: "", homeType: "House", hasGarden: "Yes",
    
    // Step 3: Veterinary Care
    vetName: "", vetAddress: "", vetPhone: "", lastVetVisit: "",
    currentMedications: "", medicalConditions: "",
    
    // Step 4: Behaviour History
    behaviorConcernDuration: "", behaviorConcernFrequency: "",
    triggersOrPatterns: "", previousIncidents: "No", incidentDetails: "",
    behaviorWorseningOrImproving: "Stable",
    
    // Step 5: Main Concerns
    primaryConcern: "", concernDescription: "", concernSeverity: "Moderate",
    concernImpact: "", attemptedSolutions: "",
    
    // Step 6: Daily Life
    exerciseAmount: "", exerciseType: "", feedingSchedule: "",
    sleepingArrangement: "", leftAloneDuration: "", leftAloneReaction: "",
    
    // Step 7: Training & Diet
    previousTraining: "No", trainingDetails: "", trainingMethods: "",
    diet: "", allergies: "", currentSupplements: "",
    
    // General
    preferredDate: "", additionalInfo: "",
  });
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    if (!consentGiven) {
      alert("Please agree to our privacy policy before submitting.");
      return;
    }
    setLoading(true);
    try {
      // First, submit the form data
      const res = await fetch("/api/appointments", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...form, 
          videoUploaded: videoFiles.length > 0,
          videoCount: videoFiles.length 
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const assessmentId = data.id;
        
        // If there are video files, upload them
        if (videoFiles.length > 0) {
          const formData = new FormData();
          videoFiles.forEach((file, index) => {
            formData.append(`video-${index}`, file);
          });
          formData.append('assessmentId', assessmentId);
          
          // Upload videos (this will be handled by a new API route)
          try {
            await fetch("/api/upload-videos", {
              method: "POST",
              body: formData,
            });
          } catch (videoError) {
            console.error("Video upload failed:", videoError);
            // Continue anyway - form is submitted
          }
        }
        
        router.push(`/book/confirmation?clientId=${data.clientId}&petName=${encodeURIComponent(form.petName)}`);
      }
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-28 md:pt-36 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>
        
        <Container className="relative z-10">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block bg-accent-400/20 text-accent-300 border border-accent-400/30 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              Professional Behaviour Assessment
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Let&apos;s understand your pet&apos;s <span className="text-accent-300">behaviour</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed mb-10">
              Complete our comprehensive assessment form to help us understand your pet&apos;s needs. This ensures we can provide the most effective behaviour plan from your first session.
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-400/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-300" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">10-15 minutes</p>
                  <p className="text-primary-200 text-xs">To complete</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-400/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-300" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">100% Confidential</p>
                  <p className="text-primary-200 text-xs">Your data is safe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-400/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-300" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">Expert Review</p>
                  <p className="text-primary-200 text-xs">By our behaviourist</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 text-white" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="currentColor">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Form Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-cream rounded-3xl shadow-xl p-6 md:p-10"
            >
              <StepBar step={step} />

              <AnimatePresence mode="wait">
                <motion.div 
                  key={step} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {/* STEP 0: Your Details */}
                  {step === 0 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">About You</h3>
                      <p className="text-sm text-ink-600">Let&apos;s start with your contact information</p>
                    </div>
                    <PillInput id="ownerName" label="Your full name" placeholder="e.g., John Smith" value={form.ownerName} onChange={(v) => update("ownerName", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="email" label="Email address" type="email" placeholder="your.email@example.com" value={form.email} onChange={(v) => update("email", v)} />
                      <PillInput id="phone" label="Phone number" type="tel" placeholder="07123 456789" value={form.phone} onChange={(v) => update("phone", v)} />
                    </div>
                    <PillInput id="address" label="Your full address" placeholder="House number and street name" value={form.address} onChange={(v) => update("address", v)} />
                    <PillInput id="postcode" label="Postcode" placeholder="e.g., SW1A 1AA" value={form.postcode} onChange={(v) => update("postcode", v)} />
                  </>)}

                  {/* STEP 1: About Your Pet */}
                  {step === 1 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">About Your Pet</h3>
                      <p className="text-sm text-ink-600">Tell us about your pet&apos;s basic details</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="petName" label="What is your pet&apos;s name?" placeholder="e.g., Buddy" value={form.petName} onChange={(v) => update("petName", v)} />
                      <PillSelect id="species" label="What type of pet?" value={form.species} onChange={(v) => update("species", v)} options={["Dog", "Cat", "Other"]} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="breed" label="What breed?" placeholder="e.g., Labrador Retriever" value={form.breed} onChange={(v) => update("breed", v)} />
                      <PillInput id="age" label="How old is your pet?" placeholder="e.g., 3 years" value={form.age} onChange={(v) => update("age", v)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillSelect id="gender" label="Gender" value={form.gender} onChange={(v) => update("gender", v)} options={["Male", "Female"]} />
                      <PillSelect id="neutered" label="Is your pet neutered/spayed?" value={form.neutered} onChange={(v) => update("neutered", v)} options={["Yes", "No", "Unknown"]} />
                    </div>
                    <PillInput id="dateAcquired" label="When did you get your pet?" type="date" value={form.dateAcquired} onChange={(v) => update("dateAcquired", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="acquiredFrom" label="Where did you get them from?" placeholder="e.g., Breeder, Rescue centre" value={form.acquiredFrom} onChange={(v) => update("acquiredFrom", v)} />
                      <PillInput id="acquiredAge" label="How old were they then?" placeholder="e.g., 8 weeks" value={form.acquiredAge} onChange={(v) => update("acquiredAge", v)} />
                    </div>
                    <PillSelect id="rehomed" label="Has your pet been rehomed before?" value={form.rehomed} onChange={(v) => update("rehomed", v)} options={["No", "Yes", "Don&apos;t know"]} />
                    {form.rehomed === "Yes" && (
                      <PillTextarea id="rehomeReason" label="If yes, do you know why they were rehomed?" placeholder="Please share what you know..." value={form.rehomeReason} onChange={(v) => update("rehomeReason", v)} rows={2} />
                    )}
                  </>)}

                  {/* STEP 2: Living Situation */}
                  {step === 2 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">Living Situation</h3>
                      <p className="text-sm text-ink-600">Help us understand your home environment</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="householdAdults" label="How many adults live in your home?" placeholder="e.g., 2" value={form.householdAdults} onChange={(v) => update("householdAdults", v)} />
                      <PillInput id="householdChildren" label="How many children?" placeholder="e.g., 0" value={form.householdChildren} onChange={(v) => update("householdChildren", v)} />
                    </div>
                    {form.householdChildren && parseInt(form.householdChildren) > 0 && (
                      <PillInput id="childrenAges" label="What are their ages?" placeholder="e.g., 5, 8, 12 years old" value={form.childrenAges} onChange={(v) => update("childrenAges", v)} />
                    )}
                    <PillSelect id="otherPets" label="Do you have other pets at home?" value={form.otherPets} onChange={(v) => update("otherPets", v)} options={["No", "Yes"]} />
                    {form.otherPets === "Yes" && (
                      <PillTextarea id="otherPetsDetails" label="Please tell us about them" placeholder="e.g., 1 cat (Fluffy, 5 years), 1 dog (Max, 7 years)" value={form.otherPetsDetails} onChange={(v) => update("otherPetsDetails", v)} rows={2} />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillSelect id="homeType" label="What type of home do you live in?" value={form.homeType} onChange={(v) => update("homeType", v)} options={["House", "Flat/Apartment", "Bungalow", "Other"]} />
                      <PillSelect id="hasGarden" label="Do you have a garden or yard?" value={form.hasGarden} onChange={(v) => update("hasGarden", v)} options={["Yes", "No"]} />
                    </div>
                  </>)}

                  {/* STEP 3: Veterinary Care */}
                  {step === 3 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">Veterinary Information</h3>
                      <p className="text-sm text-ink-600">Your pet&apos;s medical care details</p>
                    </div>
                    <PillInput id="vetName" label="What is your vet&apos;s practice name?" placeholder="e.g., ABC Veterinary Clinic" value={form.vetName} onChange={(v) => update("vetName", v)} />
                    <PillInput id="vetAddress" label="Vet practice address" placeholder="Street address and town" value={form.vetAddress} onChange={(v) => update("vetAddress", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="vetPhone" label="Vet practice phone number" type="tel" placeholder="01234 567890" value={form.vetPhone} onChange={(v) => update("vetPhone", v)} />
                      <PillInput id="lastVetVisit" label="When was the last vet visit?" type="date" value={form.lastVetVisit} onChange={(v) => update("lastVetVisit", v)} />
                    </div>
                    <PillInput id="currentMedications" label="Is your pet on any medications?" placeholder="List any medications or write 'None'" required={false} value={form.currentMedications} onChange={(v) => update("currentMedications", v)} />
                    <PillTextarea id="medicalConditions" label="Any known medical conditions?" placeholder="Please list any health conditions or write 'None'" required={false} value={form.medicalConditions} onChange={(v) => update("medicalConditions", v)} rows={2} />
                  </>)}

                  {/* STEP 4: Behaviour History */}
                  {step === 4 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">Behaviour History</h3>
                      <p className="text-sm text-ink-600">When did you first notice the behaviour?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="behaviorConcernDuration" label="How long has this been happening?" placeholder="e.g., 6 months" value={form.behaviorConcernDuration} onChange={(v) => update("behaviorConcernDuration", v)} />
                      <PillInput id="behaviorConcernFrequency" label="How often does it happen?" placeholder="e.g., Daily, a few times a week" value={form.behaviorConcernFrequency} onChange={(v) => update("behaviorConcernFrequency", v)} />
                    </div>
                    <PillTextarea id="triggers" label="What seems to trigger the behaviour?" placeholder="Describe any situations, people, sounds, or things that trigger the behaviour" value={form.triggersOrPatterns} onChange={(v) => update("triggersOrPatterns", v)} rows={3} />
                    <PillSelect id="previousIncidents" label="Have there been any incidents or concerning events?" value={form.previousIncidents} onChange={(v) => update("previousIncidents", v)} options={["No", "Yes"]} />
                    {form.previousIncidents === "Yes" && (
                      <PillTextarea id="incidentDetails" label="Please describe what happened" placeholder="Tell us about any specific incidents" value={form.incidentDetails} onChange={(v) => update("incidentDetails", v)} rows={3} />
                    )}
                    <PillSelect id="behaviorWorseningOrImproving" label="Is the behaviour getting better or worse?" value={form.behaviorWorseningOrImproving} onChange={(v) => update("behaviorWorseningOrImproving", v)} options={["Staying the same", "Getting worse", "Getting better", "Varies/Unpredictable"]} />
                  </>)}

                  {/* STEP 5: Main Concerns */}
                  {step === 5 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">Main Concerns</h3>
                      <p className="text-sm text-ink-600">Tell us what you&apos;re most worried about</p>
                    </div>
                    <PillInput id="primaryConcern" label="What is your main concern?" placeholder="e.g., Separation anxiety, aggression towards other dogs" value={form.primaryConcern} onChange={(v) => update("primaryConcern", v)} />
                    <PillTextarea id="concernDescription" label="Please describe the behaviour in detail" placeholder="What exactly does your pet do? Be as specific as possible" value={form.concernDescription} onChange={(v) => update("concernDescription", v)} rows={4} />
                    <PillSelect id="concernSeverity" label="How severe is the issue?" value={form.concernSeverity} onChange={(v) => update("concernSeverity", v)} options={["Mild - A minor concern", "Moderate - Affecting daily life", "Severe - Major impact"]} />
                    <PillInput id="concernImpact" label="How does this affect your family?" placeholder="e.g., Can&apos;t have visitors, can&apos;t go on walks" value={form.concernImpact} onChange={(v) => update("concernImpact", v)} />
                    <PillTextarea id="attemptedSolutions" label="What have you already tried?" placeholder="List any training methods, products, or techniques you&apos;ve used" value={form.attemptedSolutions} onChange={(v) => update("attemptedSolutions", v)} rows={2} />
                  </>)}

                  {/* STEP 6: Daily Life */}
                  {step === 6 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">Daily Life</h3>
                      <p className="text-sm text-ink-600">Your pet&apos;s typical daily routine</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="exerciseAmount" label="How much exercise daily?" placeholder="e.g., 2 hours" value={form.exerciseAmount} onChange={(v) => update("exerciseAmount", v)} />
                      <PillInput id="exerciseType" label="What type of exercise?" placeholder="e.g., Walks, play in garden" value={form.exerciseType} onChange={(v) => update("exerciseType", v)} />
                    </div>
                    <PillInput id="feedingSchedule" label="When do you feed your pet?" placeholder="e.g., 8am and 6pm" value={form.feedingSchedule} onChange={(v) => update("feedingSchedule", v)} />
                    <PillInput id="sleepingArrangement" label="Where does your pet sleep at night?" placeholder="e.g., Own bed in living room, in my bedroom" value={form.sleepingArrangement} onChange={(v) => update("sleepingArrangement", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PillInput id="leftAloneDuration" label="How long are they left alone?" placeholder="e.g., 4 hours daily" value={form.leftAloneDuration} onChange={(v) => update("leftAloneDuration", v)} />
                      <PillInput id="leftAloneReaction" label="How do they react when alone?" placeholder="e.g., Calm, anxious, destructive" value={form.leftAloneReaction} onChange={(v) => update("leftAloneReaction", v)} />
                    </div>
                  </>)}

                  {/* STEP 7: Training & Diet */}
                  {step === 7 && (<>
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-primary-900 mb-2">Training & Diet</h3>
                      <p className="text-sm text-ink-600">Previous training and dietary information</p>
                    </div>
                    <PillSelect id="previousTraining" label="Has your pet had any training before?" value={form.previousTraining} onChange={(v) => update("previousTraining", v)} options={["No", "Yes"]} />
                    {form.previousTraining === "Yes" && (<>
                      <PillInput id="trainingDetails" label="When and where was the training?" placeholder="e.g., Puppy class in 2022, private trainer" value={form.trainingDetails} onChange={(v) => update("trainingDetails", v)} />
                      <PillInput id="trainingMethods" label="What training methods were used?" placeholder="e.g., Positive reinforcement, clicker training" value={form.trainingMethods} onChange={(v) => update("trainingMethods", v)} />
                    </>)}
                    <PillInput id="diet" label="What food do you feed your pet?" placeholder="Brand and type (e.g., Royal Canin dry food)" value={form.diet} onChange={(v) => update("diet", v)} />
                    <PillInput id="allergies" label="Any known allergies or food sensitivities?" placeholder="List any allergies or write 'None'" required={false} value={form.allergies} onChange={(v) => update("allergies", v)} />
                    <PillInput id="currentSupplements" label="Any supplements or regular treats?" placeholder="List any supplements or write 'None'" required={false} value={form.currentSupplements} onChange={(v) => update("currentSupplements", v)} />
                    <PillInput id="preferredDate" label="Preferred consultation date (optional)" type="date" required={false} value={form.preferredDate} onChange={(v) => update("preferredDate", v)} />
                    <PillTextarea id="additionalInfo" label="Anything else we should know?" placeholder="Any other information that might be helpful" value={form.additionalInfo} onChange={(v) => update("additionalInfo", v)} required={false} rows={3} />
                    
                    {/* Video upload */}
                    <div className="mt-2">
                      <label className="text-xs font-semibold text-primary-900 font-sans mb-2 block">
                        Upload a video of the behaviour (optional but recommended)
                      </label>
                      <VideoUpload 
                        onUpload={() => setVideoUploaded(true)} 
                        onFilesChange={(files) => setVideoFiles(files)}
                      />
                      <p className="text-xs text-ink-500 mt-2">A short video helps us understand the behaviour better and prepare for your consultation</p>
                    </div>
                  </>)}

                  {/* STEP 8: Review & Submit */}
                  {step === 8 && (
                    <div>
                      <div className="mb-6">
                        <h3 className="font-display text-xl text-primary-900 mb-2">Review Your Information</h3>
                        <p className="text-sm text-ink-600">Please review your details before submitting</p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-6 max-h-[400px] overflow-y-auto border-2 border-primary-100 mb-6">
                        <div className="space-y-5">
                          <div>
                            <h4 className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-2">Your Details</h4>
                            <div className="space-y-1.5 text-sm">
                              {[["Name", form.ownerName], ["Email", form.email], ["Phone", form.phone], ["Address", form.address], ["Postcode", form.postcode]].map(([label, val]) => val && (
                                <div key={label} className="flex gap-3">
                                  <span className="font-semibold text-primary-900 min-w-[90px]">{label}:</span>
                                  <span className="text-ink-600">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-2">Pet Details</h4>
                            <div className="space-y-1.5 text-sm">
                              {[["Name", form.petName], ["Species", form.species], ["Breed", form.breed], ["Age", form.age], ["Gender", form.gender], ["Neutered", form.neutered]].map(([label, val]) => val && (
                                <div key={label} className="flex gap-3">
                                  <span className="font-semibold text-primary-900 min-w-[90px]">{label}:</span>
                                  <span className="text-ink-600">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-2">Main Concerns</h4>
                            <div className="space-y-1.5 text-sm">
                              {[["Primary concern", form.primaryConcern], ["Duration", form.behaviorConcernDuration], ["Frequency", form.behaviorConcernFrequency], ["Severity", form.concernSeverity]].map(([label, val]) => val && (
                                <div key={label} className="flex gap-3">
                                  <span className="font-semibold text-primary-900 min-w-[90px]">{label}:</span>
                                  <span className="text-ink-600">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {form.preferredDate && (
                            <div className="bg-primary-50 rounded-xl p-3">
                              <span className="text-sm font-semibold text-primary-900">Preferred date: </span>
                              <span className="text-sm text-ink-600">{form.preferredDate}</span>
                            </div>
                          )}

                          {videoUploaded && (
                            <div className="bg-accent-50 rounded-xl p-3 flex items-center gap-2">
                              <Check className="w-5 h-5 text-accent-600" strokeWidth={2.5} />
                              <span className="text-sm font-semibold text-accent-700">Behaviour video uploaded</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Privacy Consent */}
                      <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-5">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="consent"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-2 border-primary-300 text-primary-700 focus:ring-2 focus:ring-primary-700/20 cursor-pointer"
                          />
                          <label htmlFor="consent" className="text-sm text-ink-700 leading-relaxed cursor-pointer">
                            I consent to NeuroPet storing and processing my personal information in accordance with the{" "}
                            <Link href="/privacy-policy" className="text-primary-700 font-semibold hover:text-accent-600 underline">
                              Privacy Policy
                            </Link>
                            . I understand that my data will be used solely for the purpose of providing behaviour consultation services and will be kept confidential.
                          </label>
                        </div>
                        {!consentGiven && step === 8 && (
                          <p className="text-xs text-accent-600 mt-2 ml-8">
                            * You must agree to our privacy policy before submitting
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-primary-100">
                {step > 0 ? (
                  <button 
                    onClick={() => setStep((s) => s - 1)} 
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-primary-200 bg-white text-primary-900 font-semibold text-sm hover:border-primary-700 hover:bg-primary-50 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back
                  </button>
                ) : <div />}
                
                {step < 8 ? (
                  <button 
                    onClick={() => setStep((s) => s + 1)} 
                    className="px-8 py-3 rounded-full bg-primary-700 text-white font-bold text-sm hover:bg-primary-800 transition-all shadow-md hover:shadow-lg"
                  >
                    {step === 7 ? "Review →" : "Continue →"}
                  </button>
                ) : (
                  <button 
                    onClick={submit} 
                    disabled={loading} 
                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg ${
                      loading ? 'bg-ink-400 cursor-not-allowed' : 'bg-accent-600 hover:bg-accent-700 text-white'
                    }`}
                  >
                    {loading ? "Submitting..." : "Submit Assessment"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <FAQSection />
      <FollowUs />
    </>
  );
}
