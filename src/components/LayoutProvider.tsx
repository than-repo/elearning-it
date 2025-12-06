// src/components/LayoutProvider.tsx
"use client";

import { usePathname } from "next/navigation";
import NavbarServer from "@/components/Navbar/NavbarServer";
import { Footer } from "@/components/Footer";
import { FooterSkeleton } from "@/components/Footer/FooterSkeleton";
import { Suspense } from "react";

export function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Nếu là trang admin → chỉ render children (admin tự có layout riêng)
  if (isAdmin) {
    return <>{children}</>;
  }

  // Nếu là trang user thường → render navbar + footer
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarServer />
      <main className="flex-1">{children}</main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
