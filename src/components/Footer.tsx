import { usePortfolioData } from '../context/portfolioData';
import styles from './Footer.module.css';

const YEAR = new Date().getFullYear();

export function Footer() {
  const { navItems, profile } = usePortfolioData();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.mark}>MR</span>
          <div>
            <p className={styles.name}>{profile.name}</p>
            <p className={styles.tag}>{profile.positioning.join(' · ')}</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={styles.navLink}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className={styles.meta}>
          <span className="mono-label">
            © {YEAR} {profile.name}
          </span>
          <span className="mono-label">Moscow · 55.75°N · 37.62°E</span>
        </div>
      </div>
    </footer>
  );
}
