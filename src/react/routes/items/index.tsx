import { Link, useSearchParams } from 'react-router-dom'

import ItemsList from '../../../server/entities/ItemList'
import Breadcrumbs from '../../components/Breadcrumbs'
import Price from '../../components/Price'
import SEO from '../../components/SEO'
import useApi from '../../hooks/useApi'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')

  const data = useApi<ItemsList>(`/api/items?q=${query}`)

  if (!data) {
    return null
  }

  if (data.error || !data.items || data.items.length === 0) {
    return (
      <p className="message">
        {data.error === 404 ? 'No hay resultados' : 'Ocurrió un error inesperado'}
      </p>
    )
  }

  return (
    <>
      <SEO title={(query ? `${decodeURI(query)} | ` : '') + 'Búsqueda'} />
      <main className="container">
        <Breadcrumbs segments={data.categories} />
        <section className="content-box">
          <ol>
            {data.items.map((item, i) => {
              // Link wrapper for inner elements
              const L: React.FC = ({ children }) => (
                <Link to={`/items/${item.id}`}>{children}</Link>
              )

              return (
                <li key={item.id} className="search-item">
                  <div className="search-item-flex">
                    <L>
                      <img src={item.picture} alt={`Imagen de ${item.title}`} />
                    </L>

                    <dl>
                      <dt>Precio (${item.price.currency})</dt>
                      <dd className="search-price">
                        <L>
                          <Price price={item.price}>
                            <span className="shipping-badge" aria-hidden="true" />
                          </Price>
                        </L>
                      </dd>

                      <dt>Envio</dt>
                      <dd className="visually-hidden">
                        {item.free_shipping ? 'Envío gratis' : 'Consultar precio'}
                      </dd>

                      <dt>Articulo</dt>
                      <dd>
                        <L>{item.title}</L>
                      </dd>
                    </dl>
                  </div>
                  {i < data.items.length - 1 ? <hr /> : null}
                </li>
              )
            })}
          </ol>
        </section>
      </main>
    </>
  )
}

export default SearchResults
