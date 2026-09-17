import { MotionConfig } from 'framer-motion';
import { GrainOverlay } from './components/GrainOverlay';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CredentialStrip } from './components/CredentialStrip';
import { IntersectionSection } from './components/IntersectionSection';
import { KeyStatement } from './components/KeyStatement';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { AcademicDistinctions } from './components/AcademicDistinctions';
import { LanguageOrbit } from './components/LanguageOrbit';
import { CertificateArchive } from './components/CertificateArchive';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CertificateViewerProvider } from './context/certificateViewer';

export default function App() {
  return (
    // reducedMotion="user" disables transform/layout animations (the rise, scale,
    // and slide entrances) when the OS requests it, while leaving opacity fades
    // intact — so content still appears gently, just without vestibular motion.
    <MotionConfig reducedMotion="user">
      <CertificateViewerProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GrainOverlay />
        <Navigation />
        <main id="main">
          <Hero />
          <CredentialStrip />
          <IntersectionSection />
          <KeyStatement />
          <ProjectShowcase />
          <ExperienceTimeline />
          <Education />
          <AcademicDistinctions />
          <LanguageOrbit />
          <CertificateArchive />
          <About />
          <Contact />
        </main>
        <Footer />
      </CertificateViewerProvider>
    </MotionConfig>
  );
}
