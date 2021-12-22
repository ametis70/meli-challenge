import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createBroswerContext } from 'use-sse'

import App from './components/App'

const BroswerDataContext = createBroswerContext()

ReactDOM.hydrate(
  <React.StrictMode>
    <BroswerDataContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BroswerDataContext>
  </React.StrictMode>,
  document.getElementById('app'),
)
