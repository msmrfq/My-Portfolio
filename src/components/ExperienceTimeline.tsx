import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SectionHeading } from './primitives/SectionHeading';
import { Reveal } from './primitives/Reveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { usePortfolioData } from '../context/portfolioData';
import styles from './ExperienceTimeline.module.css';

const KIND_LABEL: Record<string, string> = {
  founder: 'Founder',
  work: 'Work',
  learning: 'Learning',
};

export function ExperienceTimeline() {
  const { experience, sectionIntros } = usePortfolioData();
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 82%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={sectionIntros.experience.eyebrow}
          title={sectionIntros.experience.title}
          index="03 / 07"
        />

        <div className={styles.timeline} ref={railRef}>
          <div className={styles.rail} aria-hidden="true">
            <motion.span
              className={styles.railFill}
              style={{ scaleY: reduced ? 1 : scaleY }}
            />
          </div>

          <ol className={styles.list}>
            {experience.map((item, i) => (
              <li key={item.id} className={styles.item}>
                <Reveal delay={reduced ? 0 : Math.min(i * 0.05, 0.2)}>
                  <div className={styles.row}>
                    <div className={styles.marker} data-kind={item.kind}>
                      <span
                        className={styles.node}
                        data-kind={item.kind}
                        aria-hidden="true"
                      />
                      <span className={styles.year}>
                        {item.year === 0 ? 'Earlier' : item.year}
                      </span>
                    </div>

                    <div className={styles.card}>
                      <div className={styles.head}>
                        <h3 className={styles.role}>{item.role}</h3>
                        <span className={styles.kind} data-kind={item.kind}>
                          {KIND_LABEL[item.kind]}
                        </span>
                      </div>

                      <p className={styles.org}>
                        {item.org}
                        {item.meta && (
                          <span className={styles.meta}> — {item.meta}</span>
                        )}
                      </p>

                      <div className={styles.metaRow}>
                        <span className="mono-label">{item.period}</span>
                        {item.location && (
                          <span className="mono-label">{item.location}</span>
                        )}
                        {item.tag && (
                          <span className={styles.tag}>{item.tag}</span>
                        )}
                      </div>

                      <p className={styles.desc}>{item.description}</p>

                      {item.bullets && (
                        <ul className={styles.bullets}>
                          {item.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}

                      {item.link && (
                        <a
                          className={styles.link}
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.link.label}
                          <span aria-hidden="true"> ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
