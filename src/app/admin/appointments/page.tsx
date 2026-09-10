"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/shared";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  service: string;
  petName: string;
  status: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // Check authentication
        const authRes = await fetch("/api/auth/me");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }
        const authData = await authRes.json();
        if (authData.user.role !== "admin") {
          router.push("/admin/login");
          return;
        }

        // Fetch appointments
        const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
        const res = await fetch(`/api/appointments?key=${key}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setAppointments(data);
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-16">
      <Container>
        <Link href="/admin/dashboard" className="text-sm text-primary-700 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl text-primary-900">Appointments</h1>
        <div className="mt-8 overflow-x-auto rounded-card bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-300 bg-primary-100">
              <tr>
                <th className="p-4 font-semibold">Client</th>
                <th className="p-4 font-semibold">Pet</th>
                <th className="p-4 font-semibold">Service</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-600">
                    No appointments yet
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a._id} className="border-b border-ink-300/50">
                    <td className="p-4">
                      <p className="font-medium">{a.name}</p>
                      <p className="text-ink-600">{a.email}</p>
                    </td>
                    <td className="p-4">{a.petName}</td>
                    <td className="p-4">{a.service}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4 text-ink-600">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
