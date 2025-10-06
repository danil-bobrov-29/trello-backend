import { Injectable } from '@nestjs/common'
import { Prisma, TimeBlock } from '@prisma/client'
import { DashboardService } from '../dashboard/dashboard.service'
import { UpdateDashboardDto } from '../dashboard/dto/update-dashboard.dto'
import { PrismaService } from '../prisma.service'
import { CreateTimeBlockDto } from './dto/time-block.dto'

@Injectable()
export class TimeBlockService {
  constructor(
    private readonly prisma: PrismaService,
    private dashboardService: DashboardService
  ) {}

  async create(data: CreateTimeBlockDto, userId: string): Promise<TimeBlock> {
    await this.dashboardService.findOne(data.dashboardId, {
      userId,
    })

    return this.prisma.timeBlock.create({ data })
  }

  async update(
    id: string,
    updateDashboardDto: UpdateDashboardDto,
    filters?: Prisma.TimeBlockGetPayload<{ select: { id: false } }>
  ) {
    return this.prisma.dashboards.update({
      where: {
        id,
        ...filters,
      },
      data: updateDashboardDto,
    })
  }
}
