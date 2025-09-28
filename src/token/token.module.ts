import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TokenController } from './token.controller'
import { TokenService } from './token.service'

@Module({
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
