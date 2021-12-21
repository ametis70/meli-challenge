import express from 'express'

import apiRouter from './server/api'
import preRender from './server/renderer'

const app = express()

app.use('/api', apiRouter)

app.get('*', async (req, res) => {
  const html = await preRender(req.url)
  res.send('<!DOCTYPE html>' + html)
})

let port = 3000
if (process.env.PORT !== undefined) {
  const _port = parseInt(process.env.PORT)
  if (isNaN(_port)) {
    console.warn(
      `PORT env var (${process.env.PORT}) is not a number, falling back to port 3000`,
    )
  } else {
    port = _port
  }
}

app.listen(port, () => {
  console.info(`Server is running on port ${port}`)
})
