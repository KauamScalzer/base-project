import { ICreateUser, IAuthorizeUser } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockCreateUserParams = (): ICreateUser.Params => ({
  name: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email()
})

export const mockAuthorizeUserResult = (): IAuthorizeUser.Result => ({
  id: faker.number.int(),
  name: faker.internet.userName(),
  token: faker.string.uuid()
})
