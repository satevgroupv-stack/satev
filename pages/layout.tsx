import type { Metadata } from "next";
import { App } from "../src/App";
import "../src/index.css";

// export const metadata: Metadata = {
//   title: "SATEV Group - RevoV Vending Machine",
//   description: "RevoV vending machine ordering experience",
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}