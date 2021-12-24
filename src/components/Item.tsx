import { useParams } from 'react-router-dom'

import useApi from '../hooks/useApi'
import Breadcrumbs from './Breadcrumbs'
import Price from './Price'
import SEO from './SEO'

const translations: Record<string, string> = {
  used: 'Usado',
  new: 'Nuevo',
}

const Item: React.VFC = () => {
  const { id } = useParams()

  const data = useApi<ItemResponse>(`/api/items/${id}`)

  if (!data) {
    return null
  }

  if (!data.item) {
    return <p className="message"> Producto no encontrado </p>
  }

  const { item } = data

  let descriptionExcerpt = 'Este producto no tiene descripción'

  if (item.description) {
    descriptionExcerpt = item.description.split('\n')[0]
    descriptionExcerpt =
      descriptionExcerpt.length > 280
        ? `${descriptionExcerpt.slice(0, 280)}...`
        : descriptionExcerpt
  }

  return (
    <>
      <SEO
        title={item.title ?? 'Producto no encontrado'}
        description={descriptionExcerpt}
        image={item.picture ?? undefined}
      >
        {item.title && item.picture && item.picture ? (
          <script type="application/ld+json">
            {`{
"@context": "https://www.schema.org",
"@type": "product",
"image": "${item.picture}",
"name": "${item.title}",
"description": "${descriptionExcerpt}",
"offers": {
  "@type": "Offer",
  "price": "${item.price.amount}.${item.price.decimals}",
  "priceCurrency": "${item.price.currency}"
}
}`}
          </script>
        ) : null}
      </SEO>
      <main className="container">
        <Breadcrumbs segments={data.categories} />
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
