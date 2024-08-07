import { Request, Response } from 'express'
import { Controller } from '@/presentation/protocols'

export const adaptRouteExpress = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      ...(req.body || {}),
      ...(req.query || {}),
      ...(req.params || {})
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}
