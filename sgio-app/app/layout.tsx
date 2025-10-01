import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SGIO - Sistema de Gestión Integral de Obras",
  description: "Plataforma para gestión de construcción de viviendas unifamiliares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${openSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
