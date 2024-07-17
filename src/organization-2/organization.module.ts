// src/organization/organization.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

/**
 * Module to bundle all components related to the Organization entity.
 */

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService] // Exporting the service if needed in other modules
})
export class OrganizationModule {}
