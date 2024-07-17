// src/organization/organization.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, TreeRepository,  } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

/**
 * Service to handle business logic for the Organization entity.
 */
@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private  organizationRepository: Repository<Organization>,
  ) {}

  /**
   * Retrieves all organizations.
   */
   findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  /**
   * Retrieves an organization by its ID.
   */
  async findOne(id: number): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({ where: { id } });
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    return organization;
  }

  /**
   * Creates a new organization.
   */

  //  the createOrganizationDto object. This DTO (Data Transfer Object) typically 
  // contains validated data received from the client.
  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = new Organization();
    organization.name = createOrganizationDto.name;
    organization.description = createOrganizationDto.description;
    organization.parent = createOrganizationDto.parentId
      ? { id: createOrganizationDto.parentId } as Organization
      : null;
    return this.organizationRepository.save(organization);
  }

  /**
   * Updates an existing organization.
   */
  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.findOne(id);
    organization.name = updateOrganizationDto.name || organization.name;
    organization.description = updateOrganizationDto.description || organization.description;
    organization.parent = updateOrganizationDto.parentId
        // Set the parent organization if parentId is provided in the DTO

      ? { id: updateOrganizationDto.parentId } as Organization
      : organization.parent;
    return this.organizationRepository.save(organization);
  }

  /**
   * Deletes an organization by its ID.
   */
  async remove(id: number): Promise<void> {
    const organization = await this.findOne(id);
    if (organization.children && organization.children.length > 0) {
      throw new Error('You Can not Delete a Parent with Child.');
    }
    await this.organizationRepository.delete(id);
  }

  /**
   * Retrieves all child organizations of a specific position.
   */
  async getChildren(positionId: number): Promise<Organization[]> {
    const parentOrganization = await this.findOne(positionId);
    return parentOrganization.children;
  }

  
  
  
  
  // Get Data Hierarchicaly with a tree like structure

  async getTreeHierarchy(): Promise<Organization[]> {
    // Fetch all positions from the database
    const positions = await this.organizationRepository.find();
  
    // Initialize the hierarchy by adding a children array to each position
    positions.forEach(position => {
      position.children = [];
    });
  
    // Recursive function to build the hierarchy
    const buildHierarchy = (position: Organization): Organization => {
      // Find all children of the current position
      const children = positions.filter(p => p.parentId === position.id);
      // Recursively build the hierarchy for each child
      children.forEach(child => {
        const childNode = buildHierarchy(child);
        position.children.push(childNode);
      });
      // Return the current position with its hierarchy
      return position;
    };

  
    // Find root positions (positions with no parent)
    const roots: Organization[] = positions.filter(position => !position.parentId);
  
    // Build and return the tree structure starting from the roots
    return roots.map(root => buildHierarchy(root));
  }
 
}