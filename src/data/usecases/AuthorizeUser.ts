import { IAuthorizeUser } from '../../domain/usecases'
import { IEncrypter, IHashComparer } from '../protocols/cryptography'
import { IGetOneUserByEmailRepository } from '../protocols/db/user'

export class AuthorizeUser implements IAuthorizeUser {
  constructor (
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}
  async authorize (email: string, password: string): Promise<IAuthorizeUser.Result> {
    const existUser = await this.getOneUserByEmailRepository.getOne(email)
    if (existUser) {
      const validPassword = await this.hashComparer.compare(password, existUser.password)
      if (validPassword) {
        await this.encrypter.encrypt(existUser.id.toString())
      }
    }
    return null
  }
}
