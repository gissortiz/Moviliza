import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext.jsx';
import CartProvider from './contexts/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
