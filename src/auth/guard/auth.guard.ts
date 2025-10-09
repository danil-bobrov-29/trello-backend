import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { JwtStrategy } from '../jwt.strategy'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Token not found')
    }

    try {
      const { sub } = await this.jwtStrategy.verify(token)
      const user = await this.userService.getById(sub)

      if (!user) {
        throw new NotFoundException('User not found')
      }

      request.user = user
    } catch {
      throw new UnauthorizedException('Invalid token')
    }

    return true
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
