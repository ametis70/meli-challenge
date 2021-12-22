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
    <>
      <Breadcrumbs segments={data.categories} />
      <section>
        <ol>
          {data.items.map((item) => {
            // Link wrapper for inner elements
            const L: React.FC = ({ children }) => (
              <a href={`/items/${item.id}`}>{children}</a>
            )

            return (
              <li key={item.id}>
                <L>
                  <img src={item.picture} alt={`Imagen de ${item.title}`} />
                </L>

                <dl>
                  <dt>Articulo</dt>
                  <dd>
                    <L>{item.title}</L>
                  </dd>
                  <dt>Precio (${item.price.currency})</dt>
                  <dd>
                    <L>
                      {`$ ${item.price.amount}`}
                      {item.price.decimals ? `.${item.price.decimals}` : null}
                    </L>
                  </dd>
                  <dt>Envio</dt>
                  <dd>{item.free_shipping ? 'Envío gratis' : 'Consultar precio'}</dd>
                </dl>
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}

export default SearchResults
