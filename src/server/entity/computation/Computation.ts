import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Computation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string;

  @Column()
  timestamp: string;
  
  @Column()
  count: number; 
}