import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/normalize.scss';
import './scss/index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
