import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class VerifyEmail extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string;

  @Column({unique: true})
  email: string;

  @Column({ nullable: true })
  password: string;  
  
  @Column({ nullable: true })
  locale: string;
  
  @Column()
  fullName: string;
  
  @Column({ nullable: true })
  picture: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => User, user => user.verifyEmail, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @JoinColumn()
  user: User;
}