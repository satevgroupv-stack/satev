import React, { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}
export function GlassCard({
  as = 'div',
  className,
  children,
  ...rest
}: GlassCardProps) {
  const Comp = as as any;
  return (
    <Comp className={twMerge('glass-card p-6', className)} {...rest}>
      {children}
    </Comp>);

}