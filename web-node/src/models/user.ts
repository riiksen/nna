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

import Trade from './trade';
import Role from './role';

@Table({
  timestamps: true,
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  steamid: string;

  @Column
  opskins_id: number;

  @Column
  avatar: string;

  @Column
  coins: number;

  @Column
  locked?: boolean;

  @Column
  @ForeignKey(() => Role)
  role_id?: number;

  @Column
  in_trade?: boolean;

  @BelongsTo(() => Role)
  role: Role;

  // @HasMany(() => Trade)
  // trades: Trade[]

  isRole(role:string):boolean {
    if(this.role && this.role.name === role) {
      return true;
    }
    return false;
  }
  hasPermission(permission:string):boolean {

  }
}
