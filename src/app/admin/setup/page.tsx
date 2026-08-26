"use client";

import { useState } from "react";
import { Container } from "@/components/ui/shared";
import { UserPlus, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminSetupPage() {
  const [formData, setFormData] = useState({
    email: "admin@neuropet.com",
    password: "",
    confirmPassword: "",
    name: "Admin User",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Key": "create-admin-secret-key-2024",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: "admin",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ email: "", password: "", confirmPassword: "", name: "" });
      } else {
        setError(data.error || "Failed to create admin user");
      }
    } catch (err) {
      setError("Network error. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center p-4">
        <Container className="max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
            </div>
            <h1 className="font-display text-3xl text-primary-900 mb-4">
              Admin User Created!
            </h1>
            <p className="text-ink-600 mb-8">
              Your admin account has been created successfully. You can now login to the admin portal.
            </p>
            <a
              href="/admin/login"
              className="inline-block px-8 py-3 rounded-full bg-primary-700 text-white font-bold hover:bg-primary-800 transition-all"
            >
              Go to Admin Login
            </a>
            <p className="mt-6 text-sm text-ink-500">
              You can close this page or bookmark the login URL for future access.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <Container className="max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary-700" />
            </div>
            <h1 className="font-display text-3xl text-primary-900 mb-2">
              Create Admin User
            </h1>
            <p className="text-sm text-ink-600">
              One-time setup to create your first admin account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Admin Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                placeholder="Admin User"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                placeholder="admin@neuropet.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-ink-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-primary-700 text-white font-bold hover:bg-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Admin Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-primary-100">
            <p className="text-xs text-ink-600 text-center">
              This page creates an admin user using the API.
              <br />
              Once created, you can login at{" "}
              <a href="/admin/login" className="text-primary-700 hover:underline">
                /admin/login
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-primary-100 hover:text-white transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </Container>
    </section>
  );
}
