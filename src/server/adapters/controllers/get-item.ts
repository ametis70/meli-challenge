import Item from '../../entities/Item'
import { ItemGetter } from '../../use-cases/getItem'
import { Controller } from '.'

const makeGetItem = (getItem: ItemGetter) => {
  const c: Controller<Item> = async (request) => {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const body = await getItem(request.params.id)
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

export default makeGetItem
