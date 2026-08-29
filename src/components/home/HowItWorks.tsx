import React from 'react';
import { motion } from 'framer-motion';
import {
  QrCodeIcon,
  CupSodaIcon,
  CreditCardIcon,
  PackageCheckIcon,
  ArrowRightIcon } from
'lucide-react';
import { useI18n } from '../../lib/i18n';
const steps = [
{
  icon: QrCodeIcon,
  title: 'step_scan',
  desc: 'step_scan_d'
},
{
  icon: CupSodaIcon,
  title: 'step_select',
  desc: 'step_select_d'
},
{
  icon: CreditCardIcon,
  title: 'step_pay',
  desc: 'step_pay_d'
},
{
  icon: PackageCheckIcon,
  title: 'step_enjoy',
  desc: 'step_enjoy_d'
}];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section
      className="mx-auto max-w-container px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="how-title">
      
      <h2
        id="how-title"
        className="text-center text-2xl font-bold text-white sm:text-3xl">
        
        {t('how_it_works')}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) =>
        <motion.div
          key={step.title}
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.4,
            delay: i * 0.1
          }}
          className="glass-card relative flex flex-col items-center p-6 text-center">
          
            <span className="absolute right-4 top-4 text-sm font-bold text-neon">
              {i + 1}
            </span>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(255,113,1,0.35)] bg-[rgba(255,113,1,0.08)]">
              <step.icon className="h-6 w-6 text-neon" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {t(step.title)}
            </h3>
            <p className="mt-2 text-sm text-silver/70">{t(step.desc)}</p>
            {i < steps.length - 1 &&
          <ArrowRightIcon className="absolute -right-2 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-silver/30 lg:block" />
          }
          </motion.div>
        )}
      </div>
    </section>);

}