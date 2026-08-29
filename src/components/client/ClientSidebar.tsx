"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  User,
  LogOut,
  Menu,
  X,
  PawPrint,
  Bell,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/assessment", label: "My Assessment", icon: FileText },
  { href: "/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/client/profile", label: "Profile", icon: User },
  { href: "/client/settings", label: "Settings", icon: User },
];

export function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/client/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-accent-600 text-white shadow-lg"
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
          fixed top-0 left-0 h-full w-64 bg-white border-r border-primary-100 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          shadow-sm
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-100">
            <Link href="/client/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-xl text-primary-900">NeuroPet</h1>
                <p className="text-xs text-ink-600">Client Portal</p>
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
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                    ${isActive
                      ? "bg-primary-700 text-white shadow-md"
                      : "text-ink-700 hover:bg-primary-50 hover:text-primary-900"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "" : "text-ink-500 group-hover:text-primary-700"}`} strokeWidth={2} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-accent-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Help Section */}
          <div className="p-4 border-t border-primary-100">
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-primary-700" />
                <p className="text-xs font-semibold text-primary-900">Need Help?</p>
              </div>
              <p className="text-xs text-ink-600 mb-3">
                Contact your behaviourist through Messages
              </p>
              <Link
                href="/client/messages"
                className="text-xs text-primary-700 hover:text-primary-900 font-semibold flex items-center gap-1"
              >
                Send Message →
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-ink-700 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all"
            >
              <LogOut className="w-5 h-5" strokeWidth={2} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
