"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  PawPrint,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/assessments", label: "Assessments", icon: FileText },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/pets", label: "Pets", icon: PawPrint },
  { href: "/admin/setup", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-700 text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-primary-900 text-white z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-800">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-600 flex items-center justify-center">
                <PawPrint className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display text-xl">NeuroPet</h1>
                <p className="text-xs text-primary-300">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? "bg-accent-600 text-white shadow-lg"
                      : "text-primary-200 hover:bg-primary-800 hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-primary-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-red-600 hover:text-white transition-all"
            >
              <LogOut className="w-5 h-5" strokeWidth={2} />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
