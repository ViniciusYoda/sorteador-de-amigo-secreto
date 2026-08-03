import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Cabecalho from './componentes/Cabecalho';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Cabecalho />
    <App />
  </React.StrictMode>,
);
