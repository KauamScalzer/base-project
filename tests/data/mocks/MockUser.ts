import { faker } from '@faker-js/faker'
import { IVerifyUserExistByEmailRepository, ICreateUserRepository, IGetOneUserByEmailRepository } from '../../../src/data/protocols/db/user'

export class VerifyUserExistByEmailRepositorySpy implements IVerifyUserExistByEmailRepository {
  email?: string
  result: boolean = true
  async verify (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  user?: ICreateUserRepository.Params
  async create (user: ICreateUserRepository.Params): Promise<void> {
    this.user = user
  }
}

export class GetOneUserByEmailRepositorySpy implements IGetOneUserByEmailRepository {
  email?: string
  result: IGetOneUserByEmailRepository.Result = {
    id: faker.number.int(),
    name: faker.internet.userName(),
    password: faker.internet.password()
  }

  async getOne (email: string): Promise<IGetOneUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
