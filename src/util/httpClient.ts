interface HttpClientResponse<T = any> {
  data: T
  status: number
  statusText: string
}

interface HttpClient {
  get<T = any, R = HttpClientResponse<T>>(url: string): Promise<R>
}

export function handleMlResponseErrors(response: HttpClientResponse) {
  const { status, data } = response
  // Throw on HTTP errors
  if (status >= 400) {
    throw new Error(`Error in HTTP request: ${status}`)
  }

  // Throw on API errors
  if ('error' in data) {
    const { error } = data as unknown as MLError
    switch (error) {
      case 'resource not found':
        throw new Error('Item not found')
      default:
        throw new Error(`Unknown Error in HTTP response body: ${error}`)
    }
  }
}

export default HttpClient
