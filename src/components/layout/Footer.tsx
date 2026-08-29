import React from "react";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  SendIcon,
  YoutubeIcon,
  MusicIcon,
  LinkIcon,
} from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { CONTACT } from "../../lib/data";
export function Footer() {
  const { t } = useI18n();
  const socials = [
    {
      href: CONTACT.facebook,
      label: "Facebook",
      Icon: FacebookIcon,
    },
    {
      href: CONTACT.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
    },
    {
      href: CONTACT.linkedin,
      label: "LinkedIn",
      Icon: LinkedinIcon,
    },
    {
      href: CONTACT.telegramChannel,
      label: "Telegram",
      Icon: SendIcon,
    },
    {
      href: CONTACT.tiktok,
      label: "TikTok",
      Icon: MusicIcon,
    },
    {
      href: CONTACT.linktree,
      label: "Linktree",
      Icon: LinkIcon,
    },
  ];

  return (
    <footer className="border-t border-[rgba(217,217,217,0.1)] bg-navy-deep">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="text-lg font-bold text-white brand-glow">
              SATEV{" "}
              <span className="font-normal text-silver">
                {t("brand_group")}
              </span>
            </div>
            <p className="mt-2 text-sm text-silver/70">
              {t("tagline_company")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t("company")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-silver/70 hover:text-white">
                  {t("nav_about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/journey"
                  className="text-silver/70 hover:text-white"
                >
                  {t("nav_journey")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-silver/70 hover:text-white"
                >
                  {t("nav_contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t("legal")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-silver/70 hover:text-white"
                >
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-silver/70 hover:text-white">
                  {t("terms_of_service")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t("social")}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-md border border-[rgba(217,217,217,0.15)] p-2 text-silver/80 transition-colors hover:border-neon hover:text-neon"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgba(217,217,217,0.1)] pt-6 text-center text-sm text-silver/60">
          © 2026 SATEV Group PLC. {t("rights_reserved")}
        </div>
      </div>
    </footer>
  );
}
