import type { ProjectMotif } from '../data';
import styles from './ProjectMotif.module.css';

/**
 * Restrained per-project motif graphics (§14). Pure SVG/CSS, currentColor-tinted
 * so each project's card can set its own accent. Decorative only.
 */
export function Motif({ motif }: { motif: ProjectMotif }) {
  return (
    <div className={styles.motif} data-motif={motif} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.art}>{render(motif)}</div>
    </div>
  );
}

function render(motif: ProjectMotif) {
  switch (motif) {
    case 'terminal':
      return (
        <svg viewBox="0 0 120 80" className={styles.svg}>
          <rect x="1" y="1" width="118" height="78" rx="4" className={styles.stroke} />
          <line x1="1" y1="16" x2="119" y2="16" className={styles.hair} />
          <circle cx="10" cy="8.5" r="1.8" className={styles.fill} />
          <circle cx="17" cy="8.5" r="1.8" className={styles.hairFill} />
          <circle cx="24" cy="8.5" r="1.8" className={styles.hairFill} />
          <text x="9" y="34" className={styles.code}>&gt; build --scale</text>
          <line x1="9" y1="44" x2="70" y2="44" className={styles.codeline} />
          <line x1="9" y1="52" x2="94" y2="52" className={styles.codeline} />
          <line x1="9" y1="60" x2="52" y2="60" className={styles.codeline} />
          <rect x="9" y="66" width="7" height="8" className={styles.cursor} />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 120 80" className={styles.svg}>
          <path d="M24 6 h54 l18 18 v50 h-72 z" className={styles.stroke} />
          <path d="M78 6 v18 h18" className={styles.hair} />
          <line x1="34" y1="34" x2="86" y2="34" className={styles.codeline} />
          <line x1="34" y1="42" x2="86" y2="42" className={styles.codeline} />
          <line x1="34" y1="50" x2="72" y2="50" className={styles.codeline} />
          <line x1="34" y1="58" x2="80" y2="58" className={styles.codeline} />
          <circle cx="96" cy="60" r="12" className={styles.stroke} />
          <line x1="105" y1="69" x2="114" y2="78" className={styles.stroke} />
        </svg>
      );
    case 'blueprint':
      return (
        <svg viewBox="0 0 120 80" className={styles.svg}>
          <rect x="16" y="14" width="60" height="42" className={styles.stroke} />
          <rect x="44" y="34" width="60" height="34" className={styles.hair} />
          <line x1="16" y1="8" x2="76" y2="8" className={styles.hair} />
          <line x1="16" y1="5" x2="16" y2="11" className={styles.hair} />
          <line x1="76" y1="5" x2="76" y2="11" className={styles.hair} />
          <circle cx="46" cy="35" r="2" className={styles.fill} />
          <line x1="0" y1="35" x2="120" y2="35" className={styles.crosshair} />
          <line x1="46" y1="0" x2="46" y2="80" className={styles.crosshair} />
        </svg>
      );
    case 'botanical':
      return (
        <svg viewBox="0 0 120 80" className={styles.svg}>
          <path d="M60 74 V34" className={styles.stroke} />
          <path
            d="M60 44 C60 30 46 24 34 26 C36 40 48 46 60 44 Z"
            className={styles.leaf}
          />
          <path
            d="M60 52 C60 40 74 34 86 36 C84 48 72 56 60 52 Z"
            className={styles.leaf}
          />
          <path d="M60 34 C60 24 66 18 72 16" className={styles.stroke} />
          <circle cx="60" cy="74" r="2.4" className={styles.fill} />
        </svg>
      );
  }
}
