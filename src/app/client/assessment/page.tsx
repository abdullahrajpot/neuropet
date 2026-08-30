"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download, User, PawPrint, Home, Stethoscope } from "lucide-react";

export default function ClientAssessmentPage() {
  const router = useRouter();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAssessment = useCallback(async () => {
    try {
      const res = await fetch("/api/client/assessment");
      if (res.ok) {
        const data = await res.json();
        setAssessment(data);
      } else {
        router.push("/client/login");
      }
    } catch (error) {
      console.error("Failed to fetch assessment:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading your assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) return null;

  const sections = [
    {
      title: "Your Information",
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
      ],
    },
    {
      title: "Living Situation",
      icon: Home,
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
      icon: Stethoscope,
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
      title: "Behaviour Information",
      fields: [
        { label: "Primary Concern", value: assessment.primaryConcern },
        { label: "Description", value: assessment.concernDescription },
        { label: "Severity", value: assessment.concernSeverity },
        { label: "Duration", value: assessment.behaviorConcernDuration },
        { label: "Frequency", value: assessment.behaviorConcernFrequency },
        { label: "Triggers/Patterns", value: assessment.triggersOrPatterns },
        { label: "Impact on Daily Life", value: assessment.concernImpact },
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-primary-900 mb-2">
            Your Behaviour Assessment
          </h1>
          <p className="text-ink-600">
            Submitted on{" "}
            {new Date(assessment.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-all"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Assessment Sections */}
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-primary-100">
              {section.icon && <section.icon className="w-5 h-5 text-primary-700" />}
              <h2 className="font-display text-xl text-primary-900">
                {section.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields
                .filter((f) => f.value)
                .map((field, i) => (
                  <div key={i} className="bg-cream rounded-xl p-4">
                    <p className="text-xs font-semibold text-primary-700 mb-1 uppercase tracking-wide">
                      {field.label}
                    </p>
                    <p className="text-sm text-primary-900">
                      {field.value}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      {assessment.additionalInfo && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-display text-xl text-primary-900 mb-4">
            Additional Information
          </h2>
          <p className="text-ink-700 leading-relaxed whitespace-pre-wrap">
            {assessment.additionalInfo}
          </p>
        </div>
      )}
    </div>
  );
}
