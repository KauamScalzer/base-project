import { DataSource } from 'typeorm'
import { User } from '@/infra/db'
import env from './env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUserName,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: true,
  logging: false,
  entities: [User]
})
