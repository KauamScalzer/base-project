import { SignUpUserController } from '../../../src/presentation/controllers'
import { faker } from '@faker-js/faker'
import { badRequest } from '../../../src/presentation/helpers/httpHelpers'
import { InvalidParamTypeError, MissingParamError } from '../../../src/presentation/errors'

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

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      name: faker.internet.userName(),
      email: faker.internet.email()
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if invalid type for name is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      name: faker.number.int(),
      email: faker.internet.email(),
      password: faker.internet.password() 
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamTypeError('name')))
  })

  test('Should return 400 if invalid type for email is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      name: faker.internet.userName(),
      email: faker.number.int(),
      password: faker.internet.password() 
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamTypeError('email')))
  })
})
