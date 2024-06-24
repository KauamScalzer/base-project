import { ICreateUser } from '../../domain/usecases'
import { IHasher } from '../protocols/cryptography'
import { IVerifyUserExistByEmailRepository } from '../protocols/db/user'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly verifyUserExistByEmailRepository: IVerifyUserExistByEmailRepository,
    private readonly hasher: IHasher
  ) {}
  async create (user: ICreateUser.Params): Promise<ICreateUser.Result> {
    const existUser = await this.verifyUserExistByEmailRepository.verify(user.email)
    if (!existUser) {
      await this.hasher.hash(user.password)
    }
    return null
  }
}
