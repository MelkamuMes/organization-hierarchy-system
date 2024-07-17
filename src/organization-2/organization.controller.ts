// src/organization/organization.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

/**
 * Controller to handle requests related to organizations.
 */
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  /**
   * Find all organizations.
   */

    /**
   * Get the entire hierarchy of organizations.
   */
    @Get('/hierarchy')
    async getTreeHierarchy(): Promise<Organization[]> {
      return this.organizationService.getTreeHierarchy();
    }

  @Get('/allData')
  async findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  /**
   * Find a specific organization by ID.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  /**
   * Create a new organization.
   */
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  /**
   * Update an existing organization by ID.
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  /**
   * Delete an organization by ID.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.organizationService.remove(id);
  }



  /**
   * Get the root organizations.
   */
  // @Get('root-nodes')
  // async getRoot(): Promise<Organization[]> {
  //   return this.organizationService.getRoot();
  // }

  /**
   * Get all child organizations of a specific organization.
   */
  @Get(':id/children')
  async getChildren(@Param('id', ParseIntPipe) id: number): Promise<Organization[]> {
    return this.organizationService.getChildren(id);
  }

  /**
   * Get the upward hierarchy of organizations starting from a specific organization.
   */
//   @Get(':id/hierarchy-upwards')
//   async getHierarchyUpwards(@Param('id', ParseIntPipe) id: number): Promise<Organization[]> {
//     return this.organizationService.getHierarchyUpwards(id);
//   }
}
