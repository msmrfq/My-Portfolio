import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ArchiveFilter, CertCategory } from '../data';
import { SectionHeading } from './primitives/SectionHeading';
import { useCertificateViewer } from '../context/certificateViewer';
import { usePortfolioData } from '../context/portfolioData';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './CertificateArchive.module.css';

export function CertificateArchive() {
  const { certCategories, certificates, sectionIntros } = usePortfolioData();
  const { open } = useCertificateViewer();
  const reduced = usePrefersReducedMotion();
  const [filter, setFilter] = useState<ArchiveFilter>('ALL');

  const shown = useMemo(
    () =>
      filter === 'ALL'
        ? certificates
        : certificates.filter((c) =>
            c.categories.includes(filter as CertCategory),
          ),
    [filter, certificates],
  );

  return (
    <section id="archive" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={sectionIntros.archive.eyebrow}
          title={sectionIntros.archive.title}
          index="07 / 07"
        />

        <div className={styles.filters} role="tablist" aria-label="Filter archive">
          {certCategories.map((c) => {
            const count =
              c === 'ALL'
                ? certificates.length
                : certificates.filter((x) =>
                    x.categories.includes(c as CertCategory),
                  ).length;
            const activeFilter = filter === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={activeFilter}
                className={`${styles.filter} ${activeFilter ? styles.filterActive : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
                <span className={styles.count}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.ul className={styles.grid} layout={!reduced}>
          <AnimatePresence mode="popLayout">
            {shown.map((cert) => {
              const multi = cert.images.length > 1;
              const hasImages = cert.images.length > 0;
              return (
                <motion.li
                  key={cert.id}
                  className={styles.cell}
                  layout={!reduced}
                  initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                  transition={{ duration: reduced ? 0.2 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <button
                    className={styles.card}
                    onClick={() => open(cert.id)}
                    aria-label={`${cert.title} — open in viewer`}
                  >
                    <span className={styles.tab} aria-hidden="true" />
                    <span className={styles.thumb}>
                      {hasImages ? (
                        <img
                          src={cert.thumb}
                          alt=""
                          loading="lazy"
                          className={styles.thumbImg}
                        />
                      ) : (
                        <span className={styles.noThumb}>
                          <span className="mono-label">On file</span>
                        </span>
                      )}
                      {multi && (
                        <span className={styles.badge}>
                          {cert.images.length} docs
                        </span>
                      )}
                    </span>

                    <span className={styles.info}>
                      <span className={styles.title}>{cert.title}</span>
                      <span className={styles.metaLine}>
                        {[cert.issuer, cert.year].filter(Boolean).join(' · ') ||
                          cert.categories[0]}
                      </span>
                      <span className={styles.chips}>
                        {cert.categories.map((cat) => (
                          <span key={cat} className={styles.chip}>
                            {cat}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className={styles.open} aria-hidden="true">
                      View ↗
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
