import useStyles from 'isomorphic-style-loader/useStyles'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import SEO from './components/SEO'
import NotFound from './routes/404'
import SearchResults from './routes/items'
import Item from './routes/items/[id]'
import s from './styles/index.scss'

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
