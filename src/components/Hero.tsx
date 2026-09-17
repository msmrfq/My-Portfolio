import { motion, useTransform } from 'framer-motion';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { usePortfolioData } from '../context/portfolioData';
import { MagneticButton } from './primitives/MagneticButton';
import styles from './Hero.module.css';

export function Hero() {
  const { profile } = usePortfolioData();
  const { ref, px, py, onPointerMove, reset } = usePointerParallax(1);

  // Frame tilt + layered depth from pointer position.
  const rotateY = useTransform(px, [-0.5, 0.5], [7, -7]);
  const rotateX = useTransform(py, [-0.5, 0.5], [-6, 6]);
  const imgX = useTransform(px, [-0.5, 0.5], [14, -14]);
  const imgY = useTransform(py, [-0.5, 0.5], [10, -10]);
  const sheen = useTransform(px, [-0.5, 0.5], [0.05, 0.32]);
  const glowX = useTransform(px, [-0.5, 0.5], ['38%', '62%']);

  return (
    <section
      id="hero"
      className={styles.hero}
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span className="mono-label">Portfolio — Moscow · {new Date().getFullYear()}</span>
          </motion.p>

          <h1 className={styles.name} aria-label={profile.name}>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1], delay: 0.05 }}
            >
              {profile.first}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1], delay: 0.14 }}
            >
              {profile.last}
            </motion.span>
          </h1>

          <motion.p
            className={styles.positioning}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            {profile.positioning.map((word, i) => (
              <span key={word} className={styles.pword}>
                {word}
                {i < profile.positioning.length - 1 && (
                  <span className={styles.dot} aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </motion.p>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
          >
            <MagneticButton href="#work" variant="solid">
              Selected work
            </MagneticButton>
            <MagneticButton href="#intersection" variant="link">
              The intersection <span aria-hidden="true">↓</span>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className={styles.portraitWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        >
          <motion.div
            className={styles.floating}
            style={{ ['--glow-x' as string]: glowX }}
          >
            <motion.div
              className={styles.frame}
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
            >
              <motion.div className={styles.media} style={{ x: imgX, y: imgY }}>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${import.meta.env.BASE_URL}assets/portrait/hero-portrait-sm.webp 560w, ${import.meta.env.BASE_URL}assets/portrait/hero-portrait.webp 1000w`}
                    sizes="(max-width: 900px) 78vw, 38vw"
                  />
                  <img
                    className={styles.img}
                    src={`${import.meta.env.BASE_URL}assets/portrait/hero-portrait.webp`}
                    alt={`Portrait of ${profile.name}`}
                    width={1000}
                    height={1250}
                    // LCP hint. react-dom 18.3 maps only the lowercase
                    // `fetchpriority` attribute; camelCase would be dropped
                    // with a dev warning. Spread keeps TS happy either way.
                    {...({ fetchpriority: 'high' } as Record<string, string>)}
                  />
                </picture>
              </motion.div>
              <motion.span
                className={styles.sheen}
                style={{ opacity: sheen }}
                aria-hidden="true"
              />
              <span className={styles.cornerTL} aria-hidden="true" />
              <span className={styles.cornerBR} aria-hidden="true" />
              <div className={styles.plate} aria-hidden="true">
                <span className="mono-label">M. Rafique</span>
                <span className="mono-label">55.75°N · 37.62°E</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollcue} aria-hidden="true">
        <span className="mono-label">Scroll</span>
        <span className={styles.scrollline} />
      </div>
    </section>
  );
}
