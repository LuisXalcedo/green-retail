import type { Metadata } from "next";
import { exo_2 } from "@/app/components/fonts";
// import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// 👇 import the providers
import { Providers } from "@/app/providers";

import Header from "@/app/components/header";

export const metadata: Metadata = {
  title: "Green Retail",
  description: "Point of Sale by Green Retail",
  keywords: ["Retail", "Point of Sale"],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${exo_2.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Header />
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
