import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
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
  public id!: number;

  @Column
  public username!: string;

  @Column
  public steamid!: string;

  @Column
  public opskinsId!: number;

  @Column
  public avatar!: string;

  @Column
  public coins!: number;

  @Column
  public locked!: boolean;

  @Column
  public admin!: boolean;

  @Column
  public inTrade!: boolean;

  @HasMany((): typeof Trade => Trade)
  public trades!: Trade[]
}
