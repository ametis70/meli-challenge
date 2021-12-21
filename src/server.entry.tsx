import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { createServerContext } from 'use-sse'

import App from './components/App'

const renderRouter = async (url: string): Promise<string> => {
  const { ServerDataContext, resolveData } = createServerContext()

  const renderToString = () =>
    ReactDOMServer.renderToString(
      <ServerDataContext>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ServerDataContext>,
    )

  // First render
  renderToString()

  const data = await resolveData()
  return renderToString()
}

export default renderRouter
