import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
// 1. Import Provider and your store
import { Provider } from 'react-redux'
import { store } from './app/store' // Make sure this path points to your store.js

createRoot(document.getElementById('root')).render(
  // 2. Wrap everything inside the Provider
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);