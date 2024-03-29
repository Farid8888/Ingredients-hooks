import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './auth-context/auth-context'

const root = createRoot( document.getElementById('root'))

root.render(
  <AuthContextProvider>
     <App />
  </AuthContextProvider>
    
);


