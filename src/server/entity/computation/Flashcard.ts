import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Flashcard extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string;
  
  @Column()
  topic: string; 

  @Column("json")
  cards: object;
}