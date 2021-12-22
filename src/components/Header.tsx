import { Link } from 'react-router-dom'

import Search from './Search'

const Header: React.VFC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-flex">
          <Link to="/">
            <img className="logo" src="/img/logo.png" alt="Logo de MercadoLibre" />
          </Link>
          <Search />
        </div>
      </div>
    </header>
  )
}

export default Header
