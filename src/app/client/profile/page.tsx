"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

interface UserData {
  name: string;
  email: string;
  clientId?: string;
}

interface PetData {
  petName?: string;
  species?: string;
  breed?: string;
  age?: string;
  gender?: string;
  neutered?: string;
  acquiredAge?: string;
  primaryConcern?: string;
  homeType?: string;
  hasGarden?: string;
  householdAdults?: string;
  householdChildren?: string;
  otherPets?: string;
  vetName?: string;
  vetAddress?: string;
  vetPhone?: string;
  lastVetVisit?: string;
  currentMedications?: string;
  medicalConditions?: string;
  allergies?: string;
  exerciseAmount?: string;
  exerciseType?: string;
  feedingSchedule?: string;
  diet?: string;
  behaviorConcernDuration?: string;
  behaviorConcernFrequency?: string;
  status?: string;
  appointmentDate?: Date;
  submittedAt?: string;
}

export default function ClientProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [pet, setPet] = useState<PetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [userRes, petRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/client/assessment"),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      } else {
        router.push("/client/login");
        return;
      }

      if (petRes.ok) {
        const petData = await petRes.json();
        setPet(petData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary-900 mb-2">Pet Profile</h1>
        <p className="text-ink-600">Complete overview of your pet information and care schedule</p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-2xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pet Info & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pet Header Card */}
          {pet && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-primary-300 flex items-center justify-center">
                    <PetsIcon sx={{ fontSize: 48, color: '#1E4A40' }} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display text-3xl text-primary-900">{pet.petName || "Your Pet"}</h2>
                    {pet.gender && (
                      <span className="px-3 py-1 rounded-full border border-primary-300 text-primary-700 text-sm font-semibold">
                        {pet.gender}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-ink-600 mb-4">
                    {pet.species && <span className="font-semibold">{pet.species}</span>}
                    {pet.species && pet.breed && <span>•</span>}
                    {pet.breed && <span>{pet.breed}</span>}
                    {pet.breed && pet.age && <span>•</span>}
                    {pet.age && <span>{pet.age}</span>}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="border border-primary-200 rounded-xl p-3">
                      <p className="text-xs text-ink-500 mb-1">Neutered</p>
                      <p className="font-bold text-primary-900">{pet.neutered || "N/A"}</p>
                    </div>
                    <div className="border border-primary-200 rounded-xl p-3">
                      <p className="text-xs text-ink-500 mb-1">Acquired</p>
                      <p className="font-bold text-primary-900">{pet.acquiredAge || "N/A"}</p>
                    </div>
                    <div className="border border-primary-200 rounded-xl p-3">
                      <p className="text-xs text-ink-500 mb-1">Home</p>
                      <p className="font-bold text-primary-900">{pet.homeType || "N/A"}</p>
                    </div>
                    <div className="border border-primary-200 rounded-xl p-3">
                      <p className="text-xs text-ink-500 mb-1">Garden</p>
                      <p className="font-bold text-primary-900">{pet.hasGarden || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Appointment */}
          {pet?.appointmentDate && (
            <div className="bg-white rounded-2xl border-l-4 border-accent-600 p-6">
              <div className="flex items-start gap-4">
                <CalendarMonthIcon sx={{ fontSize: 32, color: '#D97540' }} />
                <div className="flex-1">
                  <h3 className="font-display text-xl text-primary-900 mb-2">Upcoming Appointment</h3>
                  <div className="border border-accent-300 rounded-xl p-4">
                    <p className="text-sm text-ink-600 mb-1">Scheduled Consultation</p>
                    <p className="text-lg font-bold text-accent-700">
                      {new Date(pet.appointmentDate).toLocaleString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assessment History */}
          {pet?.submittedAt && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <HistoryIcon sx={{ fontSize: 28, color: '#1E4A40' }} />
                <h3 className="font-display text-lg text-primary-900">Assessment History</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-primary-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">Initial Assessment</p>
                      <p className="text-sm text-ink-600">
                        Submitted on {new Date(pet.submittedAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    pet.status === 'scheduled' ? 'border-green-600 text-green-700' :
                    pet.status === 'reviewed' ? 'border-blue-600 text-blue-700' :
                    'border-yellow-600 text-yellow-700'
                  }`}>
                    {pet.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Behavior Concern */}
          {pet?.primaryConcern && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FavoriteIcon sx={{ fontSize: 28, color: '#D97540' }} />
                <h3 className="font-display text-lg text-primary-900">Primary Concern</h3>
              </div>
              <div className="border border-accent-300 rounded-xl p-4">
                <p className="font-semibold text-primary-900 mb-2">{pet.primaryConcern}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {pet.behaviorConcernDuration && (
                    <div>
                      <span className="text-ink-500">Duration: </span>
                      <span className="font-semibold text-primary-900">{pet.behaviorConcernDuration}</span>
                    </div>
                  )}
                  {pet.behaviorConcernFrequency && (
                    <div>
                      <span className="text-ink-500">Frequency: </span>
                      <span className="font-semibold text-primary-900">{pet.behaviorConcernFrequency}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Daily Care */}
          {pet && (pet.exerciseAmount || pet.feedingSchedule || pet.diet) && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <DirectionsRunIcon sx={{ fontSize: 28, color: '#1E4A40' }} />
                <h3 className="font-display text-lg text-primary-900">Daily Care Routine</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pet.exerciseAmount && (
                  <div className="flex items-start gap-3 p-3 border border-primary-200 rounded-xl">
                    <DirectionsRunIcon sx={{ fontSize: 24, color: '#1E4A40' }} />
                    <div>
                      <p className="text-xs text-ink-500 mb-1">Exercise</p>
                      <p className="font-semibold text-primary-900">{pet.exerciseAmount}</p>
                      {pet.exerciseType && <p className="text-sm text-ink-600">{pet.exerciseType}</p>}
                    </div>
                  </div>
                )}
                {pet.feedingSchedule && (
                  <div className="flex items-start gap-3 p-3 border border-primary-200 rounded-xl">
                    <RestaurantIcon sx={{ fontSize: 24, color: '#1E4A40' }} />
                    <div>
                      <p className="text-xs text-ink-500 mb-1">Feeding</p>
                      <p className="font-semibold text-primary-900">{pet.feedingSchedule}</p>
                      {pet.diet && <p className="text-sm text-ink-600">{pet.diet}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Health Info & Account */}
        <div className="space-y-6">
          {/* Veterinary Care */}
          {pet?.vetName && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MedicalServicesIcon sx={{ fontSize: 28, color: '#D97540' }} />
                <h3 className="font-display text-lg text-primary-900">Veterinary Care</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-500 mb-1">Practice</p>
                  <p className="font-semibold text-primary-900">{pet.vetName}</p>
                </div>
                {pet.vetPhone && (
                  <div className="flex items-center gap-2">
                    <LocalPhoneIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                    <p className="text-sm text-ink-600">{pet.vetPhone}</p>
                  </div>
                )}
                {pet.vetAddress && (
                  <div className="flex items-start gap-2">
                    <LocationOnIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                    <p className="text-sm text-ink-600">{pet.vetAddress}</p>
                  </div>
                )}
                {pet.lastVetVisit && (
                  <div className="pt-3 border-t border-primary-100">
                    <p className="text-xs text-ink-500">Last Visit</p>
                    <p className="font-semibold text-primary-900">{pet.lastVetVisit}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Health Information */}
          {pet && (pet.currentMedications || pet.medicalConditions || pet.allergies) && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FavoriteIcon sx={{ fontSize: 28, color: '#1E4A40' }} />
                <h3 className="font-display text-lg text-primary-900">Health Information</h3>
              </div>
              <div className="space-y-3">
                {pet.currentMedications && (
                  <div>
                    <p className="text-xs text-ink-500 mb-1">Medications</p>
                    <p className="text-sm text-primary-900">{pet.currentMedications}</p>
                  </div>
                )}
                {pet.medicalConditions && (
                  <div>
                    <p className="text-xs text-ink-500 mb-1">Conditions</p>
                    <p className="text-sm text-primary-900">{pet.medicalConditions}</p>
                  </div>
                )}
                {pet.allergies && (
                  <div>
                    <p className="text-xs text-ink-500 mb-1">Allergies</p>
                    <p className="text-sm text-primary-900">{pet.allergies}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Living Situation */}
          {pet && (pet.householdAdults || pet.householdChildren || pet.otherPets) && (
            <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <HomeIcon sx={{ fontSize: 28, color: '#1E4A40' }} />
                <h3 className="font-display text-lg text-primary-900">Living Situation</h3>
              </div>
              <div className="space-y-2 text-sm">
                {pet.householdAdults && (
                  <div className="flex justify-between items-center py-2 border-b border-primary-50">
                    <span className="text-ink-600">Adults</span>
                    <span className="font-semibold text-primary-900">{pet.householdAdults}</span>
                  </div>
                )}
                {pet.householdChildren && (
                  <div className="flex justify-between items-center py-2 border-b border-primary-50">
                    <span className="text-ink-600">Children</span>
                    <span className="font-semibold text-primary-900">{pet.householdChildren}</span>
                  </div>
                )}
                {pet.otherPets && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-ink-600">Other Pets</span>
                    <span className="font-semibold text-primary-900">{pet.otherPets}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Account Quick Card */}
          <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <PersonIcon sx={{ fontSize: 28, color: '#1E4A40' }} />
              <h3 className="font-display text-lg text-primary-900">Account</h3>
            </div>
            <div className="space-y-3">
              {user && (
                <>
                  <div>
                    <p className="text-xs text-ink-500 mb-1">Name</p>
                    <p className="font-semibold text-primary-900">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-500 mb-1">Email</p>
                    <p className="text-sm text-primary-900">{user.email}</p>
                  </div>
                  {user.clientId && (
                    <div>
                      <p className="text-xs text-ink-500 mb-1">Client ID</p>
                      <p className="text-sm font-mono text-primary-900">{user.clientId}</p>
                    </div>
                  )}
                </>
              )}
              <Link
                href="/client/settings"
                className="w-full mt-3 py-2 px-4 rounded-xl bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-all flex items-center justify-center gap-2"
              >
                <SettingsIcon sx={{ fontSize: 18 }} />
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
