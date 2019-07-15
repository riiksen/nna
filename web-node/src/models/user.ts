import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import Trade from './trade';
import Role from './role';

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
  public opskinsId!: number;

  @Column
  public avatar!: string;

  @Column
  public coins!: number;

  @Column
  public locked!: boolean;

  @Column
  @ForeignKey(() => Role)
  public role_id!: number;

  @Column
  public inTrade!: boolean;

  @HasMany((): typeof Trade => Trade)
  public trades!: Trade[]

  @BelongsTo(() => Role)
  public role!: Role;

  isRole(role:string):boolean {
    if(this.role && this.role.name === role) {
      return true;
    }
    return false;
  }
  hasPermission(permission:string):boolean {

  }
}
