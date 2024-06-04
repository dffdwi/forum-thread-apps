import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

import './styles/style.css';
import store from './states';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>,
);
