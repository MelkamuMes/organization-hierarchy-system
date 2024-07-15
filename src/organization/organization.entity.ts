import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

/**
 * Represents an organization position/role.
 */
@Entity({ name: 'positions' })
export class Organization {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  // Each organization can have one parent
  @ManyToOne(() => Organization, organization => organization.children, {nullable: true}) //nullable
  parent: Organization;

  // Each organization can have multiple children
  @OneToMany(() => Organization, organization => organization.parent , {nullable: true})
  children: Organization[];
}
