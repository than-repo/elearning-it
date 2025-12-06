// src\app\(user)\layout.tsx
export const dynamic = "force-dynamic";
import NavbarServer from "@/components/Navbar/NavbarServer";
import { Footer } from "@/components/Footer";
import { FooterSkeleton } from "@/components/Footer/FooterSkeleton";
import { Suspense } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
