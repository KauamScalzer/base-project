import { AppDataSource } from '@/main/config/DataSource'
import app from '@/main/config/app'
import env from '@/main/config/env'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

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

describe('User Routes', () => {
  describe('/signup', () => {
    test('Should return 200 on success', async () => {
      await request(app).post('/api/user/signup').
        send({ 
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        }).
        expect(200)
    })
  })

  describe('/login', () => {
    test('Should return 401 on login', async () => {
      await request(app).post('/api/user/login').
        send({
          email: faker.internet.email(),
          password: faker.internet.password()
        }).
        expect(401)
    })

    test('Should return 200 on success', async () => {
      const name = faker.internet.userName()
      const email = faker.internet.email()
      const password = await hash('123', env.salt)
      await AppDataSource.getRepository('user').save({
        name,
        password,
        email
      })
      await request(app).post('/api/user/login').
        send({
          email,
          password: '123'
        }).
        expect(200)
    })
  })
})
