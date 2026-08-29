import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, MinusIcon } from 'lucide-react';
import { SmartImage } from '../common/SmartImage';
import { Drink } from '../../lib/data';
import { useI18n } from '../../lib/i18n';
import { useCart } from '../../lib/cart';
export function DrinkRow({ drink }: {drink: Drink;}) {
  const { t, lang } = useI18n();
  const { add, decrement, qtyOf } = useCart();
  const qty = qtyOf(drink.id);
  const outOfStock = !drink.inStock;
  const name = lang === 'en' ? drink.name_en : drink.name_am;
  return (
    <div
      className={`glass-card flex items-center gap-4 p-3 sm:p-4 ${outOfStock ? 'border-[rgba(59,130,246,0.5)] bg-[rgba(30,58,138,0.35)]' : ''}`}>
      
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[rgba(217,217,217,0.15)] bg-white/5">
        <SmartImage
          src={drink.image}
          alt={name}
          className={`h-full w-full object-contain p-1 ${outOfStock ? 'opacity-60' : ''}`} />
        
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-base font-semibold ${outOfStock ? 'text-blue-300' : 'text-white'}`}>
          
          {name}
        </p>
        <p className="text-sm text-silver/60">
          {drink.volume} · {drink.price} ETB
        </p>
        {outOfStock ?
        <span className="mt-1 inline-block rounded-full bg-[rgba(59,130,246,0.25)] px-2.5 py-0.5 text-xs font-medium text-blue-300">
            {t('out_of_stock')}
          </span> :

        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#4ADE80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
            {t('in_stock')}
          </span>
        }
      </div>

      <div className="flex-shrink-0">
        {outOfStock ?
        <span className="text-xs font-medium text-blue-300/70">—</span> :
        qty === 0 ?
        <motion.button
          whileTap={{
            scale: 0.9
          }}
          type="button"
          onClick={() => add(drink)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff8524]"
          aria-label={`${t('add')} ${name}`}>
          
            <PlusIcon className="h-4 w-4" />
            {t('add')}
          </motion.button> :

        <div className="flex items-center gap-2 rounded-lg border border-[rgba(255,113,1,0.4)] p-1">
            <button
            type="button"
            onClick={() => decrement(drink.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-[rgba(217,217,217,0.1)]"
            aria-label={`Decrease ${name}`}>
            
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-base font-semibold text-white">
              {qty}
            </span>
            <button
            type="button"
            onClick={() => add(drink)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-[rgba(217,217,217,0.1)]"
            aria-label={`Increase ${name}`}>
            
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        }
      </div>
    </div>);

}