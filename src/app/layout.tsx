// src/app/layout.tsx → PHIÊN BẢN CUỐI CÙNG, KHÔNG THỂ SAI ĐƯỢC NỮA!
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import NavbarServer from "@/components/Navbar/NavbarServer";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { FooterSkeleton } from "@/components/Footer/FooterSkeleton";
import { SuccessToast } from "@/components/ui/SuccessToast";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* TRANG USER: có navbar + footer */}
        <div className="flex min-h-screen flex-col">
          <NavbarServer />
          <main className="flex-1">{children}</main>
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
        </div>

        <SuccessToast />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
