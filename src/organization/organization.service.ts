import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';


/**
 * Service to handle business logic for Organization entity.
 */
@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

    /**
   * Retrieves all organizations with their children.
   */
  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.find({ relations: ['children'] });
  }

  async findOne(id: string): Promise<Organization> {
    return await this.organizationRepository.findOne({ where: { id }, relations: ['children', 'parent'] });
  }
 
  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const { name, description, parentId } = createOrganizationDto;
    const organization = new Organization();
    organization.name = name;
    organization.description = description;
    if (parentId) {
      const parent = await this.organizationRepository.findOne({ where: { id: parentId } });
      if (parent) {
        organization.parent = parent;
      }
    }
    return this.organizationRepository.save(organization);
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({ where: { id }, relations: ['parent', 'children'] });
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    const { name, description, parentId } = updateOrganizationDto;
    if (name) {
      organization.name = name;
    }
    if (description) {
      organization.description = description;
    }
    if (parentId) {
      const parent = await this.organizationRepository.findOne({ where: { id: parentId } });
      if (parent) {
        organization.parent = parent;
      }
    }
    return this.organizationRepository.save(organization);
  }

  async delete(id: string): Promise<void> {
    const organization = await this.organizationRepository.findOne({ where: { id } });
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    // else if (organization => organization.parent) {
    //   // throw new Error(`You can not abandon your child!`);
    // }
    await this.organizationRepository.remove(organization);
  }



}
