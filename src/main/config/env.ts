import dotenv from 'dotenv'

const environment: { [key: string]: string } = {
  local: '.env.local',
  test: '.env.test'
}

dotenv.config({ path: environment[process.env.NODE_ENV ?? 'local'] })

export default {
  port: parseInt(process.env.PORT ?? '3000'),
  protocol: process.env.PROTOCOL,
  url: process.env.URL,

  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: parseInt(process.env.DB_PORT ?? '')
}
