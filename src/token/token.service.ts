import { Injectable } from '@nestjs/common'
import { Prisma, Tokens } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async getTokenByUser(userId: string): Promise<Tokens | null> {
    return this.prisma.tokens.findFirst({
      where: {
        userId: userId,
      },
    })
  }

  async createToken(data: Prisma.TokensCreateInput): Promise<Tokens> {
    return this.prisma.tokens.create({ data })
  }
}
