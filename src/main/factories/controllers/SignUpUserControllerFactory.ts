import { SignUpUserController } from '@/presentation/controllers'
import { makeAuthorizeUser, makeCreateUser } from '@/main/factories'

export const makeSignUpUserController = (): SignUpUserController => {
  return new SignUpUserController(makeCreateUser(), makeAuthorizeUser())
}
