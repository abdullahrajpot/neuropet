"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  MessageSquare,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ 
    pending: 0, 
    reviewed: 0, 
    scheduled: 0, 
    total: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.user.role !== "admin") {
          router.push("/admin/login");
          return;
        }
      } catch (error) {
        router.push("/admin/login");
        return;
      }
      
      // Fetch stats
      fetchStats();
    };

    checkAuth();
  }, [router]);

  const fetchStats = async () => {
    try {
      const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
      const res = await fetch(`/api/appointments?key=${key}`);
      if (res.ok) {
        const appointments = await res.json();
        if (Array.isArray(appointments)) {
          setStats({
            total: appointments.length,
            pending: appointments.filter((a) => a.status === "pending").length,
            reviewed: appointments.filter((a) => a.status === "reviewed").length,
            scheduled: appointments.filter((a) => a.status === "scheduled").length,
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-primary-900 mb-2">Dashboard</h1>
        <p className="text-ink-600">Welcome back! Here's your practice overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-600">Total Assessments</p>
            <FileText className="w-8 h-8 text-primary-700 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-3xl font-bold text-primary-900">{stats.total}</p>
          <p className="text-xs text-ink-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-600">Pending Review</p>
            <Clock className="w-8 h-8 text-yellow-500 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
          <p className="text-xs text-ink-500 mt-1">Awaiting review</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-600">Reviewed</p>
            <CheckCircle className="w-8 h-8 text-blue-500 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-3xl font-bold text-blue-700">{stats.reviewed}</p>
          <p className="text-xs text-ink-500 mt-1">Ready to schedule</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-600">Scheduled</p>
            <Calendar className="w-8 h-8 text-green-500 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-3xl font-bold text-green-700">{stats.scheduled}</p>
          <p className="text-xs text-ink-500 mt-1">Appointments booked</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-xl text-primary-900 mb-4">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/assessments"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-700 transition-all flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-700 group-hover:text-white transition-all" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg text-primary-900">View Assessments</h3>
            </div>
            <p className="text-sm text-ink-600">Review and manage all client assessments</p>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-accent-100 group-hover:bg-accent-600 transition-all flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent-600 group-hover:text-white transition-all" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg text-primary-900">Messages</h3>
            </div>
            <p className="text-sm text-ink-600">Communicate with your clients</p>
          </Link>

          <Link
            href="/admin/setup"
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-700 transition-all flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-700 group-hover:text-white transition-all" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg text-primary-900">Settings</h3>
            </div>
            <p className="text-sm text-ink-600">Configure system and create users</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
