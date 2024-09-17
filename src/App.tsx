import React from 'react';
import { AlertProvider } from './providers/AlertProvider';
import { LoginProvider } from './providers/LoginProvider';
import { Pages } from './pages/Pages';

export const App = () => {
  return (
    <AlertProvider>
      <LoginProvider>
        <Pages />
      </LoginProvider>
    </AlertProvider>
  );
}

