"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface IntlProviderProps {
  locale: string;
  now: Date;
  timeZone: string;
  messages: any;
  formats: any;
  children: ReactNode;
}

export default function IntlProvider({
  locale,
  now,
  timeZone,
  messages,
  formats,
  children,
}: IntlProviderProps) {
  return (
    <NextIntlClientProvider
      // Define non-serializable props here
      defaultTranslationValues={{
        i: (text) => <i>{text}</i>,
      }}
      onError={(error) => console.error(error)}
      getMessageFallback={({ namespace, key }) => `${namespace}.${key}`}
      // Make sure to forward these props to avoid markup mismatches
      locale={locale}
      now={now}
      timeZone={timeZone}
      // Provide as necessary
      messages={messages}
      formats={formats}
    >
      {children}
    </NextIntlClientProvider>
  );
}
