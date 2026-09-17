import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import { usePortfolioData } from '../context/portfolioData';
import styles from './Navigation.module.css';

export function Navigation() {
  const { navItems, profile } = usePortfolioData();
  const sectionIds = navItems.map((n) => n.id);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(['hero', ...sectionIds]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.solid : ''}`}>
        <div className={styles.inner}>
          <a href="#hero" className={styles.brand} aria-label="Masum Rafique — top">
            <span className={styles.mark}>MR</span>
            <span className={styles.wordmark}>{profile.name}</span>
          </a>

          <nav className={styles.links} aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.link} ${active === item.id ? styles.active : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={styles.cta}>
            Contact
          </a>

          <button
            className={styles.burger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span data-open={menuOpen} />
            <span data-open={menuOpen} />
          </button>
        </div>

        <motion.div
          className={styles.progress}
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <nav className={styles.overlayNav} aria-label="Mobile">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.4 }}
                >
                  <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className={styles.overlayFoot}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
