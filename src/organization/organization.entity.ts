import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'positions' })
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Organization, organization => organization.children, {nullable: true}) //nullable
  parent: Organization;

  @OneToMany(() => Organization, organization => organization.parent)
  children: Organization[];
}
