import { IAuthorizeUser } from '../../domain/usecases'
import { IGetOneUserByEmailRepository } from '../protocols/db/user'

export class AuthorizeUser implements IAuthorizeUser {
  constructor (
    private readonly getOneUserByEmailRepository: IGetOneUserByEmailRepository
  ) {}
  async authorize (email: string, password: string): Promise<IAuthorizeUser.Result> {
    const existUser = await this.getOneUserByEmailRepository.getOne(email)
    if (existUser) {}
    return null
  }
}
