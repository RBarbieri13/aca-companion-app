import type { Metadata } from "next";
import { Fraunces, Inter, Lora } from "next/font/google";
import "./globals.css";
import { Sidebar, MobileHeader } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { PrivacyBanner } from "@/components/privacy-banner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACA Companion - The Laundry List Workbook",
  description:
    "A study companion for ACA groups working through The Laundry List Workbook.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden pb-20 md:pb-0">
            <MobileHeader />
            <PrivacyBanner />
            <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12">
              {children}
            </div>
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
