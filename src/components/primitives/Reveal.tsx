import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** initial vertical offset in px */
  y?: number;
  once?: boolean;
}

/**
 * Fade + rise as the element scrolls into view. Collapses to a plain fade (no
 * transform) under reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: reduced ? 0.4 : 0.7,
        ease: [0.22, 0.61, 0.36, 1],
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
