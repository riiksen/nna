import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';

import Trade from './trade';
import Role from './role';
import Permission from './permission';
import RolePermission from './role_permission';

@Table({
  timestamps: true,
  tableName: 'users',
  underscored: true,
})
export default class User extends Model<User> {

  public id!: number;

  @Column
  public username!: string;

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

  isRole(role:string):boolean {
    if(this.role && this.role.name === role) {
      return true;
    }
    return false;
  }
  hasPermission(permission:string):boolean {
    if(this.permissions) {
      for(var i in this.permissions) {
        if(this.permissions[i].name == permission) {
          return true;
        }
      }
    }
    return false;
  }
}
