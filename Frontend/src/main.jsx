import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.jsx';
import AuthProvider from './contexts/AuthContext.jsx';
import CartProvider from './contexts/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
