import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export enum TimeBlockColor {
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  RED = 'RED',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  ORANGE = 'ORANGE',
  GRAY = 'GRAY',
}

export class CreateTimeBlockDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  order: number

  @IsOptional()
  @IsEnum(TimeBlockColor)
  color?: TimeBlockColor
}

export class UpdateTimeBlockDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  @IsOptional()
  order?: number

  @IsOptional()
  @IsEnum(TimeBlockColor)
  color?: TimeBlockColor
}