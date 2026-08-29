import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}
/**
 * Wraps a routed page with a fade/scale transition and scroll-to-top on mount.
 */
export function PageShell({ children, className }: PageShellProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.main
      initial={{
        opacity: 0,
        scale: 0.995
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.4,
        ease: 'easeOut'
      }}
      className={className}>
      
      {children}
    </motion.main>);

}