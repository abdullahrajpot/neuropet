"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  Check,
  Clock,
  Archive,
  ChevronLeft,
} from "lucide-react";
import { Container } from "@/components/ui/shared";
import { motion } from "framer-motion";

interface Assessment {
  _id: string;
  ownerName: string;
  email: string;
  phone: string;
  petName: string;
  species: string;
  primaryConcern: string;
  status: string;
  createdAt: string;
  appointmentDate?: string;
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  reviewed: "bg-blue-100 text-blue-800 border-blue-200",
  scheduled: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
  archived: "bg-slate-100 text-slate-800 border-slate-200",
};

const STATUS_ICONS = {
  pending: Clock,
  reviewed: Eye,
  scheduled: Calendar,
  completed: Check,
  archived: Archive,
};

export default function AdminAssessmentsPage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const stored = sessionStorage.getItem("neuropet-admin-key");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setKey(stored);
    fetchAssessments(stored);
  }, [router]);

  const fetchAssessments = async (adminKey: string) => {
    try {
      const res = await fetch(`/api/admin/assessments?key=${adminKey}`);
      if (res.ok) {
        const data = await res.json();
        setAssessments(data);
      }
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || assessment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: assessments.length,
    pending: assessments.filter((a) => a.status === "pending").length,
    reviewed: assessments.filter((a) => a.status === "reviewed").length,
    scheduled: assessments.filter((a) => a.status === "scheduled").length,
    completed: assessments.filter((a) => a.status === "completed").length,
  };

  return (
    <section className="min-h-screen bg-cream pt-24 pb-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-accent-600 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-display text-4xl text-primary-900">
            Assessment Management
          </h1>
          <p className="mt-2 text-ink-600">
            Review and manage client behaviour assessments
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
              <input
                type="text"
                placeholder="Search by name, pet, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status ({statusCounts.all})</option>
                <option value="pending">Pending ({statusCounts.pending})</option>
                <option value="reviewed">Reviewed ({statusCounts.reviewed})</option>
                <option value="scheduled">
                  Scheduled ({statusCounts.scheduled})
                </option>
                <option value="completed">Completed ({statusCounts.completed})</option>
              </select>
            </div>
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "pending", label: "Pending" },
              { key: "reviewed", label: "Reviewed" },
              { key: "scheduled", label: "Scheduled" },
              { key: "completed", label: "Completed" },
            ].map((status) => (
              <button
                key={status.key}
                onClick={() => setFilterStatus(status.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterStatus === status.key
                    ? "bg-primary-700 text-white"
                    : "bg-primary-100 text-primary-900 hover:bg-primary-200"
                }`}
              >
                {status.label} ({statusCounts[status.key as keyof typeof statusCounts]})
              </button>
            ))}
          </div>
        </div>

        {/* Assessments List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-ink-600">Loading assessments...</p>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-ink-600">No assessments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssessments.map((assessment, index) => {
              const StatusIcon = STATUS_ICONS[assessment.status as keyof typeof STATUS_ICONS] || Clock;
              
              return (
                <motion.div
                  key={assessment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 font-bold text-lg">
                            {assessment.petName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl text-primary-900 mb-1">
                            {assessment.ownerName} — {assessment.petName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-600">
                            <span>{assessment.species}</span>
                            <span>•</span>
                            <span>{assessment.email}</span>
                            <span>•</span>
                            <span>{assessment.phone}</span>
                          </div>
                          <p className="mt-2 text-sm text-accent-600 font-semibold">
                            {assessment.primaryConcern}
                          </p>
                          <p className="text-xs text-ink-500 mt-1">
                            Submitted:{" "}
                            {new Date(assessment.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
                          STATUS_COLORS[assessment.status as keyof typeof STATUS_COLORS]
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {assessment.status.charAt(0).toUpperCase() +
                          assessment.status.slice(1)}
                      </span>

                      <Link
                        href={`/admin/assessments/${assessment._id}`}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>

                      <Link
                        href={`/admin/messages/${assessment._id}`}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
