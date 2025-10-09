import { PartialType } from '@nestjs/swagger'
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateCardDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsISO8601()
  dueDate: Date

  @IsNumber()
  order: number
}

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean

  @IsOptional()
  @IsString()
  timeBlockId: string
}