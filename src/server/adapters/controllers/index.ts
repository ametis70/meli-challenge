interface RequestQuery {
  [key: string]: undefined | string | string[] | RequestQuery | RequestQuery[]
}

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
  body: BodyType
  headers: Record<string, string>
  statusCode: number
}

export type Controller = <T>(r: HttpRequest) => Promise<HttpResponse<T>>
