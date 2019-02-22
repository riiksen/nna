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
  // timestamps: true,
  tableName: 'trades',
})
export default class Trade extends Model<Trade> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  state: number

  @Column
  recipent_steam_id: string

  @Column
  value: number

  @Column
  type: string

  @Column
  opskins_offer_id: string

  @Column
  trade_signature: string

  // @ForeignKey(() => User)
  // @Column
  // userId: number

  // @BelongsTo(() => User)
  // user: User

  finalize(): void {
    const user = this.user
    user.coins = user.coins + this.value
    user.save()

    this.state = 3
    this.save()
  }
}
