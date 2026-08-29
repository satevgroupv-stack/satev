"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  WalletIcon,
  LandmarkIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  Loader2Icon,
  XCircleIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { Button } from "../src/components/ui/Button";
import { SmartImage } from "../src/components/common/SmartImage";
import { PaymentCategory } from "../src/components/order/PaymentCategory";
import { useI18n } from "../src/lib/i18n";
import { useCart } from "../src/lib/cart";
import { MACHINE, WALLETS, BANKS, CARDS } from "../src/lib/data";
import { IMAGES } from "../src/lib/images";
type PayState = "idle" | "processing" | "failed";
export default function Payment() {
  const { t } = useI18n();
  const router = useRouter();
    const params = useParams<{ machineId: string }>();
  const machineId = params?.machineId ?? MACHINE.id;
  const { total, typeCount, totalQty, lines } = useCart();
  const id = machineId ?? MACHINE.id;
  const [openCat, setOpenCat] = useState<string>("wallets");
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<PayState>("idle");
  if (lines.length === 0) {
    return (
      <PageShell>
        <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <p className="text-lg text-silver/80">{t("empty_cart")}</p>
          <Link href={"/select/" + id} className="mt-6">
            <Button>{t("back_to_menu")}</Button>
          </Link>
        </section>
      </PageShell>
    );
  }
  const handlePay = () => {
    if (!selected) return;
    setState("processing");
    setTimeout(() => {
      // Demo flow: always succeed. (Failure path preserved for real integration.)
      router.push("/success/TXN-78478783");
    }, 2200);
  };
  const toggleCat = (cat: string) =>
    setOpenCat((prev) => (prev === cat ? "" : cat));
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-silver/70 hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t("review_your_order")}
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {t("secure_payment")}
          </h1>
          <span className="flex items-center gap-2 rounded-full border border-[rgba(217,217,217,0.15)] px-3 py-1.5 text-xs text-silver/80">
            <SmartImage
              src={IMAGES.santimpay}
              alt="SantimPay"
              className="h-4 w-4 rounded object-contain"
            />

            {t("powered_by_santimpay")}
          </span>
        </div>

        <div className="glass-card p-5">
          {/* Order summary */}
          <div className="flex items-center justify-between border-b border-[rgba(217,217,217,0.12)] pb-4 text-sm">
            <div className="text-silver/80">
              <p>
                {t("machine")}: <span className="text-white">{id}</span>
              </p>
              <p>
                {t("order")}: {typeCount} {t("drink_types")} · {totalQty}{" "}
                {t("items")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-silver/60">{t("total")}</p>
              <p className="text-xl font-bold text-neon">{total} ETB</p>
            </div>
          </div>

          {state === "processing" ? (
            <div className="flex flex-col items-center py-10">
              <Loader2Icon className="h-12 w-12 animate-spin text-neon" />
              <p className="mt-4 text-lg font-medium text-white">
                {t("processing_payment")}
              </p>
            </div>
          ) : state === "failed" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <XCircleIcon className="h-12 w-12 text-[#FF6B6B]" />
              <p className="mt-4 text-lg font-semibold text-white">
                {t("payment_failed")}
              </p>
              <div className="mt-6 flex gap-3">
                <Button onClick={() => setState("idle")}>
                  {t("retry_payment")}
                </Button>
                <a
                  href="https://t.me/Revov_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary">{t("telegram_support")}</Button>
                </a>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4 mt-4 text-sm font-medium text-silver/80">
                {t("select_payment_method")}
              </p>
              <div className="space-y-3">
                <PaymentCategory
                  title={t("wallets_title")}
                  Icon={WalletIcon}
                  methods={WALLETS}
                  open={openCat === "wallets"}
                  onToggle={() => toggleCat("wallets")}
                  selected={selected}
                  onSelect={setSelected}
                />

                <PaymentCategory
                  title={t("banks_title")}
                  Icon={LandmarkIcon}
                  methods={BANKS}
                  open={openCat === "banks"}
                  onToggle={() => toggleCat("banks")}
                  selected={selected}
                  onSelect={setSelected}
                />

                <PaymentCategory
                  title={t("cards_title")}
                  description={t("cards_desc")}
                  Icon={CreditCardIcon}
                  methods={CARDS}
                  open={openCat === "cards"}
                  onToggle={() => toggleCat("cards")}
                  selected={selected}
                  onSelect={setSelected}
                />
              </div>

              <div className="mt-6">
                <Button
                  pulse
                  fullWidth
                  disabled={!selected}
                  onClick={handlePay}
                >
                  {t("pay")} {total} ETB
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-silver/60">
                <ShieldCheckIcon className="h-4 w-4 text-[#4ADE80]" />
                {t("secured_by")} · {t("encrypted_note")}
              </div>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
