import { Request, Response } from 'express'

import { Controller, HttpRequest } from '../server/adapters/controllers'

const makeExpressCallback = <T = any>(controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        'User-Agent': req.get('User-Agent'),
      },
    }

    try {
      const response = await controller<T>(httpRequest)

      if (response.headers) {
        res.set(response.headers)
      }

      if (response.headers['Content-Type'] === 'application/json') {
        res.type('json')
      }

      res.status(response.statusCode).send(response.body)
    } catch {
      res.status(500).send({ error: 'An unkown error occurred.' })
    }
  }
}

export default makeExpressCallback
