import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  steamid: string;

  @Column()
  opskins_id: number;

  @Column()
  avatar: string;

  @Column()
  coins: number;

  @Column()
  locked?: boolean;

  @Column()
  admin?: boolean;

  @Column()
  in_trade?: boolean;
}
