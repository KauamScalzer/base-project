import { Router } from 'express'
import { adaptRouteExpress } from './../adapters'
import { makeSignUpUserController, makeLoginUserController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/user/signup', adaptRouteExpress(makeSignUpUserController()))
  router.post('/user/login', adaptRouteExpress(makeLoginUserController()))
}
