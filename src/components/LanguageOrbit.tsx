import { useState } from 'react';
import { SectionHeading } from './primitives/SectionHeading';
import { usePortfolioData } from '../context/portfolioData';
import styles from './LanguageOrbit.module.css';

const RADIUS = 37;

export function LanguageOrbit() {
  const { languages, sectionIntros } = usePortfolioData();
  const N = languages.length;
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="languages" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={sectionIntros.languages.eyebrow}
          title={sectionIntros.languages.title}
          index="06 / 07"
        />

        <div
          className={styles.stage}
          onMouseLeave={() => setActive(null)}
        >
          <div className={styles.core} aria-hidden="true">
            <span className={styles.coreNum}>
              {String(N).padStart(2, '0')}
            </span>
            <span className={styles.coreLabel}>Languages</span>
            <span className={styles.coreSub}>Three scripts</span>
          </div>

          <ul className={styles.orbit}>
            {languages.map((l, i) => {
              const theta = ((-90 + (360 / N) * i) * Math.PI) / 180;
              const x = 50 + RADIUS * Math.cos(theta);
              const y = 50 + RADIUS * Math.sin(theta);
              const isActive = active === l.id;
              const dim = active !== null && !isActive;
              return (
                <li
                  key={l.id}
                  className={[
                    styles.node,
                    isActive ? styles.active : '',
                    dim ? styles.dim : '',
                  ].join(' ')}
                  data-tier={l.tier}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <button
                    className={styles.orb}
                    onMouseEnter={() => setActive(l.id)}
                    onFocus={() => setActive(l.id)}
                    onBlur={() => setActive((a) => (a === l.id ? null : a))}
                    aria-label={`${l.name}: ${l.level}, ${l.descriptor}`}
                  >
                    <span className={styles.glyph} lang={langOf(l.id)}>
                      {l.glyph}
                    </span>
                    <span className={styles.name}>{l.name}</span>
                    <span className={styles.detail}>
                      <span className={styles.level}>{l.level}</span>
                      <span className={styles.descriptor}>{l.descriptor}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function langOf(id: string): string | undefined {
  const map: Record<string, string> = {
    bengali: 'bn',
    hindi: 'hi',
    urdu: 'ur',
    russian: 'ru',
    turkish: 'tr',
  };
  return map[id];
}
