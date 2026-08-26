"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Save,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  PawPrint,
} from "lucide-react";
import { Container } from "@/components/ui/shared";

export default function AssessmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [key, setKey] = useState("");
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("neuropet-admin-key");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setKey(stored);
    fetchAssessment(stored);
  }, [router, params.id]);

  const fetchAssessment = async (adminKey: string) => {
    try {
      const res = await fetch(`/api/appointments?key=${adminKey}`);
      if (res.ok) {
        const data = await res.json();
        const found = data.find((a: any) => a._id === params.id);
        if (found) {
          setAssessment(found);
          setStatus(found.status || "pending");
          setNotes(found.notes || "");
          setAppointmentDate(found.appointmentDate || "");
        }
      }
    } catch (error) {
      console.error("Failed to fetch assessment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/assessments?key=${key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: params.id,
          status,
          notes,
          appointmentDate,
        }),
      });

      if (res.ok) {
        alert("Assessment updated successfully!");
        fetchAssessment(key);
      }
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update assessment");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-24 pb-16">
        <Container>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-ink-600">Loading assessment...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (!assessment) {
    return (
      <section className="min-h-screen bg-cream pt-24 pb-16">
        <Container>
          <div className="text-center py-12">
            <p className="text-ink-600">Assessment not found</p>
          </div>
        </Container>
      </section>
    );
  }

  const sections = [
    {
      title: "Client Information",
      icon: User,
      fields: [
        { label: "Name", value: assessment.ownerName || assessment.name },
        { label: "Email", value: assessment.email },
        { label: "Phone", value: assessment.phone },
        { label: "Address", value: assessment.address },
        { label: "Postcode", value: assessment.postcode },
      ],
    },
    {
      title: "Pet Details",
      icon: PawPrint,
      fields: [
        { label: "Pet Name", value: assessment.petName },
        { label: "Species", value: assessment.species || assessment.petType },
        { label: "Breed", value: assessment.breed },
        { label: "Age", value: assessment.age },
        { label: "Gender", value: assessment.gender },
        { label: "Neutered/Spayed", value: assessment.neutered },
        { label: "Acquired From", value: assessment.acquiredFrom },
        { label: "Age When Acquired", value: assessment.acquiredAge },
        { label: "Rehomed", value: assessment.rehomed },
        {
          label: "Rehome Reason",
          value: assessment.rehomeReason,
          condition: assessment.rehomed === "Yes",
        },
      ],
    },
    {
      title: "Living Situation",
      icon: MapPin,
      fields: [
        { label: "Adults in Household", value: assessment.householdAdults },
        { label: "Children in Household", value: assessment.householdChildren },
        { label: "Children Ages", value: assessment.childrenAges },
        { label: "Other Pets", value: assessment.otherPets },
        { label: "Other Pets Details", value: assessment.otherPetsDetails },
        { label: "Home Type", value: assessment.homeType },
        { label: "Has Garden", value: assessment.hasGarden },
      ],
    },
    {
      title: "Veterinary Information",
      icon: Mail,
      fields: [
        { label: "Vet Practice", value: assessment.vetName },
        { label: "Vet Address", value: assessment.vetAddress },
        { label: "Vet Phone", value: assessment.vetPhone },
        { label: "Last Vet Visit", value: assessment.lastVetVisit },
        { label: "Current Medications", value: assessment.currentMedications },
        { label: "Medical Conditions", value: assessment.medicalConditions },
      ],
    },
    {
      title: "Behaviour History",
      fields: [
        { label: "Duration", value: assessment.behaviorConcernDuration },
        { label: "Frequency", value: assessment.behaviorConcernFrequency },
        { label: "Triggers/Patterns", value: assessment.triggersOrPatterns },
        { label: "Previous Incidents", value: assessment.previousIncidents },
        { label: "Incident Details", value: assessment.incidentDetails },
        { label: "Status", value: assessment.behaviorWorseningOrImproving },
      ],
    },
    {
      title: "Main Concerns",
      fields: [
        { label: "Primary Concern", value: assessment.primaryConcern },
        { label: "Description", value: assessment.concernDescription },
        { label: "Severity", value: assessment.concernSeverity },
        { label: "Impact", value: assessment.concernImpact },
        { label: "Attempted Solutions", value: assessment.attemptedSolutions },
      ],
    },
    {
      title: "Daily Routine",
      fields: [
        { label: "Exercise Amount", value: assessment.exerciseAmount },
        { label: "Exercise Type", value: assessment.exerciseType },
        { label: "Feeding Schedule", value: assessment.feedingSchedule },
        { label: "Sleeping Arrangement", value: assessment.sleepingArrangement },
        { label: "Time Left Alone", value: assessment.leftAloneDuration },
        { label: "Reaction When Alone", value: assessment.leftAloneReaction },
      ],
    },
    {
      title: "Training & Diet",
      fields: [
        { label: "Previous Training", value: assessment.previousTraining },
        { label: "Training Details", value: assessment.trainingDetails },
        { label: "Training Methods", value: assessment.trainingMethods },
        { label: "Diet", value: assessment.diet },
        { label: "Allergies", value: assessment.allergies },
        { label: "Supplements", value: assessment.currentSupplements },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-cream pt-24 pb-16">
      <Container>
        <Link
          href="/admin/assessments"
          className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-accent-600 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Assessments
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="font-display text-3xl text-primary-900 mb-2">
                {assessment.ownerName} — {assessment.petName}
              </h1>
              <p className="text-sm text-ink-600">
                Submitted on{" "}
                {new Date(assessment.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* All Sections */}
            {sections.map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon && <section.icon className="w-5 h-5 text-primary-700" />}
                  <h2 className="font-display text-xl text-primary-900">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {section.fields
                    .filter((f) => f.condition !== false && f.value)
                    .map((field, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4">
                        <span className="text-sm font-semibold text-ink-700">
                          {field.label}:
                        </span>
                        <span className="col-span-2 text-sm text-ink-900">
                          {field.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            {/* Video Section */}
            {assessment.videoUploaded && assessment.videoPaths && assessment.videoPaths.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h2 className="font-display text-xl text-primary-900">
                    Behaviour Videos ({assessment.videoCount})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessment.videoPaths.map((videoPath: string, index: number) => (
                    <div key={index} className="bg-primary-50 rounded-xl p-4">
                      <video 
                        controls 
                        className="w-full rounded-lg mb-2 bg-black"
                        src={videoPath}
                        style={{ maxHeight: "300px" }}
                      >
                        Your browser does not support video playback.
                      </video>
                      <p className="text-xs text-ink-600 font-semibold">Video {index + 1}</p>
                      <a 
                        href={videoPath} 
                        download
                        className="text-xs text-primary-700 hover:underline mt-1 inline-block"
                      >
                        Download video
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Management */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-display text-lg text-primary-900 mb-4">
                Management
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-primary-900 block mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-primary-900 block mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="datetime-local"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-primary-900 block mb-2">
                    Internal Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none resize-none"
                    placeholder="Add notes about this assessment..."
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <Link
                  href={`/admin/messages/${assessment._id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Message Client
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
