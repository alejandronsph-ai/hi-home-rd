import { assetPath } from "@/lib/assets";
import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Syne, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
const display = Syne({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH ? "https://alejandronsph-ai.github.io" : "https://hihomerd.com"),
  title: "HI HOME RD | Tu nuevo hogar en el Caribe",
  description:
    "Compra, venta y administración de propiedades en República Dominicana. Conoce el catálogo de HI HOME RD.",
  openGraph: {
    title: "HI HOME RD | Tu nuevo hogar en el Caribe",
    description:
      "Compra, venta y administración de propiedades en República Dominicana.",
    locale: "es_DO",
    type: "website",
    images: [
      {
        url: assetPath("/images/villa.webp"),
        width: 1024,
        height: 681,
        alt: "Propiedad de cinco habitaciones publicada por HI HOME RD",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: !process.env.NEXT_PUBLIC_BASE_PATH, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#101416",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body style={{ "--destination-backdrop": `url("${assetPath("/images/cap-cana.webp")}")` } as CSSProperties}>{children}</body>
    </html>
  );
}
