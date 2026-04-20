import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clivv - Supercharge Your Secrets",
  description: "Clivv combines military-grade encryption with a seamless user experience. Manage, share, and protect your digital identity across all platforms effortlessly.",
  icons: {
    icon: "/lock.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark antialiased`}>
      <body className="bg-background-vault text-text-vault">
        {children}
      </body>
    </html>
  );
}
