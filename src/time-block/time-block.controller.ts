import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import type { Dashboards, TimeBlock } from '@prisma/client'
import { AuthGuard } from '../auth/guard/auth.guard'
import { Dashboard } from '../dashboard/decorator/dashboard.decorator'
import { DashboardGuard } from '../dashboard/guard/dashboard.guard'
import { CreateTimeBlockDto, UpdateTimeBlockDto } from './dto/time-block.dto'
import { TimeBlockService } from './time-block.service'
import { ITimeBlocksResponse } from './time-block.types'

@UseGuards(AuthGuard, DashboardGuard)
@Controller('dashboard/:dashboardId/time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTimeBlock(
    @Body() timeBlockData: CreateTimeBlockDto,
    @Dashboard() dashboard: Dashboards
  ): Promise<TimeBlock> {
    return await this.timeBlockService.create({
      ...timeBlockData,
      dashboard: { connect: { id: dashboard.id } },
    })
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getTimeBlocksAll(
    @Dashboard() dashboard: Dashboards
  ): Promise<ITimeBlocksResponse> {
    const timeBlocksData = await this.timeBlockService.findAll({
      dashboardId: dashboard.id,
    })

    return { dashboard, timeBlocks: timeBlocksData }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTimeBlock(
    @Param('id') id: string,
    @Dashboard() dashboard: Dashboards
  ): Promise<TimeBlock> {
    return await this.timeBlockService.findOne(id, {
      dashboardId: dashboard.id,
    })
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateParamsTimeBlock(
    @Param('id') id: string,
    @Dashboard() dashboardId: string,
    @Body() updateTimeBlockDto: UpdateTimeBlockDto
  ) {
    return await this.timeBlockService.update(id, updateTimeBlockDto, {
      dashboardId,
    })
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTimeBlock(
    @Param('id') id: string,
    @Dashboard() dashboardId: string
  ) {
    return await this.timeBlockService.remove(id, { dashboardId })
  }
}
