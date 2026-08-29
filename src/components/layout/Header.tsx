import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { SmartImage } from "../common/SmartImage";
import { IMAGES } from "../../lib/images";
const navItems = [
  {
    to: "/",
    key: "nav_home",
  },
  {
    to: "/about",
    key: "nav_about",
  },
  {
    to: "/journey",
    key: "nav_journey",
  },
  {
    to: "/contact",
    key: "nav_contact",
  },
];

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const navLink = (item: (typeof navItems)[number], mobile = false) => {
    const isActive =
      item.to === "/" ? pathname === "/" : pathname?.startsWith(item.to);
    return (
      <Link
        key={item.to}
        href={item.to}
        className={`rounded-md px-3 ${mobile ? "py-3 text-base" : "py-2 text-sm"} font-medium transition-colors ${isActive ? (mobile ? "bg-[rgba(255,113,1,0.12)] text-neon" : "text-neon") : mobile ? "text-silver hover:bg-[rgba(217,217,217,0.08)] hover:text-white" : "text-silver hover:text-white"}`}
      >
        {t(item.key)}
      </Link>
    );
  };
  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="SATEV Group home"
        >
          <SmartImage
            src={IMAGES.companyLogo}
            alt="SATEV Group logo"
            className="h-9 w-9 rounded-md object-contain"
          />

          <span className="text-lg font-bold tracking-wide text-white brand-glow">
            SATEV{" "}
            <span className="font-normal text-silver">{t("brand_group")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => navLink(item))}
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("close") : t("nav_menu")}
            aria-expanded={open}
            className="rounded-md p-2 text-white hover:bg-[rgba(217,217,217,0.1)]"
          >
            {open ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden border-t border-[rgba(217,217,217,0.1)] md:hidden"
          >
            <nav
              className="mx-auto flex max-w-container flex-col gap-1 px-4 py-4"
              aria-label="Mobile"
            >
              {navItems.map((item) => navLink(item, true))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
