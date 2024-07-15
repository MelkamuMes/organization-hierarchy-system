import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'todos'}) //name refers the table name for our DB
export class Todo {
      @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;
}