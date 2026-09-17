import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/base.css';
import App from './App';
import { PortfolioDataProvider } from './context/portfolioData';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <PortfolioDataProvider>
      <App />
    </PortfolioDataProvider>
  </StrictMode>,
);
