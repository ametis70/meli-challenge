import useStyles from 'isomorphic-style-loader/useStyles'
import { Route, Routes } from 'react-router-dom'

import s from '../styles/index.scss'
import Header from './Header'
import Item from './Item'
import SearchResults from './SearchResults'

const App: React.VFC = () => {
  useStyles(s)

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
