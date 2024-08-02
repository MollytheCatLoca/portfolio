import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BIS Integraciones",
  description: "Potenciamos su negocio con tecnología",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang= "en" className = "dark" >
      <body className="dark" >
        <ThemeProvider>
        { children }
        < Analytics />
        </ThemeProvider>
        </body>
        </html>
    );
}