import { AuthorizeUser } from '../../../data/usecases'
import { TypeormUserRepository } from '../../../infra/db/typeorm/repositories'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'
import env from '../../config/env'

export const makeAuthorizeUser = (): AuthorizeUser => {
  const salt = env.salt
  const typeormUserRepository = new TypeormUserRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const secret = env.secret
  const jwtAdapter = new JwtAdapter(secret)
  return new AuthorizeUser(typeormUserRepository, bcryptAdapter, jwtAdapter, typeormUserRepository)
}
