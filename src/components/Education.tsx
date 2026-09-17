import { SectionHeading } from './primitives/SectionHeading';
import { Reveal } from './primitives/Reveal';
import { usePortfolioData } from '../context/portfolioData';
import styles from './Education.module.css';

export function Education() {
  const { education } = usePortfolioData();
  const primary = education.find((e) => e.primary) ?? education[0];
  const others = education.filter((e) => e !== primary);

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading eyebrow="Education" index="04 / 07" />

        <Reveal>
          <article className={styles.primary}>
            <div className={styles.degreeWrap}>
              <h3 className={styles.degree}>{primary.degree}</h3>
              {primary.degreeNative && (
                <span className={styles.native} lang="ru">
                  {primary.degreeNative}
                </span>
              )}
            </div>

            <p className={styles.institution}>{primary.institution}</p>

            <dl className={styles.grid}>
              <div className={styles.field}>
                <dt className="mono-label">Period</dt>
                <dd className={styles.period}>{primary.periodLabel}</dd>
              </div>
              <div className={styles.field}>
                <dt className="mono-label">Institute</dt>
                <dd>{primary.school}</dd>
              </div>
              <div className={styles.field}>
                <dt className="mono-label">Qualification</dt>
                <dd>{primary.qualification}</dd>
              </div>
              <div className={styles.field}>
                <dt className="mono-label">Location</dt>
                <dd>{primary.location}</dd>
              </div>
            </dl>
          </article>
        </Reveal>

        {others.map((e, i) => (
          <Reveal key={e.id} delay={0.08 + i * 0.06}>
            <article className={styles.secondary}>
              <div className={styles.secMain}>
                <h4 className={styles.secDegree}>{e.degree}</h4>
                <p className={styles.secInstitution}>{e.school}</p>
              </div>
              <div className={styles.secMeta}>
                <span className={styles.period}>{e.periodLabel}</span>
                <span className="mono-label">{e.qualification}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
