import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  keywords: process.env.APP_KEYWORDS,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "img/logo.svg",
        href: "img/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "img/logo.svg",
        href: "img/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
