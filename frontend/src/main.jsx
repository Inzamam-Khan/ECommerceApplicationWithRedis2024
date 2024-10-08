import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './AuthContext/authContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <AuthContextProvider>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </AuthContextProvider>
  </Provider>
  
)
