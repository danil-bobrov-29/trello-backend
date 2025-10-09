import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Dashboards } from '@prisma/client'

export const Dashboard = createParamDecorator(
  (
    data: keyof Dashboards,
    ctx: ExecutionContext
  ): Dashboards[keyof Dashboards] | Dashboards => {
    const request = ctx.switchToHttp().getRequest()
    const dashboardData = request.dashboard

    return data ? dashboardData?.[data] : dashboardData
  }
)