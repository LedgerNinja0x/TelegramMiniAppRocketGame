import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'
import React from 'react'

hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('react-app')
)
