import { DataSource } from 'typeorm'
import config from '../config'

const AppDataSourde = new DataSource({
  type: 'postgres',
  host: config.DB.URI,
  username: config.DB.USER,
  password: config.DB.PASS,
  port: config.DB.PORT as number,
  database: 'typeormdb',
  entities: [],
  logging: true
})

export { AppDataSourde }