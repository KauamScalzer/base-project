import request from 'supertest'
import app from './../../../src/main/config/app'
import { faker } from '@faker-js/faker'
import { AppDataSource } from '../../../src/main/config/DataSource'

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
})
