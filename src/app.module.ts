import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { UserModule } from './user/user.module'
import { TimeBlockModule } from './time-block/time-block.module';

@Module({
  imports: [UserModule, AuthModule, DashboardModule, TimeBlockModule],
})
export class AppModule {}
