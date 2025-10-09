import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { TimeBlockService } from '../time-block.service'

@Injectable()
export class TimeBlockGuard implements CanActivate {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const dashboardId = request.params.dashboardId
    const timeBlockId = request.query.id

    try {
      await this.timeBlockService.findOne(timeBlockId, {
        dashboardId,
      })

      return true
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException(
          "You don't have access to this temporary block."
        )
      }

      return false
    }
  }
}