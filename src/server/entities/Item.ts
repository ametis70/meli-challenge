import Author from './Author'
import Price from './Price'

type Item = {
  author: Author
  categories: string[]
  item: {
    id: string
    title: string
    price: Price
    picture: string
    condition: string
    free_shipping: boolean
    sold_quantity: number
    description: string
  }
}

export default Item
