// src/app/layout.tsx   CHỈ GIỮ NHỮNG THỨ CHUNG CHO TOÀN APP
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
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
        {children}
        <SuccessToast />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
