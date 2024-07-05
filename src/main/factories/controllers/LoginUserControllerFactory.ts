import { LoginUserController } from '@/presentation/controllers'
import { makeAuthorizeUser } from '@/main/factories'

export const makeLoginUserController = (): LoginUserController => {
  return new LoginUserController(makeAuthorizeUser())
}
