import Author from './Author'
import Price from './Price'

type ItemList = {
  error?: number
  author: Author
  categories: string[]
  items: Array<{
    id: string
    title: string
    price: Price
    picture: string
    condition: string
    free_shipping: boolean
  }>
}

export default ItemList
