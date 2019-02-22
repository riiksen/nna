import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class Trade extends Model<Trade> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  finalize(): void {

  }
}
