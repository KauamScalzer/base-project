import { ICreateUser } from './../../../src/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockCreateUserParams = (): ICreateUser.Params => ({
  name: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email()
})

export const mockCreateUserResult = (): ICreateUser.Result => ({ id: faker.number.int() })
