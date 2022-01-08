import { getDecimals } from '../../util/currency'
import HttpClient, { handleMlResponseErrors } from '../../util/httpClient'
import { defaultAuthor } from '../entities/Author'
import Item from '../entities/Item'
import { ItemListGetter } from './getItemList'

// `https://api.mercadolibre.com/items/${id}`,

export type ItemGetter = (id: string) => Promise<Item>

const makeGetItem = (
  client: HttpClient,
  endpoint: string,
  itemListGetter: ItemListGetter,
) => {
  const func: ItemGetter = async (id) => {
    // Get Item by ID
    const itemResponse = await client.get<MLItem>(`${endpoint}/${id}`)
    handleMlResponseErrors(itemResponse)

    // Get description
    const descriptionResponse = await client.get<MLDescription>(
      `${endpoint}/${id}/description`,
    )
    handleMlResponseErrors(descriptionResponse)

    // Get categories
    const { categories } = await itemListGetter(itemResponse.data.title)

    const item: Item = {
      author: defaultAuthor,
      categories,
      item: {
        id: itemResponse.data.id,
        title: itemResponse.data.title,
        price: {
          currency: itemResponse.data.currency_id,
          amount: Math.floor(itemResponse.data.price),
          decimals: getDecimals(itemResponse.data.price),
        },
        picture: itemResponse.data.thumbnail.replace('http://', 'https://'),
        condition: itemResponse.data.condition,
        free_shipping: itemResponse.data.shipping.free_shipping,
        sold_quantity: itemResponse.data.sold_quantity,
        description: descriptionResponse.data.plain_text,
      },
    }

    return item
  }
  return func
}

export default makeGetItem
