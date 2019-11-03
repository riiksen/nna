import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'permissions',
  underscored: true,
})
export default class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public name!: string;
}
