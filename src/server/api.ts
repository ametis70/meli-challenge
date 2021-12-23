import axios, { AxiosError } from 'axios'
import { Request, Response, Router } from 'express'

import { getDecimals } from '../util/currency'

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
    const { data } = await axios.get<MLItemsQuery | MLError>(
      encodeURI(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`),
    )

    if ('error' in data) {
      throw new Error(data.message)
    }

    if (data.results.length === 0) {
      const err = new Error() as AxiosError
      err.response = {}
      err!.response!.status = 404
      throw err
    }

    const items = data.results.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: getDecimals(item.price),
      },
      picture: item.thumbnail.replace('http://', 'https://'),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }))

    const categories = data?.filters
      .find((filter) => filter.id === 'category')
      ?.values[0].path_from_root.map(
        (breadcrumb: { id: string; name: string }) => breadcrumb.name,
      )

    const resJson: ItemsQuery = {
      author,
      categories,
      items,
    }

    res.json(resJson)
  } catch (e) {
    const s = (e as AxiosError)?.response?.status ?? 500
    res.status(200).json({ error: s })
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
          decimals: getDecimals(itemData.price),
        },
        picture: itemData.thumbnail.replace('http://', 'https://'),
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: itemDescription.plain_text,
      },
    }

    res.json(resJson)
  } catch (e) {
    console.log(e)
    const s = (e as AxiosError)?.response?.status ?? 500
    res.status(200).json({ error: s })
  }
})

export default apiRouter
