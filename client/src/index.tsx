import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Banks from './pages/Banks';

import './index.css';
import BanksMap from './BanksMap';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='banks/:lng/:lat' element={<BanksMap />} />
    </Routes>
  </BrowserRouter>
);
