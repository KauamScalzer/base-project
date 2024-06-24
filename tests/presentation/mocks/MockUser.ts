import { mockAuthorizeUserResult, mockCreateUserResult } from '../../domain/mocks'
import { ICreateUser, IAuthorizeUser } from '../../../src/domain/usecases'

export class CreateUserSpy implements ICreateUser {
  params?: ICreateUser.Params
  result: ICreateUser.Result = mockCreateUserResult()
  
  async create (params: ICreateUser.Params): Promise<ICreateUser.Result> {
    this.params = params
    return this.result
  }
}

export class AuthorizeUserSpy implements IAuthorizeUser {
  email?: string
  password?: string
  result: IAuthorizeUser.Result = mockAuthorizeUserResult()
  
  async authorize (email: string, password: string): Promise<IAuthorizeUser.Result> {
    this.email = email
    this.password = password
    return this.result
  }
}
