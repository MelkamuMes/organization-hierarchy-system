import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/allData')
  async findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.organizationService.delete(id);
  }
}

