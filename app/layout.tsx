import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

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
      <body className="{inter.className}">
        <header className="bg-primary p-4 text-secondary">
          <h1>Willkommen auf meiner Feng Shui Website!</h1>
        </header>
        <Navbar />
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
