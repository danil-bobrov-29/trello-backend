import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DashboardService } from '../dashboard.service'

@Injectable()
export class DashboardGuard implements CanActivate {
  constructor(private readonly dashboardService: DashboardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request.user.id
    const dashboardId = request.params.dashboardId

    try {
      const dashboard = await this.dashboardService.findOne(dashboardId, {
        userId,
      })
      request.dashboard = dashboard

      return true
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('You do not have access to this dashboard')
      }

      return false
    }
  }
}