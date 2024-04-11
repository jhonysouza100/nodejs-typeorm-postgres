import { DataSource } from 'typeorm'
import config from '../config'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB.URI as string,
  port: config.DB.PORT as number,
  username: config.DB.USER as string,
  password: config.DB.PASS as string,
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
})

async function connect() {
  await AppDataSource.initialize();
}

export { connect }