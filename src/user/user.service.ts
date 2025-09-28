import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { TUserResponse } from './user.types'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
    })
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    })
  }

  async getFirstByFilter(filter: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        ...filter,
      },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<TUserResponse> {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        surname: true,
      },
    })
  }
}
