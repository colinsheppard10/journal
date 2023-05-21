import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Journal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.journals, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column()
  timestamp: string;

  @Column()
  localDateFromBrowser: string;

  @Column({ type: "text" })
  summary: string;

  @Column({ type: "text" })
  entry: string;
}