import { PartialType } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'
import { CreateDashboardDto } from './create-dashboard.dto'

export class UpdateDashboardDto extends PartialType(CreateDashboardDto) {
  @IsBoolean()
  @IsOptional()
  isArchive?: boolean
}
