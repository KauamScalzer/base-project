import { mockCreateUserResult } from '../../domain/mocks'
import { ICreateUser } from '../../../src/domain/usecases'

export class CreateUserSpy implements ICreateUser {
  params?: ICreateUser.Params
  result: ICreateUser.Result = mockCreateUserResult()
  
  async create (params: ICreateUser.Params): Promise<ICreateUser.Result> {
    this.params = params
    return this.result
  }
}
