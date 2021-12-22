import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Item from './Item'
import SearchResults from './SearchResults'

const App: React.VFC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<Item />} />
      </Routes>
    </>
  )
}

export default App
