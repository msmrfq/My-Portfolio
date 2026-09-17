import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import styles from './SectionHeading.module.css';

interface Props {
  eyebrow: string;
  title?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
  index?: string; // optional institutional coordinate, e.g. "04 / 11"
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'left',
  index,
}: Props) {
  return (
    <header
      className={styles.head}
      data-align={align}
    >
      <Reveal>
        <div className={styles.top}>
          <span className="eyebrow">{eyebrow}</span>
          {index && <span className="mono-label">{index}</span>}
        </div>
      </Reveal>
      {title && (
        <Reveal delay={0.06}>
          <h2 className={`section-title ${styles.title}`}>{title}</h2>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.12}>
          <div className={styles.body}>{children}</div>
        </Reveal>
      )}
    </header>
  );
}
