// src/app/(admin)/admin/layout.tsx
import { AdminSidebar } from "@/components/admin/layout/Sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { Toaster } from "@/components/ui/sonner";
export const dynamic = "force-dynamic";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
