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

import User from './user';

@Table({
  timestamps: true,
  tableName: 'roles',
})
export default class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @HasMany(() => User)
  users: User[];

}
