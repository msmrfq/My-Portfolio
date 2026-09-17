import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './MagneticButton.module.css';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'ghost' | 'link';
  external?: boolean;
  ariaLabel?: string;
}

/**
 * Button/anchor with a subtle magnetic pull toward the pointer (fine pointers
 * only; disabled under reduced motion). Renders an <a> when href is provided.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'solid',
  external,
  ariaLabel,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `${styles.btn} ${styles[variant]} ${className}`;
  const inner = <span className={styles.inner}>{children}</span>;

  return (
    <motion.div
      ref={ref}
      className={styles.wrap}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {href ? (
        <a
          className={cls}
          href={href}
          aria-label={ariaLabel}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {inner}
        </a>
      ) : (
        <button className={cls} onClick={onClick} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
