import { faker } from '@faker-js/faker'
import { BcryptAdapter } from '../../../src/infra/cryptography'
import bcrypt from 'bcrypt'

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
  })
})
