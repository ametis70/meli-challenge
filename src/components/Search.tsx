const Search: React.VFC = () => {
  return (
    <form method="get" action="/items" className="search-container">
      <input
        id="search-box"
        type="text"
        name="search"
        aria-label="Campo de búsqueda"
        placeholder="Nunca dejes de buscar"
      />
      <label htmlFor="search-button" aria-hidden="true" className="search-button" />
      <input id="search-button" hidden type="submit" value="Buscar" />
    </form>
  )
}

export default Search
