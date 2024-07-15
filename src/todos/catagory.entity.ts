import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Catagory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;
}