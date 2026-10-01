import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIGIA - Plataforma de Inteligencia Comunitaria y Escudo Antiextorsión",
  description: "Plataforma de consulta oficial, verificación comunitaria y reporte anónimo de extorsión en Lima Metropolitana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full flex flex-col bg-slate-100 text-slate-800 m-0 p-0 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
