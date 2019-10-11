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
  id!: number;

  @Column
  name!: string;

  @HasMany((): typeof User => User)
  users!: User[];
}
