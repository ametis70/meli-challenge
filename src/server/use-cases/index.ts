import axios from 'axios'

import makeGetItem from './getItem'
import makeGetItemList from './getItemList'

export const getItemList = makeGetItemList(
  axios,
  'https://api.mercadolibre.com/sites/MLA/search?q=',
)

export const getItem = makeGetItem(
  axios,
  'https://api.mercadolibre.com/items',
  getItemList,
)
