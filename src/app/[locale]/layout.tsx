import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Settings } from "@/core/constants/Settings";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`flex ${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey={Settings.THEME}
        >
          <TooltipProvider>
            <NextIntlClientProvider messages={messages}>
              <div className="flex flex-grow">{children}</div>
            </NextIntlClientProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
