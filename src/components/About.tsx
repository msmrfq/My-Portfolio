import { SectionHeading } from './primitives/SectionHeading';
import { Reveal } from './primitives/Reveal';
import { usePortfolioData } from '../context/portfolioData';
import styles from './About.module.css';

export function About() {
  const { profile } = usePortfolioData();
  return (
    <section id="about" className="section">
      <div className="container">
        <div className={styles.layout}>
          <Reveal className={styles.portraitCol}>
            <div className={styles.portrait}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${import.meta.env.BASE_URL}assets/portrait/about-portrait-sm.webp 520w, ${import.meta.env.BASE_URL}assets/portrait/about-portrait.webp 900w`}
                  sizes="(max-width: 860px) 80vw, 40vw"
                />
                <img
                  src={`${import.meta.env.BASE_URL}assets/portrait/about-portrait.webp`}
                  alt={`${profile.name}, portrait`}
                  width={900}
                  height={1125}
                  loading="lazy"
                  className={styles.portraitImg}
                />
              </picture>
              <span className={styles.corner} aria-hidden="true" />
            </div>
          </Reveal>

          <div className={styles.copy}>
            <SectionHeading eyebrow="About" title="A short introduction." />

            <Reveal delay={0.12}>
              <div className={styles.bio}>
                {profile.about.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className={styles.facts}>
                <div>
                  <dt className="mono-label">Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt className="mono-label">Citizenship</dt>
                  <dd>{profile.citizenship}</dd>
                </div>
                <div>
                  <dt className="mono-label">Status</dt>
                  <dd>{profile.status}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
