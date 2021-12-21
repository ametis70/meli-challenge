import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from './components/App'

const renderRouter = (url: string): string => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export default renderRouter
