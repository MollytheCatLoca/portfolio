import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { CardProvider } from "@/context/CardContext"; // Importar el CardProvider

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
      <head>
      <link rel="icon" href = "/BISLogo.svg" type = "image/svg+xml" />
        </head>
        < body className = "dark" >
          <ThemeProvider>
          <CardProvider>{/* Envolver los children con CardProvider */ }
  { children }
  </CardProvider>
    < Analytics />
    </ThemeProvider>
    </body>
    </html>
  );
}
