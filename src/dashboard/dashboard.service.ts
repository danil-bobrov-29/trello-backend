import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Dashboards, Prisma } from '@prisma/client'
import { BaseService } from '../common/base.service'
import { PrismaService } from '../prisma.service'
import { createTimeBlockDefault } from '../time-block/time-block.data'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'

@Injectable()
export class DashboardService extends BaseService<
  Dashboards,
  Prisma.DashboardsCreateInput,
  UpdateDashboardDto,
  Prisma.DashboardsWhereInput
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  get model() {
    return this.prisma.dashboards
  }

  async createWithTimeBlocks(
    data: Prisma.DashboardsCreateInput
  ): Promise<Dashboards> {
    try {
      return await this.prisma.dashboards.create({
        data: {
          ...data,
          timeBlocks: {
            create: createTimeBlockDefault,
          },
        },
      })
    } catch {
      throw new ConflictException('Conflict add dashboard')
    }
  }

  async findOne(
    id: string,
    filters?: Omit<Prisma.DashboardsWhereInput, 'id'>
  ): Promise<Dashboards> {
    const dashboard = await this.model.findFirst({
      where: { id, ...filters },
      include: {
        timeBlocks: true,
      },
    })

    if (!dashboard) {
      throw new NotFoundException('Not Found Dashboard')
    }
    return dashboard
  }
}