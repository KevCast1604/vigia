import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="es" className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-800 m-0 p-0 font-sans">
        {children}
      </body>
    </html>
  );
}
