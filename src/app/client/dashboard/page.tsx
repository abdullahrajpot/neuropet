"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Calendar,
  User,
  CheckCircle,
  Clock,
  LogOut,
} from "lucide-react";
import { Container } from "@/components/ui/shared";
import { motion } from "framer-motion";

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
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
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/client/login");
    router.refresh();
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-24 pb-16">
        <Container>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-ink-600">Loading your dashboard...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (!data) return null;

  const statusInfo = STATUS_INFO[data.assessment.status as keyof typeof STATUS_INFO] || STATUS_INFO.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <section className="min-h-screen bg-cream pt-24 pb-16">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl text-primary-900 mb-2">
              Welcome back, {data.user.name.split(" ")[0]}!
            </h1>
            <p className="text-ink-600">Here's an overview of your assessment</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-start gap-6">
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${statusInfo.color.split(' ')[0]} flex items-center justify-center border-2 ${statusInfo.color.split('border-')[1]}`}>
              <StatusIcon className="w-8 h-8" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-2xl text-primary-900">
                  Assessment Status
                </h2>
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-ink-600 mb-4">{statusInfo.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary-50 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-primary-700 mb-1">Pet Name</p>
                  <p className="text-lg font-bold text-primary-900">{data.assessment.petName}</p>
                </div>
                <div className="bg-primary-50 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-primary-700 mb-1">Main Concern</p>
                  <p className="text-lg font-bold text-primary-900">{data.assessment.primaryConcern}</p>
                </div>
                <div className="bg-primary-50 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-primary-700 mb-1">Submitted</p>
                  <p className="text-lg font-bold text-primary-900">
                    {new Date(data.assessment.submittedAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              {data.assessment.appointmentDate && (
                <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-green-700" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">Your Appointment</p>
                      <p className="text-lg font-bold text-green-700">
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
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/client/assessment">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 group-hover:bg-primary-700 transition-all flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-700 group-hover:text-white transition-all" />
                </div>
                <h3 className="font-display text-xl text-primary-900">View Assessment</h3>
              </div>
              <p className="text-sm text-ink-600">Review your submitted assessment details</p>
            </motion.div>
          </Link>

          <Link href="/client/messages">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group cursor-pointer relative"
            >
              {data.unreadMessages > 0 && (
                <span className="absolute top-4 right-4 w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {data.unreadMessages}
                </span>
              )}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 group-hover:bg-accent-600 transition-all flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-accent-600 group-hover:text-white transition-all" />
                </div>
                <h3 className="font-display text-xl text-primary-900">Messages</h3>
              </div>
              <p className="text-sm text-ink-600">
                {data.unreadMessages > 0
                  ? `${data.unreadMessages} new message${data.unreadMessages > 1 ? "s" : ""}`
                  : "Communicate with your behaviourist"}
              </p>
            </motion.div>
          </Link>

          <Link href="/client/profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 group-hover:bg-primary-700 transition-all flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-700 group-hover:text-white transition-all" />
                </div>
                <h3 className="font-display text-xl text-primary-900">Profile</h3>
              </div>
              <p className="text-sm text-ink-600">Manage your account settings</p>
            </motion.div>
          </Link>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-primary-50 border-2 border-primary-200 rounded-2xl p-6"
        >
          <h3 className="font-display text-lg text-primary-900 mb-2">Need Help?</h3>
          <p className="text-sm text-ink-600 mb-4">
            If you have any questions or concerns about your assessment or appointment,
            please don't hesitate to message us through the portal.
          </p>
          <Link
            href="/client/messages"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Send a Message
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
