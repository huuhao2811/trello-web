import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfirmProvider defaultOptions={{
      dialogProps: { maxWidth: 'xs' },
      confirmationButtonProps: { color: 'primary', variant: 'outlined' },
      cancellationButtonProps: { color: 'inherit' },
      allowClose: false
    }}>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </ConfirmProvider>
  </React.StrictMode>
)
