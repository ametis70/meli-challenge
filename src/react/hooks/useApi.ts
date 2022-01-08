import axios from 'axios'
import { useSSE } from 'use-sse'

const useApi = <T>(endpoint: string): T => {
  const [data] = useSSE<T>(async () => {
    try {
      const { data } = await axios.get(endpoint)
      return data
    } catch (e) {
      return null
    }
  }, [endpoint])

  return data
}

export default useApi
