import {
  Model,
  DataTypes,
} from 'sequelize'
import connection from '../config/sequelize'
import { Options, Attribute } from 'sequelize-decorators'

@Options({ connection })
export default class Trade extends Model {
  static associations: {}

  @Attribute({ type: DataTypes.INTEGER, primaryKey: true })
  public id: number

  finalize(): void {

  }
}
