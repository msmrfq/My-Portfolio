import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { usePortfolioData } from '../context/portfolioData';
import styles from './KeyStatement.module.css';

/**
 * §13 — Editorial positioning statement. This is portfolio voice, NOT an
 * attributed quotation, so it is rendered as a set of large typographic lines
 * rather than a blockquote.
 */
export function KeyStatement() {
  const { keyStatement } = usePortfolioData();
  const reduced = usePrefersReducedMotion();
  return (
    <section className={styles.section} aria-label="Positioning">
      <div className="container">
        <div className={styles.block}>
          <motion.span
            className={`mono-label ${styles.head}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {keyStatement.headline}
          </motion.span>

          <p className={styles.lines}>
            {keyStatement.lines.map((line, i) => {
              const [lead, ...rest] = line.split(' ');
              return (
                <motion.span
                  key={line}
                  className={styles.line}
                  initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -18% 0px' }}
                  transition={{
                    duration: reduced ? 0.4 : 0.75,
                    ease: [0.22, 0.61, 0.36, 1],
                    delay: reduced ? 0 : i * 0.12,
                  }}
                >
                  <span className={styles.lead}>{lead}</span>{' '}
                  {rest.join(' ')}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
