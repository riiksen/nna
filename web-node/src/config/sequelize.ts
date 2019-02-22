import { Sequelize } from 'sequelize-typescript'
import config from './config'

const connection = new Sequelize({
  database: '',
  dialect: '',
  username: '',
  password: '',
  modelPaths: [__dirname + '../models']
})

export default connection;
