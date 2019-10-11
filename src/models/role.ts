import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import User from './user';

@Table({
  timestamps: true,
  tableName: 'roles',
  underscored: true,
})
export default class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public name!: string;

  @HasMany((): typeof User => User)
  public users!: User[];
}
