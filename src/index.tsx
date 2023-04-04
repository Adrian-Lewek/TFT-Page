import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/TFT-Page'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
