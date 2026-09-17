import type { Achievement } from '../data';
import { SectionHeading } from './primitives/SectionHeading';
import { Reveal } from './primitives/Reveal';
import { useCertificateViewer } from '../context/certificateViewer';
import { usePortfolioData } from '../context/portfolioData';
import styles from './AcademicDistinctions.module.css';

export function AcademicDistinctions() {
  const { open } = useCertificateViewer();
  const { achievements, sectionIntros } = usePortfolioData();
  const centerpiece = achievements.find((a) => a.centerpiece);
  const rest = achievements.filter((a) => !a.centerpiece);

  return (
    <section id="distinctions" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={sectionIntros.distinctions.eyebrow}
          title={sectionIntros.distinctions.title}
          index="05 / 07"
        />

        <div className={styles.layout}>
          {centerpiece && (
            <Reveal className={styles.centerCell}>
              {centerpiece.certRef ? (
                <button
                  type="button"
                  className={styles.center}
                  onClick={() => open(centerpiece.certRef!)}
                  aria-label={`${centerpiece.title} — open certificate`}
                >
                  <CenterInner a={centerpiece} interactive />
                </button>
              ) : (
                <div className={styles.center}>
                  <CenterInner a={centerpiece} />
                </div>
              )}
            </Reveal>
          )}

          <div className={styles.side}>
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={0.08 + i * 0.06}>
                <article className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className="mono-label">{a.year}</span>
                  </div>
                  <h4 className={styles.cardTitle}>{a.title}</h4>
                  <p className={styles.cardIssuer}>{a.issuer}</p>
                  <p className={styles.cardDetail}>{a.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CenterInner({
  a,
  interactive,
}: {
  a: Achievement;
  interactive?: boolean;
}) {
  return (
    <>
      {interactive && <span className={styles.sweep} aria-hidden="true" />}
      <div className={styles.centerTop}>
        <span className="mono-label">{a.year} · Centerpiece</span>
        <span className={styles.seal} aria-hidden="true" />
      </div>

      <h3 className={styles.centerTitle}>{a.title}</h3>
      <p className={styles.centerIssuer}>{a.issuer}</p>
      <p className={styles.centerDetail}>{a.detail}</p>

      {a.highlights && (
        <ul className={styles.highlights}>
          {a.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {interactive && (
        <span className={styles.viewHint}>
          View certificate <span aria-hidden="true">↗</span>
        </span>
      )}
    </>
  );
}
