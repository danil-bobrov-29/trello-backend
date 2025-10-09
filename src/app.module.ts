import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CardModule } from './card/card.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { TimeBlockModule } from './time-block/time-block.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    UserModule,
    AuthModule,
    DashboardModule,
    TimeBlockModule,
    CardModule,
  ],
})
export class AppModule {}
