import { faker } from '@faker-js/faker'
import { BcryptAdapter } from '../../../src/infra/cryptography'
import bcrypt from 'bcrypt'
import { throwError } from '../../domain/mocks'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

const stringParam = (): string => {
  return faker.lorem.lines()
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      const spy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(param)
      expect(spy).toHaveBeenCalledWith(param, salt)
    })

    test('Should throw if if hash throws', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash(param)
      await expect(promise).rejects.toThrow()
    })

    test('Should return a valid hash on success', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      const result = await sut.hash(param)
      expect(result).toEqual('hash')
    })
  })
})
