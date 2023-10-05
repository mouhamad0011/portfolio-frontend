import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import APP from './Appdashboard.js';
import LoginPage from './LoginPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<APP/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
