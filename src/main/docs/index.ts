import { LoginPath } from '@/main/docs/paths'
import { loginParamsSchema, userSchema } from '@/main/docs/schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Base project API',
    description: 'API with signup and login routes',
    version: '1.0.0'
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Login' }],
  paths: { '/user/login': LoginPath },
  schemas: {
    userSchema,
    loginParamsSchema 
  }
}
