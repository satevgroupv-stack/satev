import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SATEV Smart Vending",
  description: "Secure smart vending machine powered by SATEV System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0f172a] text-[#D9D9D9] antialiased">
        {children}
      </body>
    </html>
  );
}