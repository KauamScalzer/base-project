import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return token
  }
}))

const token = faker.string.uuid()
const secret = faker.string.uuid()
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

const stringParam = (): string => {
  return faker.lorem.lines()
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('Should call sign with correct value', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      const spy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(param)
      expect(spy).toHaveBeenCalledWith({ id: param }, secret)
    })

    test('Should throw if sign throws', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt(param)
      await expect(promise).rejects.toThrow()
    })

    test('Should return a token on success', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      const result = await sut.encrypt(param)
      expect(result).toBe(token)
    })
  })
})
