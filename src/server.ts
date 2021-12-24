import axios from 'axios'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import apiRouter from './server/api'
import preRender from './server/renderer'
import { getPort } from './util/port'

const port = getPort()
axios.defaults.baseURL = `http://localhost:${port}`

const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(compression())
app.use(morgan('tiny'))

const start = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const { default: cors } = await import('cors')
    app.use(cors())
  }

  app.use('/api', apiRouter)
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', preRender)

  app.listen(port, () => {
    console.info(`Server is running on port ${port}`)
  })
}

start()
