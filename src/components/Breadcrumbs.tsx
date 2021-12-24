import { Link } from 'react-router-dom'

const Breadcrumbs: React.VFC<{ segments: string[] }> = ({ segments }) => {
  if (!segments || segments.length <= 0) {
    return null
  }

  return (
    <nav>
      <ol className="breadcrumbs-list">
        {segments.map((segment) => (
          <li key={segment}>
            <Link to={encodeURI(`/items?search=${segment}`)}>{segment}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
