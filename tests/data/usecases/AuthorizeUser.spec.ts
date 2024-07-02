import { AuthorizeUser } from '../../../src/data/usecases'
import { mockCreateUserParams, throwError } from '../../domain/mocks'
import { GetOneUserByEmailRepositorySpy, HashComparerSpy } from '../mocks'

type SutTypes = {
  sut: AuthorizeUser
  getOneUserByEmailRepositorySpy: GetOneUserByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const getOneUserByEmailRepositorySpy = new GetOneUserByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new AuthorizeUser(getOneUserByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    getOneUserByEmailRepositorySpy,
    hashComparerSpy
  }
}

describe('AuthorizeUser usecase', () => {
  test('Should call IGetOneUserByEmailRepository with correct email', async () => {
    const { sut, getOneUserByEmailRepositorySpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.authorize(params.email, params.password)
    expect(getOneUserByEmailRepositorySpy.email).toEqual(params.email)
  })

  test('Should throw if IGetOneUserByEmailRepository throws', async () => {
    const { sut, getOneUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(getOneUserByEmailRepositorySpy, 'getOne').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.authorize(params.email, params.password)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if IGetOneUserByEmailRepository returns null', async () => {
    const { sut, getOneUserByEmailRepositorySpy } = makeSut()
    getOneUserByEmailRepositorySpy.result = null
    const params = mockCreateUserParams()
    const result = await sut.authorize(params.email, params.password)
    expect(result).toBeNull()
  })

  test('Should call IHashComparer with correct values', async () => {
    const { sut, hashComparerSpy, getOneUserByEmailRepositorySpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.authorize(params.email, params.password)
    expect(hashComparerSpy.hashedString).toEqual(getOneUserByEmailRepositorySpy.result?.password)
    expect(hashComparerSpy.compareString).toEqual(params.password)
  })

  test('Should throw if IHashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.authorize(params.email, params.password)
    await expect(promise).rejects.toThrow()
  })
})
