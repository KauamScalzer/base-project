import 'reflect-metadata'
import app from './config/app'
import { AppDataSource } from './config/DataSource'
import env from './config/env'

AppDataSource.initialize().
  then(async () => {
    app.listen(env.port, () => console.log(`Server running at ${env.protocol}${env.url}:${env.port}`))
  }).catch(console.error)
