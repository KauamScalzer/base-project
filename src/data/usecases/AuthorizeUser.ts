import { IAuthorizeUser } from '../../domain/usecases'
import { IEncrypter, IHashComparer } from '../protocols/cryptography'
import { IGetOneUserByEmailRepository, IUpdateUserAccessTokenRepository } from '../protocols/db/user'

export class AuthorizeUser implements IAuthorizeUser {
  constructor (
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateUserAccessTokenRepository: IUpdateUserAccessTokenRepository
  ) {}
  async authorize (email: string, password: string): Promise<IAuthorizeUser.Result> {
    const existUser = await this.getOneUserByEmailRepository.getOne(email)
    if (existUser) {
      const validPassword = await this.hashComparer.compare(password, existUser.password)
      if (validPassword) {
        const token = await this.encrypter.encrypt(existUser.id.toString())
        await this.updateUserAccessTokenRepository.update(existUser.id, token)
      }
    }
    return null
  }
}
