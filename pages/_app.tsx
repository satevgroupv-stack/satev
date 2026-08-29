import type { ReactNode } from "react";
import { App } from "../src/App";
import "../src/index.css";

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: Record<string, any>;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}