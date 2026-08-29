"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TargetIcon,
  EyeIcon,
  CheckCircle2Icon,
  BuildingIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { GlassCard } from "../src/components/ui/GlassCard";
import { SmartImage } from "../src/components/common/SmartImage";
import { useI18n } from "../src/lib/i18n";
import { IMAGES } from "../src/lib/images";
export default function About() {
  const { t } = useI18n();
  const objectives = ["obj_1", "obj_2", "obj_3", "obj_4", "obj_5"];
  return (
    <PageShell>
      <section className="mx-auto max-w-container px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <SmartImage
            src={IMAGES.companyLogo}
            alt="SATEV Group logo"
            className="h-16 w-16 rounded-lg object-contain"
          />

          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            {t("about_title")}
          </h1>
          <p className="mt-2 text-silver/70">{t("tagline_company")}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-neon" />
              <h2 className="text-xl font-semibold text-white">
                {t("company_overview")}
              </h2>
            </div>
            <p className="leading-relaxed text-silver/80">
              {t("company_overview_body")}
            </p>
          </GlassCard>

          <GlassCard className="overflow-hidden p-0">
            <SmartImage
              src={IMAGES.productImage}
              alt="RevoV machine"
              className="h-full min-h-[220px] w-full object-cover"
            />
          </GlassCard>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="mb-3 flex items-center gap-2">
              <TargetIcon className="h-5 w-5 text-neon" />
              <h2 className="text-xl font-semibold text-white">
                {t("mission")}
              </h2>
            </div>
            <p className="leading-relaxed text-silver/80">
              {t("mission_body")}
            </p>
          </GlassCard>
          <GlassCard>
            <div className="mb-3 flex items-center gap-2">
              <EyeIcon className="h-5 w-5 text-neon" />
              <h2 className="text-xl font-semibold text-white">
                {t("vision")}
              </h2>
            </div>
            <p className="leading-relaxed text-silver/80">{t("vision_body")}</p>
          </GlassCard>
        </div>

        <GlassCard className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {t("objectives")}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {objectives.map((key, i) => (
              <motion.li
                key={key}
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.06,
                }}
                className="flex items-start gap-3 text-silver/80"
              >
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon" />
                <span>{t(key)}</span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {t("the_product")}
          </h2>
          <GlassCard className="flex flex-col items-center gap-6 sm:flex-row">
            <SmartImage
              src={IMAGES.productLogo}
              alt="RevoV"
              className="h-16 w-auto object-contain"
            />

            <p className="text-silver/80">
              RevoV — {t("hero_desc")} 24/7 · IoT-monitored · cashless ·
              modular.
            </p>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
