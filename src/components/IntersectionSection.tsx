import { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { SectionHeading } from './primitives/SectionHeading';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { usePortfolioData } from '../context/portfolioData';
import styles from './IntersectionSection.module.css';

const CX = 50;
const CY = 50;

export function IntersectionSection() {
  const { intersectionNodes, sectionIntros } = usePortfolioData();
  const [active, setActive] = useState<string | null>(null);
  const { ref, px, py, onPointerMove, reset } = usePointerParallax(1);

  const coreX = useTransform(px, [-0.5, 0.5], [10, -10]);
  const coreY = useTransform(py, [-0.5, 0.5], [8, -8]);
  const nodeX = useTransform(px, [-0.5, 0.5], [26, -26]);
  const nodeY = useTransform(py, [-0.5, 0.5], [20, -20]);

  const clear = (id: string) =>
    setActive((a) => (a === id ? null : a));

  return (
    <section id="intersection" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={sectionIntros.intersection.eyebrow}
          title={sectionIntros.intersection.title}
          index="01 / 07"
        >
          <p className="lead">{sectionIntros.intersection.body}</p>
        </SectionHeading>

        <div
          className={styles.stage}
          ref={ref}
          onPointerMove={onPointerMove}
          onPointerLeave={() => {
            reset();
            setActive(null);
          }}
        >
          <svg
            className={styles.web}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {intersectionNodes.map((n) => (
              <line
                key={n.id}
                x1={CX}
                y1={CY}
                x2={n.x}
                y2={n.y}
                vectorEffect="non-scaling-stroke"
                className={[
                  styles.line,
                  active === n.id ? styles.lineActive : '',
                  active && active !== n.id ? styles.lineDim : '',
                ].join(' ')}
              />
            ))}
          </svg>

          <motion.div className={styles.core} style={{ x: coreX, y: coreY }}>
            <span className={styles.coreRing} aria-hidden="true" />
            <span className={styles.coreLabel}>
              Masum
              <br />
              Rafique
            </span>
          </motion.div>

          <motion.div className={styles.nodes} style={{ x: nodeX, y: nodeY }}>
            {intersectionNodes.map((n) => {
              const isActive = active === n.id;
              const dim = active !== null && !isActive;
              return (
                <div
                  key={n.id}
                  className={[
                    styles.node,
                    isActive ? styles.active : '',
                    dim ? styles.dim : '',
                  ].join(' ')}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <button
                    className={styles.orb}
                    onMouseEnter={() => setActive(n.id)}
                    onFocus={() => setActive(n.id)}
                    onMouseLeave={() => clear(n.id)}
                    onBlur={() => clear(n.id)}
                    aria-expanded={isActive}
                    aria-label={`${n.title}: ${n.items.join(', ')}`}
                  >
                    <span className={styles.orbTitle}>{n.title}</span>
                    <span className={styles.orbCount} aria-hidden="true">
                      {String(n.items.length).padStart(2, '0')}
                    </span>
                  </button>
                  <div className={styles.meta}>
                    <ul>
                      {n.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
