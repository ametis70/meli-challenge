import { Request, Response } from 'express'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { createServerContext } from 'use-sse'

import App from '../components/App'
import template from './template'

const preRender = async (req: Request, res: Response) => {
  const { ServerDataContext, resolveData } = createServerContext()

  const css = new Set()
  const insertCss = (...styles: any) =>
    styles.forEach((style: any) => css.add(style._getCss()))

  const ServerApp: React.VFC = () => (
    <ServerDataContext>
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </StyleContext.Provider>
    </ServerDataContext>
  )

  res.write(template.start)

  ReactDOMServer.renderToString(<ServerApp />)

  res.write(`<style>${[...css].join('')}</style>`)
  res.write(template.closeHead)

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
