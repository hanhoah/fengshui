import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { getFengShuiWeisheit } from "@/lib/config";
import Search from "./components/Search";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feng Shui Welt",
  description: "Gleichgewicht und Ruhe: Entdecke die Kraft des Feng Shui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="{inter.className} max-w-screen-2xl">
        <header className="bg-primary p-4 text-secondary">
          <h1 className="text-white">{getFengShuiWeisheit()}</h1>
        </header>
        <div className="mx-auto sticky top-0 z-50 flex flex-col md:flex-row">
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Search placeholder="" />
          </Suspense>
        </div>
        <div className="m-5">{children}</div>
        <footer className="bg-secondary p-4 text-primary">
          <p>
            Kontaktieren Sie uns:{" "}
            <a href="mailto:info@example.com" className="text-accent">
              info@fengshuiwelt.com
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
