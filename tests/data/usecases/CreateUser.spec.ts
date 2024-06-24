import { CreateUser } from '../../../src/data/usecases/CreateUser'
import { mockCreateUserParams, throwError } from '../../domain/mocks'
import { CreateUserRepositorySpy, HasherSpy, VerifyUserExistByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: CreateUser
  verifyUserExistByEmailRepositorySpy: VerifyUserExistByEmailRepositorySpy
  hasherSpy: HasherSpy
  createUserRepositorySpy: CreateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const verifyUserExistByEmailRepositorySpy = new VerifyUserExistByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const sut = new CreateUser(verifyUserExistByEmailRepositorySpy, hasherSpy, createUserRepositorySpy)
  return {
    sut,
    verifyUserExistByEmailRepositorySpy,
    hasherSpy,
    createUserRepositorySpy
  }
}

describe('CreateUser usecase', () => {
  test('Should call IVerifyUserExistByEmailRepository with correct email', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.create(params)
    expect(verifyUserExistByEmailRepositorySpy.email).toEqual(params.email)
  })

  test('Should return false if IVerifyUserExistByEmailRepository returns true', async () => {
    const { sut } = makeSut()
    const params = mockCreateUserParams()
    const result = await sut.create(params)
    expect(result).toBeFalsy()
  })

  test('Should call IHasher with correct password', async () => {
    const { sut, hasherSpy, verifyUserExistByEmailRepositorySpy } = makeSut()
    verifyUserExistByEmailRepositorySpy.result = false
    const params = mockCreateUserParams()
    await sut.create(params)
    expect(hasherSpy.stringToHash).toEqual(params.password)
  })

  test('Should call ICreateUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy, verifyUserExistByEmailRepositorySpy, hasherSpy } = makeSut()
    verifyUserExistByEmailRepositorySpy.result = false
    const params = mockCreateUserParams()
    await sut.create(params)
    expect(createUserRepositorySpy.user).toEqual({
      email: params.email,
      name: params.name,
      password: hasherSpy.result
    })
  })

  test('Should true on success', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    verifyUserExistByEmailRepositorySpy.result = false
    const params = mockCreateUserParams()
    const result = await sut.create(params)
    expect(result).toBeTruthy()
  })

  test('Should throw if IVerifyUserExistByEmailRepository throws', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    jest.spyOn(verifyUserExistByEmailRepositorySpy, 'verify').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.create(params)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IHasher throws', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy, hasherSpy } = makeSut()
    verifyUserExistByEmailRepositorySpy.result = false
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.create(params)
    await expect(promise).rejects.toThrow()
  })
})
