import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: {
    default: "Gautham P Kini | Cybersecurity Portfolio",
    template: "%s | Gautham P Kini",
  },
  description: "Portfolio of Gautham P Kini — cybersecurity, application security and networking projects.",
  authors: [{ name: "Gautham P Kini" }],
};

export const viewport: Viewport = {
  themeColor: "#0f0f23",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
