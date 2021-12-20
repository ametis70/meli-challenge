import axios from 'axios'
import { Request, Response, Router } from 'express'

const apiRouter = Router()

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
      author: {
        name: 'Ian',
        lastname: 'Mancini',
      },
      categories,
      items,
    }

    res.json(resJson)
  } catch (e) {
    console.error(e)
    res.status(500).send('Internal server error')
  }
})

export default apiRouter
