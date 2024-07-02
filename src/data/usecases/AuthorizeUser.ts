import { IAuthorizeUser } from '../../domain/usecases'
import { IHashComparer } from '../protocols/cryptography'
import { IGetOneUserByEmailRepository } from '../protocols/db/user'

export class AuthorizeUser implements IAuthorizeUser {
  constructor (
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) {}
  async authorize (email: string, password: string): Promise<IAuthorizeUser.Result> {
    const existUser = await this.getOneUserByEmailRepository.getOne(email)
    if (existUser) {
      await this.hashComparer.compare(password, existUser.password)
    }
    return null
  }
}
