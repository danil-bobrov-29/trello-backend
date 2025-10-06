import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Dashboards, Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { createTimeBlockDefault } from '../time-block/time-block.data'
import { IDashboardResponse } from './dashboard.types'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.DashboardsCreateInput,
    isTimeBlock: boolean
  ): Promise<Dashboards> {
    try {
      if (isTimeBlock) {
        return await this.prisma.dashboards.create({
          data: {
            ...data,
            timeBlocks: {
              create: createTimeBlockDefault,
            },
          },
        })
      }
      return await this.prisma.dashboards.create({ data })
    } catch {
      throw new ConflictException('Conflict add dashboard')
    }
  }

  async findAll(filters: Prisma.DashboardsWhereInput): Promise<Dashboards[]> {
    return this.prisma.dashboards.findMany({ where: filters })
  }

  async findOne(
    id: string,
    filters?: Omit<Prisma.DashboardsWhereInput, 'id'>
  ): Promise<IDashboardResponse> {
    const dashboard = await this.prisma.dashboards.findFirst({
      where: {
        id,
        ...filters,
      },
      select: {
        id: true,
        title: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
        timeBlocks: true,
      },
    })

    if (!dashboard) {
      throw new NotFoundException('Not Found Dashboard')
    }
    return dashboard as IDashboardResponse
  }

  async update(
    id: string,
    updateDashboardDto: UpdateDashboardDto,
    filters?: Prisma.DashboardsGetPayload<{ select: { id: false } }>
  ) {
    return this.prisma.dashboards.update({
      where: {
        id,
        ...filters,
      },
      data: updateDashboardDto,
    })
  }

  async remove(id: string, filters?: Omit<Prisma.DashboardsWhereInput, 'id'>) {
    return this.prisma.dashboards.delete({ where: { id: id, ...filters } })
  }
}
