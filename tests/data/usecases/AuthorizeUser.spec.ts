import { AuthorizeUser } from '../../../src/data/usecases'
import { mockCreateUserParams } from '../../domain/mocks'
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
})
