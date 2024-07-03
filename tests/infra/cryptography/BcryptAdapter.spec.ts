import { faker } from '@faker-js/faker'
import { BcryptAdapter } from '../../../src/infra/cryptography'
import bcrypt from 'bcrypt'
import { throwError } from '../../domain/mocks'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hashedString
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

const hashedString: string = faker.string.uuid()

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

    test('Should throw if hash throws', async ()=> {
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
      expect(result).toEqual(hashedString)
    })
  })

  describe('compare()', () => {
    test('Should call compare with correct values', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      const spy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(param, hashedString)
      expect(spy).toHaveBeenCalledWith(param, hashedString)
    })

    test('Should throw if compare throws', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare(param, hashedString)
      await expect(promise).rejects.toThrow()
    })

    test('Should return true when compare succeeds', async () => {
      const sut = makeSut()
      const param = stringParam()
      const result = await sut.compare(param, hashedString)
      expect(result).toBe(true)
    })
  })
})
