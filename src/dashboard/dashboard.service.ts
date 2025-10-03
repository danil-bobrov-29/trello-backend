import { Injectable, NotFoundException } from '@nestjs/common'
import { Dashboards, Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DashboardsCreateInput): Promise<Dashboards> {
    return this.prisma.dashboards.create({ data })
  }

  async findAll(filters: Prisma.DashboardsWhereInput): Promise<Dashboards[]> {
    return this.prisma.dashboards.findMany({ where: filters })
  }

  async findOne(
    id: string,
    filters?: Omit<Prisma.DashboardsWhereInput, 'id'>
  ): Promise<Dashboards> {
    const dashboard = await this.prisma.dashboards.findFirst({
      where: {
        id,
        ...filters,
      },
    })

    if (!dashboard) {
      throw new NotFoundException('Not Found Dashboard')
    }
    return dashboard as Dashboards
  }

  async update(
    id: string,
    updateDashboardDto: UpdateDashboardDto,
    filters?: Omit<Prisma.DashboardsWhereInput, 'id'>
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
