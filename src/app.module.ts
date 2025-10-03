import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, AuthModule, DashboardModule],
})
export class AppModule {}
