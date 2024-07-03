import 'reflect-metadata'
import { mockCreateUserParams } from '../../../../domain/mocks'
import { TypeormUserRepository } from '../../../../../src/infra/db/typeorm/repositories'
import { AppDataSource } from '../../../../../src/main/config/DataSource'
import { faker } from '@faker-js/faker'

const makeSut = (): TypeormUserRepository => {
  return new TypeormUserRepository()
}

beforeAll(async () => {
  await AppDataSource.initialize()
})

afterAll(async () => {
  await AppDataSource.getRepository('user').clear()
  await AppDataSource.destroy()
})

beforeEach(async () => {
  await AppDataSource.getRepository('user').clear()
})

const randomEmail: string = faker.internet.email()

describe('Typeorm User Repository', () =>{
  describe('create()', ()=> {
    test('Should create an user', async ()=> {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      await sut.create(createUserParams)
      const userTable = await AppDataSource.getRepository('user').count()
      expect(userTable).toBe(1)
    })
  })

  describe('verify()', ()=> {
    test('Should return false if email is not found', async ()=> {
      const sut = makeSut()
      const result = await sut.verify(randomEmail)
      expect(result).toBe(false)
    })

    test('Should return true if email is found', async ()=> {
      await AppDataSource.getRepository('user').save({
        name: 'any',
        password: 'any',
        email: randomEmail
      })
      const sut = makeSut()
      const result = await sut.verify(randomEmail)
      expect(result).toBe(true)
    })
  })

  describe('getOne()', ()=> {
    test('Should return null if provided email is not found', async ()=> {
      const sut = makeSut()
      const result = await sut.getOne(randomEmail)
      expect(result).toBe(null)
    })

    test('Should return an user if email is found', async ()=> {
      await AppDataSource.getRepository('user').save({
        name: faker.person.firstName(),
        password: faker.internet.password(),
        email: randomEmail
      })
      const sut = makeSut()
      const result = await sut.getOne(randomEmail)
      expect(result).toBeTruthy()
    })
  })

  describe('update()', ()=> {
    test('Should update the user token', async ()=> {
      const userSave = {
        name: faker.person.firstName(),
        password: faker.internet.password(),
        email: randomEmail
      }
      const user = await AppDataSource.getRepository('user').save(userSave)
      const token = faker.string.uuid()
      const sut = makeSut()
      await sut.update(user.id, token)
      const userResult = await AppDataSource.getRepository('user').findOne({ where: { id: user.id } })
      expect(userResult?.token).toEqual(token)
    })
  })
})
