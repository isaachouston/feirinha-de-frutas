import React from 'react';
import history from "./routes/history";
import { Router } from "react-router-dom";
import { Routes } from './routes';
import "./styles/vars.scss";
import "./styles/globals.scss";
import { CartProvider } from './contexts/cart/CartContext';
import { UiProvider } from './contexts/ui/UiContext';
import { AuthProvider } from './contexts/auth/AuthContext';

function App() {
  return (
    <Router history={history}>
      <UiProvider>
        <CartProvider>
          <AuthProvider>
            <Routes />           
          </AuthProvider>
        </CartProvider>
      </UiProvider>
    </Router>
  );
}

export default App;
