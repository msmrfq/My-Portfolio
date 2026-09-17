import { createContext, useContext, useState, type ReactNode } from 'react';
import { staticSnapshot, type PortfolioSnapshot } from '../data/snapshot';

// Single source of truth for all rendered content. Every section subscribes to
// this one context, so when the snapshot changes it changes for the whole tree
// in a single commit — the guarantee against half-updated / desynced UI.
//
// Phase 1: the value is the bundled static seed and never changes. Later phases
// fetch a live snapshot and swap it in with one setState, so no consumer needs
// to change again.
const PortfolioDataContext = createContext<PortfolioSnapshot>(staticSnapshot);

/** Read the current portfolio content. */
export const usePortfolioData = () => useContext(PortfolioDataContext);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data] = useState(staticSnapshot);

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
}
