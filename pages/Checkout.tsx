"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlusIcon,
  MinusIcon,
  Trash2Icon,
  ArrowRightIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { Button } from "../src/components/ui/Button";
import { SmartImage } from "../src/components/common/SmartImage";
import { useI18n } from "../src/lib/i18n";
import { useCart } from "../src/lib/cart";
import { MACHINE } from "../src/lib/data";
export default function Checkout() {
  const { t, lang } = useI18n();
  const router = useRouter();
    const params = useParams<{ machineId: string }>();
  const machineId = params?.machineId ?? MACHINE.id;
  const {
    lines,
    add,
    decrement,
    removeLine,
    clear,
    total,
    typeCount,
    totalQty,
  } = useCart();
  const id = machineId ?? MACHINE.id;
  if (lines.length === 0) {
    return (
      <PageShell>
        <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <ShoppingCartIcon className="h-14 w-14 text-silver/40" />
          <p className="mt-4 text-lg text-silver/80">{t("empty_cart")}</p>
          <Link href={"/select/" + id} className="mt-6">
            <Button>{t("back_to_menu")}</Button>
          </Link>
        </section>
      </PageShell>
    );
  }
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-white">
          {t("review_your_order")}
        </h1>
        <p className="mt-1 text-sm text-silver/70">
          {t("machine")}: {id} ·{" "}
          {lang === "en" ? MACHINE.location_en : MACHINE.location_am}
        </p>

        <div className="mt-6 space-y-3">
          {lines.map((line) => {
            const name =
              lang === "en" ? line.drink.name_en : line.drink.name_am;
            return (
              <motion.div
                key={line.drink.id}
                layout
                className="glass-card flex items-center gap-4 p-3 sm:p-4"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-[rgba(217,217,217,0.15)] bg-white/5">
                  <SmartImage
                    src={line.drink.image}
                    alt={name}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{name}</p>
                  <p className="text-sm text-silver/60">
                    {line.drink.volume} · {line.drink.price} ETB
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[rgba(255,113,1,0.4)] p-1">
                  <button
                    type="button"
                    onClick={() => decrement(line.drink.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-[rgba(217,217,217,0.1)]"
                    aria-label={`Decrease ${name}`}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-semibold text-white">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(line.drink)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-[rgba(217,217,217,0.1)]"
                    aria-label={`Increase ${name}`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-20 text-right font-semibold text-white">
                  {line.qty * line.drink.price} ETB
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(line.drink.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-silver/60 hover:bg-[rgba(255,107,107,0.12)] hover:text-[#FF6B6B]"
                  aria-label={`Remove ${name}`}
                >
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="glass-card mt-6 p-5">
          <div className="flex items-center justify-between text-sm text-silver/80">
            <span>
              {typeCount} {t("drink_types")} · {totalQty} {t("items")}
            </span>
            <span>{t("subtotal")}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[rgba(217,217,217,0.12)] pt-3">
            <span className="text-lg font-semibold text-white">
              {t("total")}
            </span>
            <span className="text-xl font-bold text-neon">{total} ETB</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button variant="secondary" onClick={clear}>
            <Trash2Icon className="h-4 w-4" />
            {t("clear_cart")}
          </Button>
          <Button pulse onClick={() => router.push("/payment/" + id)}>
            {t("proceed_payment")}
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
