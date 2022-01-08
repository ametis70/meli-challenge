import ItemList from '../../entities/ItemList'
import { ItemListGetter } from '../../use-cases/getItemList'
import { Controller } from '.'

const makeGetItemList = (getItemList: ItemListGetter) => {
  const c: Controller<ItemList> = async (request) => {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const { q } = request.query

      const body = await getItemList(q)
      return {
        headers,
        statusCode: 200,
        body,
      }
    } catch (e: any) {
      console.error(e)
      return {
        headers,
        statusCode: 500,
      }
    }
  }
  return c
}

export default makeGetItemList
