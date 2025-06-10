"use client";
import { Rubik, Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";
import "./globals.css"; // Import your global CSS file
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${rubik.variable} ${openSans.variable}`}>
      <body className="bg-light font-body">
        <SessionProvider>
          <Navbar />
          <main className="pt-20 min-h-screen">{children}</main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
