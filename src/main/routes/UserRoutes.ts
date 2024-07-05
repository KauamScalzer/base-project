import { Router } from 'express'
import { adaptRouteExpress } from '@/main/adapters'
import { makeSignUpUserController, makeLoginUserController } from '@/main/factories'

export default (router: Router): void => {
  router.post('/user/signup', adaptRouteExpress(makeSignUpUserController()))
  router.post('/user/login', adaptRouteExpress(makeLoginUserController()))
}
