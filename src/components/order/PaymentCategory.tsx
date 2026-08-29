import React, { Component, ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { SmartImage } from '../common/SmartImage';
import { PayMethod } from '../../lib/data';
interface PaymentCategoryProps {
  title: string;
  description?: string;
  Icon: ComponentType<{
    className?: string;
  }>;
  methods: PayMethod[];
  open: boolean;
  onToggle: () => void;
  selected: string | null;
  onSelect: (id: string) => void;
}
export function PaymentCategory({
  title,
  description,
  Icon,
  methods,
  open,
  onToggle,
  selected,
  onSelect
}: PaymentCategoryProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(217,217,217,0.15)] bg-[rgba(217,217,217,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left">
        
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(255,113,1,0.1)]">
            <Icon className="h-5 w-5 text-neon" />
          </span>
          <span>
            <span className="block font-semibold text-white">{title}</span>
            {description &&
            <span className="mt-0.5 block text-xs text-silver/60">
                {description}
              </span>
            }
          </span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 flex-shrink-0 text-silver transition-transform ${open ? 'rotate-180' : ''}`} />
        
      </button>

      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.25
          }}
          className="overflow-hidden">
          
            <div className="grid grid-cols-1 gap-2 px-4 pb-4 sm:grid-cols-2">
              {methods.map((m) => {
              const isSelected = selected === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelect(m.id)}
                  className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${isSelected ? 'border-neon bg-[rgba(255,113,1,0.12)] text-white' : 'border-[rgba(217,217,217,0.15)] text-silver/80 hover:border-[rgba(217,217,217,0.35)]'}`}>
                  
                    <span className="flex min-w-0 items-center gap-2.5">
                      {m.logo &&
                    <SmartImage
                      src={m.logo}
                      alt={m.name}
                      className="h-6 w-6 flex-shrink-0 rounded object-contain" />

                    }
                      <span className="truncate">{m.name}</span>
                    </span>
                    {isSelected &&
                  <CheckIcon className="h-4 w-4 flex-shrink-0 text-neon" />
                  }
                  </button>);

            })}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}