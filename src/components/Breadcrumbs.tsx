const Breadcrumbs: React.VFC<{ segments: string[] }> = ({ segments }) => {
  if (!segments || segments.length <= 0) {
    return null
  }

  return (
    <nav>
      <ol>
        {segments.map((segment) => (
          <li key={segment}>
            <a href={encodeURI(`/items?q=${segment}`)}>{segment}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
