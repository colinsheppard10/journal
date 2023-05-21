import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class ResetPassword extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column({ nullable: false, default: true })
  validResetLink: boolean;

  @Column({ nullable: true })
  numberOfResets: number;

  @ManyToOne(() => User, user => user.resetPasswords, {
    onDelete: 'CASCADE',
    nullable: false
  })
  @JoinColumn()
  user: User;
}