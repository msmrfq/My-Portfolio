import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Certificate } from '../data';
import { Lightbox } from '../components/Lightbox';
import { usePortfolioData } from './portfolioData';

interface ViewerApi {
  open: (id: string) => void;
}

const Ctx = createContext<ViewerApi>({ open: () => {} });

export const useCertificateViewer = () => useContext(Ctx);

/**
 * Single source of the certificate lightbox. Both the Academic Distinctions
 * centerpiece (§17) and the Archive grid (§18) call `open(id)` to view a
 * certificate; only one Lightbox instance is ever mounted.
 */
export function CertificateViewerProvider({ children }: { children: ReactNode }) {
  const { certificates } = usePortfolioData();
  const [active, setActive] = useState<Certificate | null>(null);

  const open = useCallback(
    (id: string) => {
      const found = certificates.find((c) => c.id === id);
      if (found) setActive(found);
    },
    [certificates],
  );

  const close = useCallback(() => setActive(null), []);
  const api = useMemo<ViewerApi>(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <AnimatePresence>
        {active && <Lightbox key={active.id} cert={active} onClose={close} />}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
