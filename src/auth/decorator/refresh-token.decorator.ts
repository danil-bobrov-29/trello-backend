import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const refreshTokenFromCookies: string = request.cookies['refreshToken']

    if (!refreshTokenFromCookies) {
      throw new UnauthorizedException('Refresh token not passed')
    }

    return refreshTokenFromCookies
  }
)
