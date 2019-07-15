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

@Table({
  timestamps: true,
  tableName: 'roles_permissions',
})
export default class RolePermission extends Model<RolePermission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  role_id: number;

  @Column
  permission_id: number;

}
