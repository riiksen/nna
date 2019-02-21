import {
  Entity,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  finalize() {

  }

}
