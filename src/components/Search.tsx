import { FormEvent, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Search: React.VFC = () => {
  const [searchParams] = useSearchParams()
  const searchValue = searchParams.get('search')
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (ref.current && !searchValue) {
      ref.current.value = ''
    }
  }, [searchValue, ref])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (ref.current && ref.current.value !== '') {
      navigate(`/items?search=${encodeURI(ref.current.value)}`)
    }
  }

  return (
    <form
      method="get"
      action="/items"
      className="search-container"
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        id="search-box"
        type="text"
        name="search"
        aria-label="Campo de búsqueda"
        placeholder="Nunca dejes de buscar"
        defaultValue={searchValue ? decodeURI(searchValue) : undefined}
      />
      <label htmlFor="search-button" aria-hidden="true" className="search-button" />
      <input id="search-button" hidden type="submit" value="Buscar" />
    </form>
  )
}

export default Search
