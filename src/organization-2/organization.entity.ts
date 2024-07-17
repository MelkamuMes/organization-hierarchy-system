// src/organization/organization.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

/**
 * Represents an organization position/role.
 */
@Entity({ name: 'organizations' })
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  parentId: number; // This should match the column name in your database

  // Each organization can have one parent
  @ManyToOne(() => Organization, organization => organization.children, { nullable: true })
  parent: Organization;

  // Each organization can have multiple children
  @OneToMany(() => Organization, organization => organization.parent, { nullable: true })
  children: Organization[];
}
