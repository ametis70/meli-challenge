import axios from 'axios'
import { Request, Response, Router } from 'express'

const apiRouter = Router()

const author = {
  name: 'Ian',
  lastname: 'Mancini',
}

apiRouter.get('/items', async (req: Request, res: Response) => {
  const { q } = req.query

  if (!q) {
    res.status(400).send('Invalid request')
  }

  try {
    const { data } = await axios.get<MLItemsQueryResponse>(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`,
    )

    const items = data.results.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: parseInt((item.price % 1).toFixed(2).substring(2)),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }))

    const categories = data?.filters
      .find((filter) => filter.id === 'category')
      ?.values[0].path_from_root.map(
        (breadcrumb: { id: string; name: string }) => breadcrumb.name,
      )

    const resJson: ItemsQueryResponse = {
      author,
      categories,
      items,
    }

    res.json(resJson)
  } catch (e) {
    console.error(e)
    res.status(500).send('Internal server error')
  }
})

apiRouter.get('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    res.status(400).send('Invalid request')
  }

  try {
    const { data: itemData } = await axios.get<MLItem | MLError>(
      `https://api.mercadolibre.com/items/${id}`,
    )

    // Shortcut on error
    if ('error' in itemData) {
      if (itemData.error === 'resource not found') {
        return res.send(404).send('Not found')
      }
      throw new Error(itemData.error)
    }

    const { data: itemDescription } = await axios.get<MLDescription | MLError>(
      `https://api.mercadolibre.com/items/${id}/description`,
    )

    if ('error' in itemDescription) {
      throw new Error(itemDescription.error)
    }

    const resJson: ItemResponse = {
      author,
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.floor(itemData.price),
          decimals: parseInt((itemData.price % 1).toFixed(2).substring(2)),
        },
        picture: itemData.thumbnail,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: itemDescription.plain_text,
      },
    }

    res.json(resJson)
  } catch (e) {
    console.error(e)
    res.send(500).send('Internal server error')
  }
})

export default apiRouter
