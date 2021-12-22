import axios from 'axios'
import express from 'express'

import apiRouter from './server/api'
import preRender from './server/renderer'
import { getPort } from './util/port'

const port = getPort()
axios.defaults.baseURL = `http://localhost:${port}`

const app = express()

const start = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const { default: cors } = await import('cors')
    app.use(cors())
  }

  app.use('/api', apiRouter)
  app.use(express.static('public'))
  app.get('*', preRender)

  app.listen(port, () => {
    console.info(`Server is running on port ${port}`)
  })
}

start()
