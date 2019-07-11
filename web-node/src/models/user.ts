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
  HasMany,
} from 'sequelize-typescript';

import Trade from './trade';

@Table({
  // timestamps: true,
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  steamid: string;

  @Column
  opskins_id: number;

  @Column
  avatar: string;

  @Column
  coins: number;

  @Column
  locked?: boolean;

  @Column
  admin?: boolean;

  @Column
  in_trade?: boolean;

  // @HasMany(() => Trade)
  // trades: Trade[]
}
