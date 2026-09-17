import { useRef } from 'react';
import { useMotionValue, useSpring, type SpringOptions } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const SPRING: SpringOptions = { stiffness: 90, damping: 18, mass: 0.4 };

/**
 * GPU-friendly pointer parallax. Returns normalized, spring-smoothed motion
 * values in the range [-0.5, 0.5] for the pointer position within the tracked
 * element. Layers can multiply these by their own depth factor. No-ops under
 * reduced motion.
 */
export function usePointerParallax(strength = 1) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, SPRING);
  const py = useSpring(rawY, SPRING);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * strength);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, px, py, onPointerMove, reset, reduced };
}
