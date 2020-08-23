import React from 'react';
import {
  transitions,
  positions,
  Provider as AlertProvider,
  AlertProviderProps,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import '../styles/globals.scss';

const options: Omit<AlertProviderProps, 'template'> = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '20px',
  transition: transitions.FADE,
};

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Component {...pageProps} />
    </AlertProvider>
  );
}

export default MyApp;
