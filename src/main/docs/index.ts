import { loginPath, signupPath } from './paths'
import { errorSchema, loginParamsSchema, userSchema, signupParamsSchema } from './schemas'
import { badRequestComponent, conflictComponent, notFoundComponent, serverErrorComponent, unauthorizedComponent } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Base project API',
    description: 'API with signup and login routes',
    version: '1.0.0'
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'User' }],
  paths: {
    '/user/login': loginPath,
    '/user/signup': signupPath 
  },
  schemas: {
    userSchema,
    loginParamsSchema,
    errorSchema,
    signupParamsSchema
  },
  components: {
    badRequestComponent,
    serverErrorComponent,
    unauthorizedComponent,
    notFoundComponent,
    conflictComponent
  }
}
