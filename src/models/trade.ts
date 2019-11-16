import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './user';

@Table({
  tableName: 'trades',
  timestamps: true,
  underscored: true,
})
export class Trade extends Model<Trade> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public state!: number;

  @ForeignKey((): typeof User => User)
  @Column
  public userId!: number;

  @BelongsTo((): typeof User => User)
  public user!: User;

  @Column
  public value!: number;

  @Column
  public type!: string;

  @Column
  public offerId!: number;

  @Column
  public tradeSignature!: string;
}
