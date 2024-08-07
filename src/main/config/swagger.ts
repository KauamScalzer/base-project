import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import swaggerConfig from '@/main/docs'
import { noCache } from '../middlewares'

export default (app: Express): void => {
  app.use('/api-docs', serve, noCache, setup(swaggerConfig))
}
