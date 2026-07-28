"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Mail, PawPrint, LayoutDashboard } from "lucide-react";
import { Container } from "@/components/ui/shared";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [stats, setStats] = useState({ appointments: 0, messages: 0 });

  useEffect(() => {
    const stored = sessionStorage.getItem("neuropet-admin-key");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setKey(stored);

    Promise.all([
      fetch(`/api/appointments?key=${stored}`).then((r) => r.json()),
      fetch(`/api/contact?key=${stored}`).then((r) => r.json()),
    ]).then(([appts, msgs]) => {
      setStats({
        appointments: Array.isArray(appts) ? appts.length : 0,
        messages: Array.isArray(msgs) ? msgs.length : 0,
      });
    });
  }, [router]);

  const links = [
    { href: "/admin/appointments", label: "Appointments", icon: Calendar, count: stats.appointments },
    { href: "/admin/messages", label: "Messages", icon: Mail, count: stats.messages },
    { href: "/admin/pets", label: "Pets", icon: PawPrint, count: "—" },
    { href: "/admin/blog", label: "Blog", icon: LayoutDashboard, count: "—" },
  ];

  return (
    <section className="min-h-screen bg-cream pt-28 pb-16">
      <Container>
        <h1 className="font-display text-3xl text-primary-900">Dashboard</h1>
        <p className="mt-2 text-ink-600">Manage bookings, messages, and content.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ href, label, icon: Icon, count }) => (
            <Link
              key={href}
              href={href}
              className="rounded-card border border-ink-300/50 bg-white p-6 transition-shadow hover:shadow-card"
            >
              <Icon className="h-6 w-6 text-primary-700" strokeWidth={1.5} />
              <p className="mt-4 font-display text-xl text-primary-900">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-accent-600">{count}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
