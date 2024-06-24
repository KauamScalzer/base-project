import { CreateUser } from '../../../src/data/usecases/CreateUser'
import { mockCreateUserParams } from '../../domain/mocks'
import { HasherSpy, VerifyUserExistByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: CreateUser
  verifyUserExistByEmailRepositorySpy: VerifyUserExistByEmailRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const verifyUserExistByEmailRepositorySpy = new VerifyUserExistByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new CreateUser(verifyUserExistByEmailRepositorySpy, hasherSpy)
  return {
    sut,
    verifyUserExistByEmailRepositorySpy,
    hasherSpy
  }
}

describe('CreateUser usecase', () => {
  test('Should call IVerifyUserExistByEmailRepository with correct email', async () => {
    const { sut, verifyUserExistByEmailRepositorySpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.create(params)
    expect(verifyUserExistByEmailRepositorySpy.email).toEqual(params.email)
  })

  test('Should return null if IVerifyUserExistByEmailRepository returns true', async () => {
    const { sut } = makeSut()
    const params = mockCreateUserParams()
    const result = await sut.create(params)
    expect(result).toBeNull()
  })

  test('Should call IHasher with correct password', async () => {
    const { sut, hasherSpy, verifyUserExistByEmailRepositorySpy } = makeSut()
    verifyUserExistByEmailRepositorySpy.result = false
    const params = mockCreateUserParams()
    await sut.create(params)
    expect(hasherSpy.stringToHash).toEqual(params.password)
  })
})
