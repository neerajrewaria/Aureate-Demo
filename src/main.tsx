/*
  AUREATE — Application Entry Point
  =====================================
  This is where React mounts the app to the DOM.

  Global providers are wrapped here so every component in the tree
  can access them without prop-drilling:
  - BrowserRouter: enables React Router navigation
  - CartProvider: provides cart state via useCart() hook
*/

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found. Check index.html has <div id="root">.');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
