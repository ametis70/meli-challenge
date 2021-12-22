import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useSSE } from 'use-sse'

import Breadcrumbs from './Breadcrumbs'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')

  const [data] = useSSE<ItemsQuery>(async () => {
    try {
      const { data } = await axios.get(`/api/items?q=${query}`)
      return data
    } catch (e) {
      return null
    }
  }, [query])

  if (!data || !data.items || data.items.length === 0) {
    return <p> No hay resultados </p>
  }

  return (
    <main className="container">
      <Breadcrumbs segments={data.categories} />
      <section className="content-box">
        <ol>
          {data.items.map((item, i) => {
            // Link wrapper for inner elements
            const L: React.FC = ({ children }) => (
              <a href={`/items/${item.id}`}>{children}</a>
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
                        {`$ ${item.price.amount}`}
                        {item.price.decimals ? `.${item.price.decimals}` : null}
                        {item.free_shipping ? (
                          <span className="shipping-badge" aria-hidden="true" />
                        ) : null}
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
  )
}

export default SearchResults
