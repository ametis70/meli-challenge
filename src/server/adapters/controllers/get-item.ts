import { ItemGetter } from '../../use-cases/getItem'
import { HttpRequest } from '.'

const makeGetItem = (getItem: ItemGetter) => {
  return async (r: HttpRequest) => {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const body = await getItem(r.params.id)
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
}

export default makeGetItem
