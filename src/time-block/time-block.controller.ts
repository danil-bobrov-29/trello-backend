import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { TimeBlock } from '@prisma/client'
import { CurrentUser } from '../auth/decorator/auth.decorator'
import { AuthGuard } from '../auth/guard/auth.guard'
import { CreateTimeBlockDto, UpdateTimeBlockDto } from './dto/time-block.dto'
import { TimeBlockService } from './time-block.service'

@UseGuards(AuthGuard)
@Controller('time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTimeBlock(
    @Body() timeBlockData: CreateTimeBlockDto,
    @CurrentUser('id') userId: string
  ): Promise<TimeBlock> {
    return await this.timeBlockService.create(timeBlockData, userId)
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateParamsTimeBlock(
    @Param('id') id: string,
    @Query('dashboardId') dashboardId: string,
    @Body() updateTimeBlockDto: UpdateTimeBlockDto
  ) {
    return await this.timeBlockService.update(id, updateTimeBlockDto, {
      dashboardId,
    })
  }
}
