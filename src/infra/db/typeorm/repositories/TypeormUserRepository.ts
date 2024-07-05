import { ICreateUserRepository, IVerifyUserExistByEmailRepository, IGetOneUserByEmailRepository, IUpdateUserAccessTokenRepository } from '@/data/protocols/db'
import { AppDataSource } from '@/main/config/DataSource'
import { User } from '../models'

export class TypeormUserRepository implements ICreateUserRepository, IVerifyUserExistByEmailRepository, IGetOneUserByEmailRepository, IUpdateUserAccessTokenRepository {
  async create (user: ICreateUserRepository.Params): Promise<void> {
    const repository = AppDataSource.getRepository(User)
    await repository.save(user)
  }

  async verify (email: string): Promise<boolean> {
    const repository = AppDataSource.getRepository(User)
    const user = await repository.findOne({ where: { email: email } })
    return user ? true : false
  }

  async getOne (email: string): Promise<IGetOneUserByEmailRepository.Result> {
    const repository = AppDataSource.getRepository(User)
    const user = await repository.findOne({ where: { email: email } })
    return user
  }

  async update (id: number, token: string): Promise<void> {
    const repository = AppDataSource.getRepository(User)
    await repository.update(id, { token: token })
  }
}
