import { Reveal } from './primitives/Reveal';
import { MagneticButton } from './primitives/MagneticButton';
import { usePortfolioData } from '../context/portfolioData';
import styles from './Contact.module.css';

export function Contact() {
  const { profile } = usePortfolioData();
  const projectLinks = [
    { label: 'Systern', href: profile.links.systern },
    { label: 'Quadnos', href: profile.links.quadnos },
    { label: 'Craws PDF', href: profile.links.crawspdf },
  ];
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <span className={`eyebrow ${styles.eyebrow}`}>Contact</span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className={styles.headline}>
            Let&rsquo;s build
            <br />
            something useful.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <div className={styles.actions}>
            <MagneticButton href={`mailto:${profile.email}`} variant="solid">
              {profile.email}
            </MagneticButton>
            <MagneticButton href={`tel:${profile.phoneHref}`} variant="ghost">
              {profile.phoneDisplay}
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className={styles.projects}>
            <span className="mono-label">Selected links</span>
            <ul className={styles.links}>
              {projectLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {l.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
