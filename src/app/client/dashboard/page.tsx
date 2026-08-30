"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Calendar,
  User,
  CheckCircle,
  Clock,
  PawPrint,
} from "lucide-react";

interface DashboardData {
  user: {
    name: string;
    email: string;
    clientId: string;
  };
  assessment: {
    status: string;
    petName: string;
    primaryConcern: string;
    appointmentDate?: string;
    submittedAt: string;
  };
  unreadMessages: number;
}

const STATUS_INFO = {
  pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Under Review",
    description: "Our team is reviewing your assessment",
  },
  reviewed: {
    icon: CheckCircle,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Reviewed",
    description: "Assessment reviewed, appointment pending",
  },
  scheduled: {
    icon: Calendar,
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Scheduled",
    description: "Your appointment is confirmed",
  },
  completed: {
    icon: CheckCircle,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    label: "Completed",
    description: "Consultation completed",
  },
};

export default function ClientDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch("/api/client/dashboard");
      if (res.ok) {
        const dashboardData = await res.json();
        setData(dashboardData);
      } else {
        router.push("/client/login");
      }
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const statusInfo = STATUS_INFO[data.assessment.status as keyof typeof STATUS_INFO] || STATUS_INFO.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-primary-900 mb-2">
          Welcome back, {data.user.name.split(" ")[0]}!
        </h1>
        <p className="text-ink-600">Here&apos;s an overview of your assessment and care plan.</p>
      </div>

      {/* Status Card - Large Featured */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-primary-700">
        <div className="flex items-start gap-6">
          <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${statusInfo.color.split(' ')[0]} flex items-center justify-center border-2 ${statusInfo.color.split('border-')[1]}`}>
            <StatusIcon className="w-8 h-8" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="font-display text-2xl text-primary-900">
                Assessment Status
              </h2>
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
            <p className="text-ink-600 mb-6">{statusInfo.description}</p>
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs font-semibold text-primary-700 mb-1 uppercase tracking-wide">Pet Name</p>
                <p className="text-lg font-bold text-primary-900">{data.assessment.petName}</p>
              </div>
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs font-semibold text-primary-700 mb-1 uppercase tracking-wide">Main Concern</p>
                <p className="text-lg font-bold text-primary-900">{data.assessment.primaryConcern}</p>
              </div>
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs font-semibold text-primary-700 mb-1 uppercase tracking-wide">Submitted</p>
                <p className="text-lg font-bold text-primary-900">
                  {new Date(data.assessment.submittedAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>

            {/* Appointment Display */}
            {data.assessment.appointmentDate && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">Your Upcoming Appointment</p>
                    <p className="text-base font-bold text-green-700">
                      {new Date(data.assessment.appointmentDate).toLocaleString("en-GB", {
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
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="font-display text-xl text-primary-900 mb-4">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/client/assessment"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-700 transition-all flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-700 group-hover:text-white transition-all" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg text-primary-900">My Assessment</h3>
            </div>
            <p className="text-sm text-ink-600">View your complete assessment details</p>
          </Link>

          <Link
            href="/client/messages"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group relative"
          >
            {data.unreadMessages > 0 && (
              <span className="absolute top-4 right-4 w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                {data.unreadMessages}
              </span>
            )}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-accent-100 group-hover:bg-accent-600 transition-all flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent-600 group-hover:text-white transition-all" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg text-primary-900">Messages</h3>
            </div>
            <p className="text-sm text-ink-600">
              {data.unreadMessages > 0
                ? `${data.unreadMessages} new message${data.unreadMessages > 1 ? "s" : ""}`
                : "Chat with your behaviourist"}
            </p>
          </Link>

          <Link
            href="/client/profile"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-700 transition-all flex items-center justify-center">
                <User className="w-6 h-6 text-primary-700 group-hover:text-white transition-all" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg text-primary-900">Profile</h3>
            </div>
            <p className="text-sm text-ink-600">Manage your account and settings</p>
          </Link>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg text-primary-900 mb-2">Need Help?</h3>
            <p className="text-sm text-ink-600 mb-4">
              If you have any questions about your assessment, appointment, or care plan, 
              our team is here to help through secure messaging.
            </p>
            <Link
              href="/client/messages"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
