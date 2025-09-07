import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Batukaru Yurt — Wellness Sanctuary in Bali",
  description: "Investor overview for an eco-conscious yurt retreat on Mount Batukaru.",
  metadataBase: new URL("https://batukaruyurt.com"),
  openGraph: {
    title: "Batukaru Yurt — Wellness Sanctuary in Bali",
    description:
      "Investor overview for an eco-conscious yurt retreat on Mount Batukaru.",
    type: "website",
    url: "https://batukaruyurt.com",
  },
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
        <Header />
        {children}
      </body>
    </html>
  );
}
