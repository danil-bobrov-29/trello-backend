import { Injectable } from '@nestjs/common'
import { Card, Prisma } from '@prisma/client'
import { BaseService } from '../common/base.service'
import { PrismaService } from '../prisma.service'
import { UpdateCardDto } from './dto/card.dto'

@Injectable()
export class CardService extends BaseService<
  Card,
  Prisma.CardCreateInput,
  UpdateCardDto,
  Prisma.CardWhereInput
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  get model() {
    return this.prisma.card
  }
}
