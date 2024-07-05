import { AuthorizeUser } from '@/data/usecases'
import { mockCreateUserParams, throwError } from '@/tests/domain/mocks'
import { EncrypterSpy, GetOneUserByEmailRepositorySpy, HashComparerSpy, UpdateUserAccessTokenRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: AuthorizeUser
  getOneUserByEmailRepositorySpy: GetOneUserByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateUserAccessTokenRepositorySpy: UpdateUserAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const getOneUserByEmailRepositorySpy = new GetOneUserByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateUserAccessTokenRepositorySpy = new UpdateUserAccessTokenRepositorySpy()
  const sut = new AuthorizeUser(getOneUserByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateUserAccessTokenRepositorySpy)
  return {
    sut,
    getOneUserByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateUserAccessTokenRepositorySpy
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

  test('Should return null if IHashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const params = mockCreateUserParams()
    const result = await sut.authorize(params.email, params.password)
    expect(result).toBeNull()
  })

  test('Should call IEncrypter with correct id', async () => {
    const { sut, encrypterSpy, getOneUserByEmailRepositorySpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.authorize(params.email, params.password)
    expect(encrypterSpy.string).toEqual(getOneUserByEmailRepositorySpy.result?.id.toString())
  })

  test('Should throw if IEncrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.authorize(params.email, params.password)
    await expect(promise).rejects.toThrow()
  })

  test('Should call IUpdateUserAccessTokenRepository with correct values', async () => {
    const { sut, updateUserAccessTokenRepositorySpy, getOneUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    const params = mockCreateUserParams()
    await sut.authorize(params.email, params.password)
    expect(updateUserAccessTokenRepositorySpy.id).toEqual(getOneUserByEmailRepositorySpy.result?.id)
    expect(updateUserAccessTokenRepositorySpy.token).toEqual(encrypterSpy.result)
  })

  test('Should throw if IUpdateUserAccessTokenRepository throws', async () => {
    const { sut, updateUserAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateUserAccessTokenRepositorySpy, 'update').mockImplementationOnce(throwError)
    const params = mockCreateUserParams()
    const promise = sut.authorize(params.email, params.password)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut, getOneUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    const params = mockCreateUserParams()
    const result = await sut.authorize(params.email, params.password)
    expect(result).toEqual({
      id: getOneUserByEmailRepositorySpy.result?.id,
      name: getOneUserByEmailRepositorySpy.result?.name,
      token: encrypterSpy.result
    })
  })
})
