"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2Icon,
  MapPinIcon,
  CupSodaIcon,
  Loader2Icon,
  ArrowRightIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { Button } from "../src/components/ui/Button";
import { SmartImage } from "../src/components/common/SmartImage";
import { useI18n } from "../src/lib/i18n";
import { IMAGES } from "../src/lib/images";
import { MACHINE, DRINKS } from "../src/lib/data";
export default function Verify() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const params = useParams<{ machineId: string }>();
  const machineId = params?.machineId ?? MACHINE.id;
  const [verifying, setVerifying] = useState(true);
  const available = DRINKS.filter((d) => d.inStock).length;
  useEffect(() => {
    const timer = setTimeout(() => setVerifying(false), 1600);
    return () => clearTimeout(timer);
  }, []);
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-12 sm:px-6">
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
            duration: 0.4,
          }}
          className="glass-card w-full overflow-hidden p-0"
        >
          <SmartImage
            src={IMAGES.machinePhoto}
            alt="RevoV vending machine"
            className="h-52 w-full object-cover"
          />

          <div className="p-6 text-center">
            {verifying ? (
              <div className="flex flex-col items-center py-6">
                <Loader2Icon className="h-10 w-10 animate-spin text-neon" />
                <p className="mt-4 text-lg font-medium text-white">
                  {t("verifying")}
                </p>
              </div>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(74,222,128,0.12)]">
                  <CheckCircle2Icon className="h-9 w-9 text-[#4ADE80]" />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-white">
                  {t("machine_ready")}
                </h1>
                <p className="mt-2 text-silver/80">
                  <span className="font-semibold text-white">
                    {machineId ?? MACHINE.id}
                  </span>{" "}
                  {t("ready_to_serve")}
                </p>

                <div className="mt-6 space-y-2 rounded-lg border border-[rgba(217,217,217,0.12)] bg-[rgba(217,217,217,0.04)] p-4 text-left text-sm text-silver/80">
                  <p className="flex items-center gap-2">
                    <CupSodaIcon className="h-4 w-4 text-neon" />
                    {available} {t("drinks_available_n")}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-neon" />
                    {lang === "en" ? MACHINE.location_en : MACHINE.location_am}
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    pulse
                    fullWidth
                    onClick={() =>
                      router.push("/select/" + (machineId ?? MACHINE.id))
                    }
                  >
                    {t("continue")}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
