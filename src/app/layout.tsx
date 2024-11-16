import { Toaster } from "@/components/ui/toaster";
import { Settings } from "@/core/constants/Settings";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`flex ${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey={Settings.THEME}
        >
          <main className="flex flex-grow">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
