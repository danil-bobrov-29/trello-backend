import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTimeBlockDto {
  @IsString()
  title: string

  @IsString()
  dashboardId: string

  @IsNumber()
  order: number
}

export class UpdateTimeBlockDto {
  @IsString()
  @IsOptional()
  title: string

  @IsNumber()
  @IsOptional()
  order: number
}
