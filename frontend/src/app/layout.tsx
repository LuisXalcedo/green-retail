import type { Metadata } from "next";
import { exo_2 } from "@/app/components/fonts";
import "./globals.css";

// 👇 import the providers
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Green Retail",
  description: "Point of Sale by Green Retail",
  keywords: ["Retail", "Point of Sale"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${exo_2.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
