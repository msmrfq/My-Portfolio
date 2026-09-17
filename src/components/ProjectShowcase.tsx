import { Reveal } from './primitives/Reveal';
import { SectionHeading } from './primitives/SectionHeading';
import { Motif } from './ProjectMotif';
import { usePortfolioData } from '../context/portfolioData';
import styles from './ProjectShowcase.module.css';

export function ProjectShowcase() {
  const { projects, sectionIntros } = usePortfolioData();
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={sectionIntros.work.eyebrow}
          title={sectionIntros.work.title}
          index="02 / 07"
        />

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} className={styles.cell}>
              <article className={styles.card} data-motif={p.motif}>
                <Motif motif={p.motif} />
                <div className={styles.content}>
                  <div className={styles.top}>
                    <span className={styles.name}>{p.name}</span>
                    <span className="mono-label">{p.year}</span>
                  </div>
                  <p className={styles.category}>{p.category}</p>
                  <p className={styles.desc}>{p.description}</p>

                  <div className={styles.foot}>
                    {p.cta ? (
                      <a
                        className={styles.cta}
                        href={p.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.cta.label}
                        <span className={styles.arrow} aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className={styles.status}>Early stage</span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
