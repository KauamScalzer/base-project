import { faker } from '@faker-js/faker'
import { JwtAdapter } from '../../../src/infra/cryptography'
import jwt from 'jsonwebtoken'

const secret = faker.string.uuid()
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

const stringParam = (): string => {
  return faker.lorem.lines()
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('Should call sing with correct value', async ()=> {
      const sut = makeSut()
      const param = stringParam()
      const spy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(param)
      expect(spy).toHaveBeenCalledWith({ id: param }, secret)
    })
  })
})
