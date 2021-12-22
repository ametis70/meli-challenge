import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { createServerContext } from 'use-sse'

import App from '../components/App'
import template from './template'

const preRender = async (req: Request, res: Response) => {
  const { ServerDataContext, resolveData } = createServerContext()

  const ServerApp: React.VFC = () => (
    <ServerDataContext>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ServerDataContext>
  )

  res.write(template.start)

  ReactDOMServer.renderToString(<ServerApp />)
  const data = await resolveData()
  const htmlStream = ReactDOMServer.renderToNodeStream(<ServerApp />)

  htmlStream.pipe(res, { end: false })
  htmlStream.on('end', () => {
    res.write(template.closeBody)
    res.write(data.toHtml())
    res.write(template.end())
    res.end()
  })
}

export default preRender
