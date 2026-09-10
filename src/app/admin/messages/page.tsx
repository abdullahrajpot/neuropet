"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/shared";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
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

        // Fetch messages
        const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
        const res = await fetch(`/api/contact?key=${key}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setMessages(data);
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
          <p className="mt-4 text-ink-600">Loading messages...</p>
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
        <h1 className="mt-4 font-display text-3xl text-primary-900">Messages</h1>
        <div className="mt-8 space-y-4">
          {messages.length === 0 ? (
            <p className="text-ink-600">No messages yet</p>
          ) : (
            messages.map((m) => (
              <article
                key={m._id}
                className="rounded-card border border-ink-300/50 bg-white p-6"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <p className="font-medium text-primary-900">{m.subject}</p>
                    <p className="text-sm text-ink-600">
                      {m.name} · {m.email}
                    </p>
                  </div>
                  <time className="text-xs text-ink-600">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="mt-4 text-ink-600">{m.message}</p>
              </article>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
