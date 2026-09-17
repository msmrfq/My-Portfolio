import { Reveal } from './primitives/Reveal';
import { usePortfolioData } from '../context/portfolioData';
import styles from './CredentialStrip.module.css';

export function CredentialStrip() {
  const { profile } = usePortfolioData();
  return (
    <section className={styles.strip} aria-label="Credentials at a glance">
      <div className={`container ${styles.grid}`}>
        {profile.credentials.map((c, i) => (
          <Reveal key={c.k} delay={i * 0.09} className={styles.cell}>
            <article className={styles.card}>
              <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.k}>{c.k}</h3>
              <p className={styles.v}>{c.v}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
