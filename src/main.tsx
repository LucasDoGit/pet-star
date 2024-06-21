import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CartProvider from './contexts/CartContext.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
      <App />
    </CartProvider>
  </React.StrictMode>,
)
