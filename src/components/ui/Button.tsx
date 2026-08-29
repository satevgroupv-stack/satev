import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
type Variant = 'primary' | 'secondary' | 'ghost';
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: Variant;
  pulse?: boolean;
  fullWidth?: boolean;
}
const base =
'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-50';
const variants: Record<Variant, string> = {
  primary: 'bg-neon text-white hover:bg-[#ff8524]',
  secondary:
  'border border-[rgba(217,217,217,0.25)] bg-[rgba(217,217,217,0.06)] text-white hover:bg-[rgba(217,217,217,0.14)]',
  ghost: 'text-silver hover:text-white'
};
export function Button({
  variant = 'primary',
  pulse = false,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{
        y: -2
      }}
      whileTap={{
        scale: 0.96
      }}
      transition={{
        duration: 0.2
      }}
      className={twMerge(
        base,
        variants[variant],
        fullWidth && 'w-full',
        pulse && variant === 'primary' && 'neon-pulse',
        className
      )}
      {...rest}>
      
      {children}
    </motion.button>);

}