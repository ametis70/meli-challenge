const Search: React.VFC = () => {
  return (
    <form method="get" action="/items">
      <input id="search-box" type="text" name="search" aria-label="Campo de búsqueda" />
      <input type="submit" value="Buscar" />
    </form>
  )
}

export default Search
