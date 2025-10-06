import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../auth/jwt.strategy'
import { getJwtConfig } from '../config/jwt.config'
import { DashboardService } from '../dashboard/dashboard.service'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { TimeBlockController } from './time-block.controller'
import { TimeBlockService } from './time-block.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [TimeBlockController],
  providers: [
    TimeBlockService,
    PrismaService,
    ConfigService,
    JwtStrategy,
    UserService,
    DashboardService,
  ],
})
export class TimeBlockModule {}
