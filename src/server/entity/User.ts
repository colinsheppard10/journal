import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Journal } from "./Journal";
import { VerifyEmail } from "./VerifyEmail";
import { ResetPassword } from "./ResetPassword";

@Entity()
export class User extends BaseEntity {
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

  @OneToMany(() => Journal, (journal) => journal.user, {
    nullable: true
  })
  journals: Journal[];

  @Column({ nullable: true })
  journalAuthTokenEmail: string;

  @OneToOne(() => VerifyEmail, verifyEmail => verifyEmail.user, {
    nullable: true
  })
  verifyEmail: VerifyEmail;

  @OneToMany(() => ResetPassword, resetPassword => resetPassword.user, {
    nullable: true
  })
  resetPasswords: ResetPassword[];
}