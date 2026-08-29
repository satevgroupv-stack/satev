"use client";

import Link from "next/link";
import { LifeBuoy, ShoppingBag } from "lucide-react";

export function ActualChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[70vh] bg-[#101b3d] text-white">
      <header className="border-b border-white/10 bg-[#0a1330]/90 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="font-bold tracking-wide">
            SATEV <span className="font-normal text-[#d9d9d9]">Group</span>
          </Link>
          <Link
            href="/mch_sk_4740ed6ce010137901ba3580ff6cd85e/shop"
            className="inline-flex items-center gap-2 text-sm text-[#d9d9d9] hover:text-[#ff8a2a]"
          >
            <ShoppingBag className="h-4 w-4" /> Order drinks
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-[#d9d9d9]/60">
        SATEV Group PLC · Smart vending
      </footer>
      <a
        href="mailto:support@satev.com"
        className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-[#ff7101] px-4 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,113,1,0.45)] hover:bg-[#ff8524]"
        aria-label="Need Help"
      >
        <LifeBuoy className="h-4 w-4" /> Need Help
      </a>
    </div>
  );
}
