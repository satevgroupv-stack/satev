import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeadphonesIcon,
  SendIcon,
  AlertTriangleIcon,
  XIcon } from
'lucide-react';
import { useI18n } from '../../lib/i18n';
import { CONTACT } from '../../lib/data';
export function SupportButton() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.95
          }}
          transition={{
            duration: 0.2
          }}
          className="glass-card w-60 p-3"
          role="menu">
          
            <a
            href={CONTACT.supportBot}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white hover:bg-[rgba(217,217,217,0.1)]"
            role="menuitem">
            
              <SendIcon className="h-4 w-4 text-neon" />
              {t('telegram_support')}
            </a>
            <a
            href={CONTACT.supportBot}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white hover:bg-[rgba(217,217,217,0.1)]"
            role="menuitem">
            
              <AlertTriangleIcon className="h-4 w-4 text-neon" />
              {t('report_issue')}
            </a>
          </motion.div>
        }
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        aria-label={t('need_help')}
        aria-expanded={open}
        className="neon-pulse flex items-center gap-2 rounded-full border border-[rgba(255,113,1,0.4)] bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg">
        
        {open ?
        <XIcon className="h-5 w-5" /> :

        <HeadphonesIcon className="h-5 w-5 text-neon" />
        }
        <span className="hidden sm:inline">{t('need_help')}</span>
      </motion.button>
    </div>);

}