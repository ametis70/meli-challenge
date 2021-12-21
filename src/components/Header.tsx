import { Link } from 'react-router-dom'

import Search from './Search'

const logoUrl =
  'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.2/mercadolibre/logo__large_plus.png'

const Header: React.VFC = () => {
  return (
    <header>
      <Link to="/">
        <img src={logoUrl} alt="Logo de MercadoLibre" />
      </Link>
      <Search />
    </header>
  )
}

export default Header
