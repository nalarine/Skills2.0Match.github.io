import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { NextUIProvider } from '@nextui-org/react'
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <BrowserRouter>
        <Suspense>
          <App />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
  </HelmetProvider>,
)
