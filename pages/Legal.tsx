"use client";
import React from "react";
import { PageShell } from "../src/components/layout/PageShell";
import { GlassCard } from "../src/components/ui/GlassCard";
import { useI18n } from "../src/lib/i18n";
interface Section {
  heading: string;
  body: string;
}
interface LegalContent {
  title: string;
  sections: Section[];
}
const PRIVACY: LegalContent = {
  title: "privacy_policy",
  sections: [
    {
      heading: "Information We Collect",
      body: "We collect the minimum data required to process a purchase — machine ID, selected products, and payment confirmation processed securely through SantimPay. We do not store card numbers.",
    },
    {
      heading: "How We Use Your Information",
      body: "Your information is used solely to complete transactions, dispense products, provide receipts, and improve machine reliability.",
    },
    {
      heading: "Data Security",
      body: "All payments are encrypted in transit and processed by our licensed payment partner. SATEV Group PLC applies industry-standard safeguards.",
    },
    {
      heading: "Data Retention",
      body: "Transaction records are retained only as long as required for accounting, warranty, and legal obligations.",
    },
    {
      heading: "Your Rights",
      body: "You may request access to, correction of, or deletion of your personal data by contacting us.",
    },
    {
      heading: "Cookies",
      body: "The website uses minimal local storage (e.g. your language preference). No third-party advertising cookies are used.",
    },
    {
      heading: "Third-Party Services",
      body: "We integrate SantimPay for payments and Telegram for support. Their respective policies apply to data they process.",
    },
    {
      heading: "Changes to This Policy",
      body: 'We may update this policy. Material changes will be reflected by the "last updated" date.',
    },
    {
      heading: "Contact Us",
      body: "Questions? Email SATEVGroupV@gmail.com.",
    },
  ],
};
const TERMS: LegalContent = {
  title: "terms_of_service",
  sections: [
    {
      heading: "Acceptance of Terms",
      body: "By using a RevoV machine or this website, you agree to these terms.",
    },
    {
      heading: "Description of Service",
      body: "RevoV provides autonomous, IoT-enabled vending of beverages, operated by SATEV Group PLC.",
    },
    {
      heading: "Payment Terms",
      body: "Payment is required before dispensing. Prices are shown in ETB and processed via SantimPay.",
    },
    {
      heading: "Refund Policy",
      body: "If a product is not dispensed after a successful payment, contact support via @Revov_bot for resolution or refund.",
    },
    {
      heading: "Intellectual Property",
      body: "The RevoV design, patents, software, and branding are the property of SATEV Group PLC.",
    },
    {
      heading: "Limitation of Liability",
      body: "SATEV Group PLC is not liable for indirect damages arising from service interruptions beyond our reasonable control.",
    },
    {
      heading: "Termination",
      body: "We may suspend access in cases of misuse, fraud, or tampering with machines.",
    },
    {
      heading: "Governing Law",
      body: "These terms are governed by the laws of the Federal Democratic Republic of Ethiopia.",
    },
    {
      heading: "Changes to Terms",
      body: "We may revise these terms; continued use constitutes acceptance.",
    },
    {
      heading: "Contact Information",
      body: "For questions, email SATEVGroupV@gmail.com or reach @Revov_bot.",
    },
  ],
};
function LegalPage({ content }: { content: LegalContent }) {
  const { t } = useI18n();
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-extrabold text-white">
          {t(content.title)}
        </h1>
        <p className="mt-2 text-sm text-silver/60">
          {t("last_updated")}: Jul 16, 2026
        </p>

        <GlassCard className="mt-8 space-y-6">
          {content.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-white">
                {i + 1}. {s.heading}
              </h2>
              <p className="mt-1.5 leading-relaxed text-silver/80">{s.body}</p>
            </div>
          ))}
        </GlassCard>
      </section>
    </PageShell>
  );
}
export function Privacy() {
  return <LegalPage content={PRIVACY} />;
}

export function Terms() {
  return <LegalPage content={TERMS} />;
}

export default function Legal() {
  return <LegalPage content={PRIVACY} />;
}