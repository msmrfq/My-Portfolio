import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Certificate } from '../data';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './Lightbox.module.css';

interface Props {
  cert: Certificate;
  onClose: () => void;
}

const thumbOf = (src: string) => src.replace(/\.webp$/, '-thumb.webp');

/**
 * Accessible certificate viewer: focus trap, Escape to close, backdrop click,
 * arrow-key gallery navigation, body scroll lock, focus restoration.
 */
export function Lightbox({ cert, onClose }: Props) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const total = cert.images.length;
  const multi = total > 1;
  const hasImages = total > 0;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (multi && e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
      if (multi && e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'Tab') {
        const el = dialogRef.current;
        if (!el) return;
        const f = el.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, prev, next, multi]);

  useEffect(() => {
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, []);

  const dur = reduced ? 0.2 : 0.4;

  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur }}
    >
      <motion.div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: reduced ? 0 : 22, scale: reduced ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduced ? 0 : 22, scale: reduced ? 1 : 0.98 }}
        transition={{ duration: dur, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close viewer"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className={styles.stage}>
          {hasImages ? (
            <figure className={styles.figure}>
              <img
                className={styles.image}
                src={cert.images[index]}
                alt={`${cert.title}${multi ? ` — image ${index + 1} of ${total}` : ''}`}
              />
              {multi && (
                <>
                  <button
                    className={`${styles.nav} ${styles.navPrev}`}
                    onClick={prev}
                    aria-label="Previous image"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    className={`${styles.nav} ${styles.navNext}`}
                    onClick={next}
                    aria-label="Next image"
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                  <span className={styles.counter} aria-hidden="true">
                    {index + 1} / {total}
                  </span>
                </>
              )}
            </figure>
          ) : (
            <div className={styles.placeholder}>
              <span className="mono-label">Document on file</span>
              <p>The original certificate is archived; a scan is not available.</p>
            </div>
          )}
        </div>

        <div className={styles.meta}>
          {cert.year && <span className="mono-label">{cert.year}</span>}
          <h3 className={styles.title}>{cert.title}</h3>
          {cert.issuer && <p className={styles.issuer}>{cert.issuer}</p>}
          {cert.note && <p className={styles.note}>{cert.note}</p>}

          {multi && (
            <div className={styles.thumbs}>
              {cert.images.map((src, i) => (
                <button
                  key={src}
                  className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === index}
                >
                  <img src={thumbOf(src)} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
