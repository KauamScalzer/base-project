import 'reflect-metadata'
import app from '@/main/config/app'
import { AppDataSource } from '@/main/config/DataSource'
import env from './config/env'

AppDataSource.initialize().
  then(async () => {
    app.listen(env.port, () => console.log(`Server running at ${env.protocol}${env.url}:${env.port}`))
  }).catch(console.error)
