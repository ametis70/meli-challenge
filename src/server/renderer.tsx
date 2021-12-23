import { Request, Response } from 'express'
import fs from 'fs'
import StyleContext, { InsertCSS } from 'isomorphic-style-loader/StyleContext'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { HelmetData, HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import through, { ThroughStream } from 'through'
import { createServerContext } from 'use-sse'

import App from '../components/App'
import template from './template'

const bundleFile = (() => {
  const dir = fs.readdirSync(path.join(__dirname, 'public'))
  const files = dir.filter((f) => f.match(/\.js$/))
  return files[0]
})()

const preRender = async (req: Request, res: Response) => {
  const { ServerDataContext, resolveData } = createServerContext()

  const helmetContext: { helmet?: HelmetData } = {}

  const css = new Set()
  const insertCss: InsertCSS = (...styles) =>
    styles.forEach((style) => css.add(style._getCss()))

  const ServerApp: React.VFC = () => (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={req.url}>
        <ServerDataContext>
          <StyleContext.Provider value={{ insertCss }}>
            <App />
          </StyleContext.Provider>
        </ServerDataContext>
      </StaticRouter>
    </HelmetProvider>
  )

  res.write(template.start)
  ReactDOMServer.renderToString(<ServerApp />)
  const data = await resolveData()

  ReactDOMServer.renderToNodeStream(<ServerApp />)
    .pipe(
      through(
        function write(this: ThroughStream, data) {
          const { helmet } = helmetContext
          if (helmet) {
            this.queue(helmet.title.toString())
            this.queue(helmet.meta.toString())
          }

          this.queue(`<style>${[...css].join('')}</style>`)
          this.queue(template.closeHead)

          this.queue(data)
        },
        function end(this: ThroughStream) {
          this.queue(template.closeBody)
          this.queue(data.toHtml())
          this.queue(
            template.end(
              process.env.NODE_ENV !== 'production'
                ? 'http://localhost:8000/bundle.js'
                : `/public/${bundleFile}`,
            ),
          )
          this.queue(null)
        },
      ),
    )
    .pipe(res)
}

export default preRender
