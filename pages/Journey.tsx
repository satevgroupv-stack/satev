"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LinkedinIcon, ArrowRightIcon } from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { SmartImage } from "../src/components/common/SmartImage";
import { useI18n } from "../src/lib/i18n";
import { MILESTONES, TEAM } from "../src/lib/data";
export default function Journey() {
  const { t, lang } = useI18n();
  const displayedTeam = [TEAM[0], TEAM[1], TEAM[3], TEAM[2]];
  return (
    <PageShell>
      <section className="mx-auto max-w-container px-4 py-12 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t("journey_title")}
          </h1>
          <p className="mt-2 text-silver/70">{t("journey_sub")}</p>
        </div>

        {/* Timeline */}
        <ol className="relative mx-auto mt-12 max-w-2xl border-l border-[rgba(217,217,217,0.2)] pl-6">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={i}
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
                delay: i * 0.05,
              }}
              className="mb-8 last:mb-0"
            >
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-neon bg-navy" />
              <p className="text-sm font-semibold text-neon">
                {lang === "en" ? m.date_en : m.date_am}
              </p>
              <p className="mt-1 text-silver/85">
                {lang === "en" ? m.title_en : m.title_am}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* Team */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            {t("the_team")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedTeam.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.08,
                }}
                className="glass-card flex flex-col overflow-hidden p-0"
              >
                <div className="aspect-square w-full overflow-hidden bg-white/5">
                  <SmartImage
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-white">
                    {lang === "en" ? member.name : member.name_am}
                  </h3>
                  <p className="mt-0.5 text-sm text-neon">
                    {lang === "en" ? member.role_en : member.role_am}
                  </p>
                  <p className="mt-1 text-xs text-silver/60">
                    {lang === "en" ? member.expertise_en : member.expertise_am}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={"/team/" + member.id}
                      className="inline-flex items-center gap-1 text-sm font-medium text-silver hover:text-white"
                    >
                      {t("view_profile")}
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="rounded-md p-1.5 text-silver/70 hover:text-neon"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
