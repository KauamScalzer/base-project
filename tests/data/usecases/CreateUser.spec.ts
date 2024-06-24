import { CreateUser } from '../../../src/data/usecases/CreateUser'
import { mockCreateUserParams } from '../../domain/mocks'
import { VerifyUserExistByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: CreateUser
  verifyUserExistByEmailRepositorySpy: VerifyUserExistByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const verifyUserExistByEmailRepositorySpy = new VerifyUserExistByEmailRepositorySpy()
  const sut = new CreateUser(verifyUserExistByEmailRepositorySpy)
  return {
    sut,
    verifyUserExistByEmailRepositorySpy 
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
})
