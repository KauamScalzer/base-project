import { SignUpUserController } from '../../../src/presentation/controllers'
import { faker } from '@faker-js/faker'
import { badRequest } from '../../../src/presentation/helpers/httpHelpers'
import { MissingParamError } from '../../../src/presentation/errors'

type SutTypes = {
  sut: SignUpUserController
}

const makeSut = (): SutTypes => {
  const sut = new SignUpUserController()
  return { sut }
}

describe('SignupUserController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      email: faker.internet.email(),
      password: faker.internet.password() 
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      name: faker.internet.userName(),
      password: faker.internet.password() 
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
