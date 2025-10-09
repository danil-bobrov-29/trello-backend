import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, TimeBlock } from '@prisma/client'
import { BaseService } from '../common/base.service'
import { PrismaService } from '../prisma.service'
import { UpdateTimeBlockDto } from './dto/time-block.dto'

@Injectable()
export class TimeBlockService extends BaseService<
  TimeBlock,
  Prisma.TimeBlockCreateInput,
  UpdateTimeBlockDto,
  Prisma.TimeBlockWhereInput
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  get model() {
    return this.prisma.timeBlock
  }

  async findOne(
    id: string,
    filters?: Omit<Prisma.TimeBlockWhereInput, 'id'>
  ): Promise<TimeBlock> {
    const timeBlock = await this.model.findFirst({
      where: { id, ...filters },
      include: {
        cards: true,
      },
    })

    if (!timeBlock) {
      throw new NotFoundException('Not Found Time Block')
    }
    return timeBlock
  }

  async findAll(filters: Prisma.TimeBlockWhereInput): Promise<TimeBlock[]> {
    return this.model.findMany({
      where: filters,
      include: {
        cards: true,
      },
      orderBy: {
        order: 'asc',
      },
    })
  }
}
