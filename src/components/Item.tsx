import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSSE } from 'use-sse'

import Breadcrumbs from './Breadcrumbs'
import Price from './Price'
import SEO from './SEO'

const translations: Record<string, string> = {
  used: 'Usado',
  new: 'Nuevo',
}

const Item: React.VFC = () => {
  const { id } = useParams()

  const [data] = useSSE<ItemResponse>(async () => {
    try {
      const { data } = await axios.get(`/api/items/${id}`)
      return data
    } catch (e) {
      return null
    }
  }, [id])

  if (!data || !data.item) {
    return <p> Producto no encontrado </p>
  }

  const { item } = data

  return (
    <>
      <SEO
        title={item.title ?? 'Articulo no encontrado'}
        description={item.description ?? 'Este articulo no tiene descripción'}
        image={item.picture ?? undefined}
      />
      <main className="container">
        <Breadcrumbs segments={[]} />
        <article className="content-box">
          <h1 className="visually-hidden">{item.title}</h1>
          <div className="details-flex">
            <aside>
              <small className="metadata">
                {translations[item.condition]}
                {item.sold_quantity ? ` - ${item.sold_quantity} vendidos` : null}
              </small>
              <h1 className="title" aria-hidden="true">
                {item.title}
              </h1>
              <div className="price" aria-label="Precio">
                <Price price={item.price} />
              </div>
              <a
                className="cta"
                rel="noreferrer"
                target="_blank"
                href={`https://articulo.mercadolibre.com.ar/MLA-${item.id.substring(3)}`}
              >
                Comprar
              </a>
            </aside>

            <section>
              <img src={item.picture} alt={`Imagen de ${item.title}`} />
              <h2>Descripción del producto</h2>
              {!item.description
                ? 'Este producto no tiene descripción'
                : item.description
                    .split('\n')
                    .map((item, key) => <p key={key}>{item}</p>)}
            </section>
          </div>
        </article>
      </main>
    </>
  )
}

export default Item
