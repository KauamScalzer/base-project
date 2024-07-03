import { Router } from 'express'
import { adaptRouteExpress } from './../adapters'
import { makeSignUpUserController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/user/signup', adaptRouteExpress(makeSignUpUserController()))
}
