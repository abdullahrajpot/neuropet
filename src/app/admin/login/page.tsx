"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("neuropet-admin-key", password);
    router.push("/admin/dashboard");
  };

  return (
    <section className="flex min-h-screen items-center bg-primary-100">
      <Container className="max-w-md">
        <div className="rounded-card bg-white p-8 shadow-card">
          <div className="mb-6 flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary-700" strokeWidth={1.5} />
            <span className="font-display text-xl text-primary-900">
              {siteConfig.name} Admin
            </span>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-input border-[1.5px] border-ink-300 px-4 py-3 focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
            />
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
