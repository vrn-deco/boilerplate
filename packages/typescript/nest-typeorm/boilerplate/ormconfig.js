/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const { config } = require('dotenv')

config({ path: resolve(__dirname, '.env') })

module.exports = {
  name: 'default',
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/database/entities/*.entity{.ts,.js}'],
  retryAttempts: 20,
  retryDelay: 3000,
  synchronize: false,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
}
