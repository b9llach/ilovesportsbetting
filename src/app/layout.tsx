import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Navbar from "@/components/Navbar";

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
  title: "I <3 SB",
  description: "Stake on players, win real money. Compete head to head in a variety of your favorite games with a 0% fee!",
  icons: {
    icon: "/imgs/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="transition-all duration-300 ease-in-out">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}