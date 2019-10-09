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

import Role from './role';
import Permission from './permission';
import User from './user';

@Table({
  timestamps: true,
  tableName: 'role_permissions',
  underscored: true,
})
export default class RolePermission extends Model<RolePermission> {

  @PrimaryKey
  @Column
  @ForeignKey((): typeof Role => Role)
  @ForeignKey((): typeof User => User)
  roleId!: number;

  @PrimaryKey
  @Column
  @ForeignKey((): typeof Permission => Permission)
  permissionId!: number;

}
