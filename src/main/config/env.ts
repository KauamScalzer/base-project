import dotenv from 'dotenv'

const environment: { [key: string]: string } = {
  local: '.env.local',
  test: '.env.test',
  prod: '.env'
}

dotenv.config({ path: environment[process.env.NODE_ENV ?? 'prod'] })

export default {
  port: parseInt(process.env.PORT ?? '3000'),
  protocol: process.env.PROTOCOL,
  url: process.env.URL,

  salt: parseInt(process.env.SALT ?? '12'),
  secret: process.env.SECRET ?? 'kpduirkmg',

  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: parseInt(process.env.DB_PORT ?? '')
}
