import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../auth/jwt.strategy'
import { getJwtConfig } from '../config/jwt.config'
import { DashboardService } from '../dashboard/dashboard.service'
import { PrismaService } from '../prisma.service'
import { TimeBlockService } from '../time-block/time-block.service'
import { UserService } from '../user/user.service'
import { CardController } from './card.controller'
import { CardService } from './card.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [CardController],
  providers: [
    CardService,
    PrismaService,
    ConfigService,
    JwtStrategy,
    UserService,
    DashboardService,
    TimeBlockService,
  ],
})
export class CardModule {}
