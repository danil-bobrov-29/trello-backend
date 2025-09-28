import { Prisma } from '@prisma/client'

export type TUserResponse = Omit<Prisma.UserWhereInput, 'passwordHash'>
