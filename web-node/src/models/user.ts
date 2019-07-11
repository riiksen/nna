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

import { Trade } from './trade';

@Table({
  // timestamps: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  username!: string;

  @Column
  steamid!: string;

  @Column
  opskinsId!: number;

  @Column
  avatar!: string;

  @Column
  coins!: number;

  @Column
  locked!: boolean;

  @Column
  admin!: boolean;

  @Column
  inTrade!: boolean;

  // @HasMany(() => Trade)
  // trades: Trade[]
}
