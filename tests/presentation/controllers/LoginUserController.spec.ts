import { LoginUserController } from '../../../src/presentation/controllers'
import { faker } from '@faker-js/faker'
import { badRequest, ok, serverError, unauthorized } from '../../../src/presentation/helpers/httpHelpers'
import { InvalidParamTypeError, MissingParamError } from '../../../src/presentation/errors'
import { AuthorizeUserSpy } from '../mocks/MockUser'
import { mockCreateUserParams, throwError } from '../../domain/mocks'

type SutTypes = {
  sut: LoginUserController
  authorizeUserSpy: AuthorizeUserSpy
}

const makeSut = (): SutTypes => {
  const authorizeUserSpy = new AuthorizeUserSpy()
  const sut = new LoginUserController(authorizeUserSpy)
  return {
    sut,
    authorizeUserSpy
  }
}

describe('LoginUserController', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = { password: faker.internet.password() }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = { email: faker.internet.email() }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if invalid type for email is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      email: faker.number.int(),
      password: faker.internet.password() 
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamTypeError('email')))
  })

  test('Should return 400 if invalid type for password is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      email: faker.internet.email(),
      password: faker.number.int()
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamTypeError('password')))
  })

  test('Should call IAuthorizeUser with correct values', async () => {
    const { sut, authorizeUserSpy } = makeSut()
    const request = mockCreateUserParams()
    await sut.handle(request)
    expect(authorizeUserSpy.email).toEqual(request.email)
    expect(authorizeUserSpy.password).toEqual(request.password)
  })

  test('Should return 200 on success', async () => {
    const { sut, authorizeUserSpy } = makeSut()
    const request = mockCreateUserParams()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(authorizeUserSpy.result))
  })

  test('Should return 500 if IAuthorizeUser throw', async () => {
    const { sut, authorizeUserSpy } = makeSut()
    jest.spyOn(authorizeUserSpy, 'authorize').mockImplementationOnce(throwError)
    const request = mockCreateUserParams()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 401 if IAuthorizeUser returns null', async () => {
    const { sut, authorizeUserSpy } = makeSut()
    authorizeUserSpy.result = null
    const request = mockCreateUserParams()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unauthorized())
  })
})
