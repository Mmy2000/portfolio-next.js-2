import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ui/ThemeProvider";

// Display + body — Plus Jakarta Sans: editorial, geometric, versatile
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body text — Outfit: clean, modern, highly legible at all sizes
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Mono — Geist Mono: Vercel's premium developer monospace
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mahmoud Yousef — Full Stack Developer",
  description:
    "Full Stack Developer (Django & React) based in Cairo, Egypt. CS graduate from Zagazig University. Building scalable web apps at Hinet Soft & teaching Python at NTI.",
  keywords: ["Full Stack Developer", "Django", "React", "Next.js", "Python", "Mahmoud Yousef"],
  authors: [{ name: "Mahmoud Yousef" }],
  creator: "Mahmoud Yousef",
  openGraph: {
    type: "website", locale: "en_US",
    url: "https://mahmoudyousef.dev",
    title: "Mahmoud Yousef — Full Stack Developer",
    description: "Full Stack Developer — Django · React · Next.js · DRF",
    siteName: "Mahmoud Yousef",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Yousef — Full Stack Developer",
    description: "Full Stack Developer — Django · React · Next.js · DRF",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${outfit.variable} ${geistMono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
