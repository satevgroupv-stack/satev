"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ExternalLinkIcon,
  ArrowLeftIcon,
  BriefcaseIcon,
  AwardIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { GlassCard } from "../src/components/ui/GlassCard";
import { SmartImage } from "../src/components/common/SmartImage";
import { Button } from "../src/components/ui/Button";
import { useI18n } from "../src/lib/i18n";
import { TEAM } from "../src/lib/data";
export default function TeamMember() {
  const { t, lang } = useI18n();
  const params = useParams<{ memberId: string }>();
  const memberId = params?.memberId ?? "";

  const member = TEAM.find((m) => m.id === memberId);
  if (!member) {
    return (
      <PageShell>
        <section className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <p className="text-lg text-silver/80">Member not found.</p>
          <Link href="/journey" className="mt-6">
            <Button>{t("back_to_journey")}</Button>
          </Link>
        </section>
      </PageShell>
    );
  }
  const bio = lang === "en" ? member.bio_en : member.bio_am;
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 text-sm text-silver/70 hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t("back_to_journey")}
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-[280px,1fr]">
          <GlassCard className="overflow-hidden p-0">
            <div className="aspect-square w-full overflow-hidden bg-white/5">
              <SmartImage
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[rgba(217,217,217,0.25)] px-4 py-2.5 text-sm font-medium text-white hover:border-neon hover:text-neon"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </GlassCard>

          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {lang === "en" ? member.name : member.name_am}
            </h1>

            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <BriefcaseIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-silver/50">
                    {t("role")}
                  </p>
                  <p className="font-medium text-white">
                    {lang === "en" ? member.role_en : member.role_am}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AwardIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-silver/50">
                    {t("expertise")}
                  </p>
                  <p className="font-medium text-white">
                    {lang === "en" ? member.expertise_en : member.expertise_am}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold text-white">
                {t("contributions")}
              </h2>
              <div className="space-y-3 leading-relaxed text-silver/80">
                {bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
