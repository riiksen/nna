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

import User from './user'

@Table({
  timestamps: true,
  tableName: 'trades',
})
export default class Trade extends Model<Trade> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  state: number

  @ForeignKey(() => User)
  @Column
  user_id: number

  @BelongsTo(() => User)
  user: User

  @Column
  value: number

  @Column
  type: string

  @Column
  offer_id: number

  @Column
  trade_signature: string

  finalize(): void {
    const user = this.user
    user.coins = user.coins + this.value
    user.save()

    this.state = 3
    this.save()
  }
}
