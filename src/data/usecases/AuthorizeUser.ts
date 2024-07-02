import { IAuthorizeUser } from '../../domain/usecases'
import { IVerifyUserExistByEmailRepository } from '../protocols/db/user'

export class AuthorizeUser implements IAuthorizeUser {
  constructor (
    private readonly verifyUserExistByEmailRepository: IVerifyUserExistByEmailRepository
  ) {}
  async authorize (email: string, password: string): Promise<IAuthorizeUser.Result> {
    await this.verifyUserExistByEmailRepository.verify(email)
    return null
  }
}
