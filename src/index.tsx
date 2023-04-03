import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename='/TFT-Page'>
      <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
);
