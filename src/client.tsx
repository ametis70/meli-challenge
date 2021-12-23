import StyleContext, { InsertCSS } from 'isomorphic-style-loader/StyleContext'
import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { createBroswerContext } from 'use-sse'

import App from './components/App'

const BroswerDataContext = createBroswerContext()

const insertCss: InsertCSS = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss())
  return () => removeCss.forEach((dispose) => dispose())
}

ReactDOM.hydrate(
  <React.StrictMode>
    <HelmetProvider>
      <BroswerDataContext>
        <StyleContext.Provider value={{ insertCss }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StyleContext.Provider>
      </BroswerDataContext>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('app'),
)
