import { SignUpUserController } from '@/presentation/controllers'
import { badRequest, conflict, ok, serverError } from '@/presentation/helpers'
import { AlreadyInUseError, InvalidParamTypeError, MissingParamError } from '@/presentation/errors'
import { AuthorizeUserSpy, CreateUserSpy } from '@/tests/presentation/mocks/MockUser'
import { mockCreateUserParams, throwError } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: SignUpUserController
  createUserSpy: CreateUserSpy
  authorizeUserSpy: AuthorizeUserSpy
}

const makeSut = (): SutTypes => {
  const createUserSpy = new CreateUserSpy()
  const authorizeUserSpy = new AuthorizeUserSpy()
  const sut = new SignUpUserController(createUserSpy, authorizeUserSpy)
  return {
    sut,
    createUserSpy,
    authorizeUserSpy
  }
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

  test('Should return 400 if invalid type for password is provided', async () => {
    const { sut } = makeSut()
    const mockRequest: any = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.number.int()
    }
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamTypeError('password')))
  })

  test('Should call ICreateUser with correct values', async () => {
    const { sut, createUserSpy } = makeSut()
    const request = mockCreateUserParams()
    await sut.handle(request)
    expect(createUserSpy.params).toEqual(request)
  })

  test('Should return 409 if recieved email is already in use', async () => {
    const { sut, createUserSpy } = makeSut()
    createUserSpy.result = false
    const request = mockCreateUserParams()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(conflict(new AlreadyInUseError('email')))
  })

  test('Should return 500 if ICreateUser throw', async () => {
    const { sut, createUserSpy } = makeSut()
    jest.spyOn(createUserSpy, 'create').mockImplementationOnce(throwError)
    const request = mockCreateUserParams()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
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
})
