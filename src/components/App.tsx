import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Item from './Item'
import SearchResults from './SearchResults'

const App: React.VFC = () => {
  return (
    <html>
      <head>
        <title>Challenge MELI</title>
      </head>
      <body>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/items/:id" element={<Item />} />
        </Routes>
      </body>
    </html>
  )
}

export default App
