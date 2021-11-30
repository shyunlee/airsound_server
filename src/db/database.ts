import { Sequelize } from 'sequelize'
import { config } from '../config/config.js'

const {username, password, database, host, port } = config.prod

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect:'mysql', 
  port,
  logging: false,
})