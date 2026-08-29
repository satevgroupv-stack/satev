"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  CupSodaIcon,
  ClockIcon,
  ArrowRightIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { Button } from "../src/components/ui/Button";
import { SmartImage } from "../src/components/common/SmartImage";
import { StatusBadge } from "../src/components/common/StatusBadge";
import { UserGallery } from "../src/components/home/UserGallery";
import { HowItWorks } from "../src/components/home/HowItWorks";
import { useI18n } from "../src/lib/i18n";
import { IMAGES } from "../src/lib/images";
import { MACHINE, DRINKS } from "../src/lib/data";
export default function Landing() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const availableCount = DRINKS.filter((d) => d.inStock).length;
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-container items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <SmartImage
              src={IMAGES.productLogo}
              alt="RevoV — Revolutionized Your Life"
              className="h-16 w-auto object-contain"
            />

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {t("hero_headline")}
            </h1>
            <p className="mt-4 text-lg text-silver/80">{t("hero_sub")}</p>
            <p className="mt-1 text-base text-silver/60">{t("hero_desc")}</p>

            <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
              <Button
                pulse
                className="order-first px-8 py-5 text-lg neon-glow"
                onClick={() =>
                  router.push("/mch_sk_4740ed6ce010137901ba3580ff6cd85e")
                }
              >
                To Order drink
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
              <Button onClick={() => router.push("/verify/" + MACHINE.id)}>
                To experience the next version
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Machine status card */}
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
              }}
              className="glass-card mt-8 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-silver/50">
                  {t("machine")}
                </p>
                <p className="mt-1 text-base font-semibold text-white">
                  {MACHINE.id}
                </p>
                <div className="mt-2">
                  <StatusBadge status={MACHINE.status} />
                </div>
              </div>
              <div className="space-y-2 text-sm text-silver/80">
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-neon" />
                  {lang === "en" ? MACHINE.location_en : MACHINE.location_am}
                </p>
                <p className="flex items-center gap-2">
                  <CupSodaIcon className="h-4 w-4 text-neon" />
                  {availableCount} {t("products_available")}
                </p>
                <p className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-neon" />
                  {t("last_online")}: 2 {t("min_ago")}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative"
          >
            <div className="glass-card overflow-hidden p-3">
              <SmartImage
                src={IMAGES.productImage}
                alt="RevoV autonomous vending machine"
                className="h-[420px] w-full rounded-lg object-cover sm:h-[520px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <HowItWorks />

      {/* Users gallery */}
      <section className="py-12" aria-labelledby="users-title">
        <div className="mx-auto max-w-container px-4 text-center sm:px-6">
          <h2
            id="users-title"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            {t("users_title")}
          </h2>
          <p className="mt-2 text-silver/70">{t("users_sub")}</p>
        </div>
        <div className="mt-8">
          <UserGallery />
        </div>
      </section>
    </PageShell>
  );
}
