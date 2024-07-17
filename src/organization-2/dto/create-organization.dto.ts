// src/organization/dto/create-organization.dto.ts

import { IsString, IsOptional, IsInt } from 'class-validator';

/**
 * Data Transfer Object for creating an organization.
 */
export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  parentId?: number; // Optional field to set parent organization
}
