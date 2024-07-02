import { AuthorizeUser } from '../../../src/data/usecases'
import { mockCreateUserParams, throwError } from '../../domain/mocks'
import { VerifyUserExistByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: AuthorizeUser
  verifyUserExistByEmailRepositorySpy: VerifyUserExistByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const verifyUserExistByEmailRepositorySpy = new VerifyUserExistByEmailRepositorySpy()
  const sut = new AuthorizeUser(verifyUserExistByEmailRepositorySpy)
  return {
    sut,
    verifyUserExistByEmailRepositorySpy
  }
}

describe('AuthorizeUser usecase', () => {
  test('Should call IVerifyUserExistByEmailRepository with correct email', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.authorize(params.email, params.password)
    expect(verifyUserExistByEmailRepositorySpy.email).toEqual(params.email)
  })

  test('Should throw if IVerifyUserExistByEmailRepository throws', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    jest.spyOn(verifyUserExistByEmailRepositorySpy, 'verify').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.authorize(params.email, params.password)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if IVerifyUserExistByEmailRepository returns null', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    verifyUserExistByEmailRepositorySpy.result = false
    const params = mockCreateUserParams()
    const result = await sut.authorize(params.email, params.password)
    expect(result).toBeNull()
  })
})
