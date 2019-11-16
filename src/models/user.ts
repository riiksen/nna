import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Trade } from './trade';
import { Role } from './role';
import { Permission } from './permission';
import { RolePermission } from './role_permission';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public username!: string;

  @Unique
  @Column
  public steamid!: string;

  @Column
  public avatar!: string;

  @Column
  public coins!: number;

  @Column
  public locked!: boolean;

  @Column
  @ForeignKey((): typeof Role => Role)
  @ForeignKey((): typeof RolePermission => RolePermission)
  public roleId!: number;

  @Column
  public inTrade!: boolean;

  @HasMany((): typeof Trade => Trade)
  public trades!: Trade[];

  @BelongsTo((): typeof Role => Role)
  public role!: Role;

  @BelongsToMany((): typeof Permission => Permission, (): typeof RolePermission => RolePermission)
  public permissions!: Permission[];

  public isRole(role: string): boolean {
    if (this.role && this.role.name === role) {
      return true;
    }
    return false;
  }

  public hasPermission(permission: string): boolean {
    let userHasPermission = false;
    if (this.permissions) {
      this.permissions.forEach((currPermission: Permission): void => {
        if (currPermission.name === permission) {
          userHasPermission = true;
        }
      });
    }
    return userHasPermission;
  }
}
