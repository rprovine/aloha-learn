console.log('Main.tsx is loading...');

const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.innerHTML = '<h1>Testing: Aloha Learn</h1><p>If you see this, JavaScript is working!</p>';
} else {
  console.error('Root element not found!');
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

setTimeout(() => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}, 100);
