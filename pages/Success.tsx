"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckIcon,
  DownloadIcon,
  StarIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  HomeIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { Button } from "../src/components/ui/Button";
import { useI18n } from "../src/lib/i18n";
import { useCart } from "../src/lib/cart";
import { MACHINE } from "../src/lib/data";
export default function Success() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const { lines, total, clear } = useCart();
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  // Fall back to the spec's sample order if the cart was already cleared.
  const displayLines =
    lines.length > 0
      ? lines.map((l) => ({
          name: lang === "en" ? l.drink.name_en : l.drink.name_am,
          volume: l.drink.volume,
          qty: l.qty,
          amount: l.qty * l.drink.price,
        }))
      : [
          {
            name: lang === "en" ? "SinQ" : "ስንቅ",
            volume: "300ml",
            qty: 3,
            amount: 210,
          },
        ];

  const displayTotal = lines.length > 0 ? total : 210;
  const handleReturn = (to: string) => {
    clear();
    router.push(to);
  };
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* Header + animated check */}
        <div className="text-center">
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 14,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neon neon-glow"
          >
            <motion.span
              initial={{
                scale: 0,
                rotate: -20,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.25,
                type: "spring",
                stiffness: 260,
              }}
            >
              <CheckIcon className="h-11 w-11 text-white" strokeWidth={3} />
            </motion.span>
          </motion.div>
          <h1 className="mt-5 text-3xl font-extrabold text-white">
            {t("payment_successful")}
          </h1>
          <p className="mt-2 text-silver/80">{t("thank_you")}</p>
        </div>

        {/* Receipt */}
        <div className="glass-card mt-8 p-6">
          <dl className="grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-silver/60">{t("receipt_no")}</dt>
              <dd className="font-semibold text-white">SATEV-2026-8764</dd>
            </div>
            <div>
              <dt className="text-silver/60">{t("transaction_id")}</dt>
              <dd className="font-semibold text-white">TXN-78478783</dd>
            </div>
            <div>
              <dt className="text-silver/60">{t("machine")}</dt>
              <dd className="font-semibold text-white">{MACHINE.id}</dd>
            </div>
            <div>
              <dt className="text-silver/60">{t("date")}</dt>
              <dd className="font-semibold text-white">
                Jul 16, 2026 · 11:01 AM
              </dd>
            </div>
          </dl>

          <div className="mt-5 border-t border-[rgba(217,217,217,0.12)] pt-4">
            <p className="mb-2 text-sm font-medium text-silver/70">
              {t("products")}
            </p>
            <ul className="space-y-1.5 text-sm">
              {displayLines.map((l, i) => (
                <li key={i} className="flex justify-between text-white">
                  <span>
                    {l.name} {l.volume} × {l.qty}
                  </span>
                  <span>{l.amount} ETB</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[rgba(217,217,217,0.12)] pt-4">
            <span className="font-semibold text-white">{t("total")}</span>
            <span className="text-lg font-bold text-neon">
              {displayTotal} ETB
            </span>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-neon hover:underline"
          >
            <DownloadIcon className="h-4 w-4" />
            {t("download_receipt")}
          </button>
        </div>

        {/* Dispensing status — Completed 100% */}
        <div className="glass-card mt-4 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-white">
              {t("dispensing_status")}
            </span>
            <span className="font-semibold text-[#4ADE80]">100%</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[rgba(217,217,217,0.15)]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-[#4ADE80]"
            />
          </div>
          <p className="mt-2 text-sm text-[#4ADE80]">
            {t("dispensing_completed")}
          </p>
        </div>

        {/* Rating */}
        <div className="glass-card mt-4 p-5 text-center">
          <p className="text-sm font-medium text-white">
            {t("rate_experience")}
          </p>
          <div className="mt-3 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setRating(n);
                  setRated(true);
                }}
                aria-label={`${n} stars`}
                className="p-1"
              >
                <StarIcon
                  className={`h-8 w-8 transition-colors ${n <= rating ? "fill-neon text-neon" : "text-silver/40"}`}
                />
              </button>
            ))}
          </div>
          {rated && (
            <p className="mt-2 text-sm text-[#4ADE80]">
              {t("thanks_feedback")}
            </p>
          )}
          <a
            href="https://t.me/Revov_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-silver/70 hover:text-white"
          >
            <AlertTriangleIcon className="h-4 w-4 text-neon" />
            {t("report_problem")}
          </a>
        </div>

        {/* Two buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            pulse
            fullWidth
            onClick={() => handleReturn("/select/" + MACHINE.id)}
          >
            <RefreshCwIcon className="h-4 w-4" />
            {t("buy_again")}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => handleReturn("/")}
          >
            <HomeIcon className="h-4 w-4" />
            {t("return_home")}
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
