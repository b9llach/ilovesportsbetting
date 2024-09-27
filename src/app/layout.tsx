import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StayStaked",
  description: "Stake on players, win real money. Compete head to head in a variety of your favorite games with a 0% fee!",
  icons: {
    icon: "https://raw.githubusercontent.com/6mansNA/staystaked/refs/heads/main/staystaked.ico",
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
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
