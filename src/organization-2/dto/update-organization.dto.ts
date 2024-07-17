// src/organization/dto/update-organization.dto.ts

import { IsString,IsOptional } from 'class-validator';

/**
 * Data Transfer Object for updating an organization.
 */
export class UpdateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  parentId?: number; // Optional field to set parent organization
}

