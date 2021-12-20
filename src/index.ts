import express from 'express'

import apiRouter from './server/api'

const app = express()

app.use('/api', apiRouter)

app.get('*', (_, res) => {
  res.send('Server running')
})

const port = process.env.PORT
if (port && typeof port !== 'number') {
  console.warn(`PORT env var (${port}) is not a number, falling back to port 3000`)
}

app.listen(port && typeof port === 'number' ? port : 3000)
