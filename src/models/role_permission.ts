import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Role } from './role';
import { Permission } from './permission';
import { User } from './user';

@Table({
  tableName: 'role_permissions',
  timestamps: true,
  underscored: true,
})

export class RolePermission extends Model<RolePermission> {
  @PrimaryKey
  @Column
  @ForeignKey((): typeof Role => Role)
  @ForeignKey((): typeof User => User)
  public roleId!: number;

  @PrimaryKey
  @Column
  @ForeignKey((): typeof Permission => Permission)
  public permissionId!: number;
}
