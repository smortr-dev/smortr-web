import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smortr",
  description: "We're Building Smortr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon apple-icon" href="/images/favicon.ico" />

      <body className={`${inter.className} bg-[#FAFAFA] fafafa`}>
        {children}
      </body>
    </html>
  );
}
