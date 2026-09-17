import styles from './GrainOverlay.module.css';

/** Fixed, ultra-subtle film grain for atmospheric depth. Purely decorative. */
export function GrainOverlay() {
  return <div className={styles.grain} aria-hidden="true" />;
}
