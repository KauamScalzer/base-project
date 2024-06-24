import { ICreateUser } from '../../domain/usecases'
import { IHasher } from '../protocols/cryptography'
import { IVerifyUserExistByEmailRepository, ICreateUserRepository } from '../protocols/db/user'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly verifyUserExistByEmailRepository: IVerifyUserExistByEmailRepository,
    private readonly hasher: IHasher,
    private readonly createUserRepository: ICreateUserRepository
  ) {}
  async create (user: ICreateUser.Params): Promise<boolean> {
    const existUser = await this.verifyUserExistByEmailRepository.verify(user.email)
    if (!existUser) {
      const hashedPassword = await this.hasher.hash(user.password)
      await this.createUserRepository.create({
        ...user,
        password: hashedPassword 
      })
      return true
    }
    return false
  }
}
