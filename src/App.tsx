"use client";

import React from "react";
import { I18nProvider } from "./lib/i18n";
import { CartProvider } from "./lib/cart";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { SupportButton } from "./components/layout/SupportButton";

interface AppProps {
  children: React.ReactNode;
}

export function App({ children }: AppProps) {
  return (
    <I18nProvider>
      <CartProvider>
        <div className="app-bg flex min-h-screen w-full flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <SupportButton />
        </div>
      </CartProvider>
    </I18nProvider>
  );
}
