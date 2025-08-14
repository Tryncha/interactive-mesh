import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MeshProvider } from './context/MeshContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <MeshProvider>
    <App />
  </MeshProvider>
  // </StrictMode>
);
