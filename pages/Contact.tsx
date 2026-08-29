"use client";
import React, { useState } from "react";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  LinkedinIcon,
} from "lucide-react";
import { PageShell } from "../src/components/layout/PageShell";
import { GlassCard } from "../src/components/ui/GlassCard";
import { Button } from "../src/components/ui/Button";
import { useI18n } from "../src/lib/i18n";
import { CONTACT } from "../src/lib/data";
export default function Contact() {
  const { t, lang } = useI18n();
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  const inputClass =
    "w-full rounded-lg border border-[rgba(217,217,217,0.2)] bg-[rgba(217,217,217,0.05)] px-4 py-2.5 text-white placeholder-silver/40 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon";
  return (
    <PageShell>
      <section className="mx-auto max-w-container px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          {t("contact_title")}
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <GlassCard>
              <ul className="space-y-4 text-sm">
                {CONTACT.phones.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-silver/85"
                  >
                    <PhoneIcon className="h-4 w-4 text-neon" />
                    <a href={`tel:${p}`} className="hover:text-white">
                      {p}
                    </a>
                  </li>
                ))}
                {CONTACT.emails.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-3 text-silver/85"
                  >
                    <MailIcon className="h-4 w-4 text-neon" />
                    <a href={`mailto:${e}`} className="hover:text-white">
                      {e}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-silver/85">
                  <MapPinIcon className="h-4 w-4 text-neon" />
                  <a
                    href={CONTACT.addressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Addis Ababa, Ethiopia
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li className="flex items-center gap-3 text-silver/85">
                  <ClockIcon className="h-4 w-4 text-neon" />
                  {t("hours")}
                </li>
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="mb-4 text-lg font-semibold text-white">
                {t("connect_with_us")}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  {
                    label: "Linktree",
                    href: CONTACT.linktree,
                  },
                  {
                    label: "Telegram",
                    href: CONTACT.telegramChannel,
                  },
                  {
                    label: "Facebook",
                    href: CONTACT.facebook,
                  },
                  {
                    label: "TikTok",
                    href: CONTACT.tiktok,
                  },
                  {
                    label: "Instagram",
                    href: CONTACT.instagram,
                  },
                  {
                    label: "LinkedIn",
                    href: CONTACT.linkedin,
                  },
                  {
                    label: "Website",
                    href: CONTACT.website,
                  },
                  {
                    label: "Support Bot",
                    href: CONTACT.supportBot,
                  },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-lg border border-[rgba(217,217,217,0.15)] px-3 py-2 text-silver/80 hover:border-neon hover:text-neon"
                  >
                    {l.label}
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Form */}
          <GlassCard>
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(74,222,128,0.12)]">
                  <SendIcon className="h-6 w-6 text-[#4ADE80]" />
                </div>
                <p className="mt-4 text-lg font-medium text-white">
                  {t("message_sent")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm text-silver/80"
                  >
                    {t("name")} <span className="text-neon">*</span>
                  </label>
                  <input id="name" required className={inputClass} />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-silver/80"
                  >
                    {t("email")} <span className="text-neon">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm text-silver/80"
                  >
                    {t("phone")}
                  </label>
                  <input id="phone" type="tel" className={inputClass} />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm text-silver/80"
                  >
                    {t("subject")} <span className="text-neon">*</span>
                  </label>
                  <input id="subject" required className={inputClass} />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm text-silver/80"
                  >
                    {t("message")} <span className="text-neon">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className={inputClass}
                  />
                </div>
                <Button type="submit" pulse fullWidth>
                  <SendIcon className="h-4 w-4" />
                  {t("send_message")}
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
