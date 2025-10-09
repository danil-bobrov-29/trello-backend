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
import type { Dashboards, User } from '@prisma/client'
import { CurrentUser } from '../auth/decorator/auth.decorator'
import { AuthGuard } from '../auth/guard/auth.guard'
import { DashboardService } from './dashboard.service'
import { CreateDashboardDto } from './dto/create-dashboard.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'

@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createDashboard(
    @Body() dashboardData: CreateDashboardDto,
    @CurrentUser() user: User
  ): Promise<Dashboards> {
    return await this.dashboardService.createWithTimeBlocks({
      ...dashboardData,
      user: { connect: user },
    })
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async getAllDashboards(@CurrentUser() user: User): Promise<Dashboards[]> {
    return await this.dashboardService.findAll({ user })
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getDashboard(
    @Param('id') id: string,
    @CurrentUser('id') userId: string
  ): Promise<Dashboards> {
    return await this.dashboardService.findOne(id, { userId })
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateParamsDashboard(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
    @CurrentUser('id') userId: string
  ): Promise<Dashboards> {
    return await this.dashboardService.update(id, updateDashboardDto, {
      userId,
    })
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteDashboard(
    @Param('id') id: string,
    @CurrentUser('id') userId: string
  ): Promise<void> {
    await this.dashboardService.remove(id, { userId: userId })
  }
}
