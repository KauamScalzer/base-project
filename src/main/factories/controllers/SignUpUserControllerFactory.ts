import { SignUpUserController } from '../../../presentation/controllers'
import { makeAuthorizeUser, makeCreateUser } from '../usecases'

export const makeSignUpUserController = (): SignUpUserController => {
  return new SignUpUserController(makeCreateUser(), makeAuthorizeUser())
}
