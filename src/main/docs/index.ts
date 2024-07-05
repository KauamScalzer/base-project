import { loginPath } from './paths'
import { errorSchema, loginParamsSchema, userSchema } from './schemas'
import { badRequestComponent, notFoundComponent, serverErrorComponent, unauthorizedComponent } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Base project API',
    description: 'API with signup and login routes',
    version: '1.0.0'
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'User' }],
  paths: { '/user/login': loginPath },
  schemas: {
    userSchema,
    loginParamsSchema,
    errorSchema
  },
  components: {
    badRequestComponent,
    serverErrorComponent,
    unauthorizedComponent,
    notFoundComponent
  }
}
