import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSSE } from 'use-sse'

import Breadcrumbs from './Breadcrumbs'

const translations: Record<string, string> = {
  used: 'Usado',
  new: 'Nuevo',
}

const Item: React.VFC = () => {
  const { id } = useParams()

  const [data] = useSSE<ItemResponse>(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/items/${id}`)
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
      <Breadcrumbs segments={[]} />
      <article>
        <section>
          <img src={item.picture} alt={`Imagen de ${item.title}`} />
          <small>
            {translations[item.condition]}
            {item.sold_quantity ? ` - ${item.sold_quantity} vendidos` : null}
          </small>
          <h1>{item.title}</h1>
          <p aria-label="Precio">
            {`$ ${item.price.amount}`}
            {item.price.decimals ? `.${item.price.decimals}` : null}
          </p>
          <a rel="noreferrer" target="_blank" href="https://mercadolibre.com.ar">
            Comprar
          </a>
        </section>

        <section>
          <h2>Descripción del producto</h2>
          <p>{item.description ?? 'Este producto no tiene descripción'}</p>
        </section>
      </article>
    </>
  )
}

export default Item
