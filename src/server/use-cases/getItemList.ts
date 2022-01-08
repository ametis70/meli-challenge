import { getDecimals } from '../../util/currency'
import getCategories from '../../util/getCategories'
import HttpClient from '../../util/httpClient'
import { handleMlResponseErrors } from '../../util/httpClient'
import { defaultAuthor } from '../entities/Author'
import ItemList from '../entities/ItemList'

// https://api.mercadolibre.com/sites/MLA/search?q=${search}

export type ItemListGetter = (search: string) => Promise<ItemList>

const makeGetItemList = (client: HttpClient, endpoint: string) => {
  const func: ItemListGetter = async (search) => {
    const response = await client.get<MLItemsQuery>(`${endpoint}?q=${search}`)
    handleMlResponseErrors(response)

    if (response.data.results.length === 0) {
      throw new Error('No results for search query')
    }

    const { data } = response

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

    const categories = getCategories(data)

    return {
      author: defaultAuthor,
      categories,
      items,
    }
  }

  return func
}

export default makeGetItemList
