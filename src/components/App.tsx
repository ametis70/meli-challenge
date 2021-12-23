import useStyles from 'isomorphic-style-loader/useStyles'
import { Route, Routes } from 'react-router-dom'

import s from '../styles/index.scss'
import Header from './Header'
import Item from './Item'
import SearchResults from './SearchResults'
import SEO from './SEO'

const App: React.VFC = () => {
  useStyles(s)

  return (
    <>
      <SEO />
      <Header />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<Item />} />
        <Route path="*" element={<p className="message">Página no encontrada</p>} />
      </Routes>
    </>
  )
}

export default App
