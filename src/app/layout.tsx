import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cormorant_Infant } from "next/font/google";
import "./globals.css";

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atwed.org"),
  title: "AtWed | Coming Soon",
  description: "A platform to teach biblical principles of marriage.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    title: "AtWed | Coming Soon",
    description: "A platform to teach biblical principles of marriage.",
    images: [{ url: "/images/og.png", width: 538, height: 700 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorantInfant.variable} ${cormorantGaramond.variable} antialiased`}
    >
      <body className="font-infant">{children}</body>
    </html>
  );
}
