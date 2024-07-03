import { CreateUser } from '../../../data/usecases'
import { TypeormUserRepository } from '../../../infra/db/typeorm/repositories'
import { BcryptAdapter } from '../../../infra/cryptography'
import env from '../../config/env'

export const makeCreateUser = (): CreateUser => {
  const salt = env.salt
  const typeormUserRepository = new TypeormUserRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new CreateUser(typeormUserRepository, bcryptAdapter, typeormUserRepository)
}
