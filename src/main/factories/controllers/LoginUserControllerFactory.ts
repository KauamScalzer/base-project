import { LoginUserController } from '../../../presentation/controllers'
import { makeAuthorizeUser } from '../usecases'

export const makeLoginUserController = (): LoginUserController => {
  return new LoginUserController(makeAuthorizeUser())
}
