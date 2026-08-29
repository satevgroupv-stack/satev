"use client";

import React from "react";
import { GlobeIcon } from "lucide-react";
import { useI18n } from "../../lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  const activeStyle: React.CSSProperties = {
    backgroundColor: "#FF7101",
    color: "#FFFFFF",
    borderRadius: "9999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
  };

  const inactiveStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    color: "#D9D9D9",
    borderRadius: "9999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-[rgba(217,217,217,0.2)] bg-[rgba(217,217,217,0.06)] p-1">
      <GlobeIcon
        className="ml-1.5 mr-0.5 h-4 w-4 text-silver"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        style={lang === "en" ? activeStyle : inactiveStyle}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLang("am")}
        aria-pressed={lang === "am"}
        style={lang === "am" ? activeStyle : inactiveStyle}
      >
        አማ
      </button>
    </div>
  );
}