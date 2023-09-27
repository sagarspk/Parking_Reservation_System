import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App2 />
    </BrowserRouter>
  </React.StrictMode>
);
