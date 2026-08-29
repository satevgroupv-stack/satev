"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCartIcon, ArrowRightIcon } from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { DrinkRow } from "../src/components/order/DrinkRow";
import { Button } from "../src/components/ui/Button";
import { SmartImage } from "../src/components/common/SmartImage";
import { useI18n } from "../src/lib/i18n";
import { useCart } from "../src/lib/cart";
import { DRINKS, MACHINE } from "../src/lib/data";
import { IMAGES } from "../src/lib/images";
export default function Select() {
  const { t, lang } = useI18n();
  const router = useRouter();
    const params = useParams<{ machineId: string }>();
  const machineId = params?.machineId ?? MACHINE.id;
  const { typeCount, totalQty, total } = useCart();
  const id = machineId ?? MACHINE.id;
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 pb-40 pt-8 sm:px-6">
        <div className="glass-card mb-6 flex items-center gap-4 p-4">
          <SmartImage
            src={IMAGES.machinePhoto}
            alt="RevoV machine"
            className="h-16 w-16 rounded-lg object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold text-white">
              {t("select_your_drink")}
            </h1>
            <p className="text-sm text-silver/70">
              {id} · {lang === "en" ? MACHINE.location_en : MACHINE.location_am}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {DRINKS.map((drink) => (
            <DrinkRow key={drink.id} drink={drink} />
          ))}
        </div>
      </section>

      {/* Sticky Review Order summary */}
      <AnimatePresence>
        {typeCount > 0 && (
          <motion.div
            initial={{
              y: 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 80,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(217,217,217,0.15)] bg-navy/95 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCartIcon className="h-7 w-7 text-neon" />
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon px-1 text-xs font-bold text-white">
                    {totalQty}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-white">
                    {typeCount} {t("drink_types")} · {totalQty} {t("items")}
                  </p>
                  <p className="text-silver/70">
                    {t("total")}:{" "}
                    <span className="font-semibold text-neon">{total} ETB</span>
                  </p>
                </div>
              </div>
              <Button onClick={() => router.push("/checkout/" + id)}>
                <span className="hidden sm:inline">
                  {t("proceed_checkout")}
                </span>
                <span className="sm:hidden">{t("continue")}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
