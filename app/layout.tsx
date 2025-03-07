import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InstaViewer",
  description: "Instagram Story Viewer. View Instagram stories anonymously.",
  authors: [
    { name: "Tsotne Pharsenadze", url: "https://github.com/TsotnePharsenadze" },
  ],
  creator: "Tsotne Pharsenadze",
  keywords: [
    "Instagram",
    "Story Viewer",
    "Anonymous",
    "Social Media",
    "Iganony",
  ],
  robots: "index, follow",
  applicationName: "InstaViewer",
  generator: "Next.js 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-full bg-gradient-to-br from-purple-100 to-pink-100">
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
