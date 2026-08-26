import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
