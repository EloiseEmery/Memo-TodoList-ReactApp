import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Appli from './composants/Appli';

const eltRacine = ReactDOM.createRoot(document.getElementById('racine'));
eltRacine.render(
  <React.StrictMode>
    <Appli />
  </React.StrictMode>
);