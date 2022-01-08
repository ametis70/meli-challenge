import { getItem, getItemList } from '../../use-cases'
import { RequestQuery } from '../../use-cases/getItem'
import makeGetItem from './get-item'
import makeGetItemList from './get-items'

export interface HttpRequest<BodyType = Record<string, any>> {
  body: BodyType
  query: RequestQuery
  params: Record<string, string>
  ip: string
  method: string
  path: string
  headers: Record<string, string | undefined>
}

export interface HttpResponse<BodyType = Record<string, any>> {
  body?: BodyType
  headers: Record<string, string>
  statusCode: number
}

export type Controller<T> = (r: HttpRequest) => Promise<HttpResponse<T>>

export const getItemController = makeGetItem(getItem)
export const getItemListController = makeGetItemList(getItemList)
