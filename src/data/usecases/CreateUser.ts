import { ICreateUser } from '../../domain/usecases'
import { IVerifyUserExistByEmailRepository } from '../protocols/db/user'

export class CreateUser implements ICreateUser {
  constructor (
    private readonly verifyUserExistByEmailRepository: IVerifyUserExistByEmailRepository
  ) {}
  async create (user: ICreateUser.Params): Promise<ICreateUser.Result> {
    await this.verifyUserExistByEmailRepository.verify(user.email)
    return null
  }
}
