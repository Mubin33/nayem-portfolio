import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nayem Islam | Senior Laravel & Full-Stack Engineer",
  description: "Portfolio of Nayem Islam, a PHP Laravel Specialist. Designing scalable databases, high-performance API structures, real-time WebSocket apps, and premium user interfaces.",
  keywords: ["PHP Developer", "Laravel Developer", "Full-Stack Engineer", "Backend Developer", "Laravel Expert", "SaaS Developer", "Web Developer Bangladesh"],
  authors: [{ name: "Nayem Islam" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-zinc-100 selection:bg-red-500/30 selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
