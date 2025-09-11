"use client";

import { Rubik, Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

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
      <head>
        {/* required meta (optional) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* self-closing meta is correct in JSX; this meta is optional (not required by AdSense) */}
        <meta name="google-adsense-account" content="ca-pub-5651716709549031" />

        {/* Load AdSense JS safely via next/script */}
        <Script
          id="adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5651716709549031"
          crossOrigin="anonymous"
        />
      </head>

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
