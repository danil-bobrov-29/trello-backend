import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import * as express from 'express'
import { TUserResponse } from '../user/user.types'
import { AuthService } from './auth.service'
import { AuthDto, RegisterDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signupUser(@Body() userData: RegisterDto): Promise<TUserResponse> {
    return await this.authService.register(userData)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInUser(
    @Body() userData: AuthDto,
    @Res({ passthrough: true }) response: express.Response
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.login(userData)
    this.authService.addRefreshTokenToResponse(response, refreshToken)
    return { accessToken }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(
    @Req() request: express.Request,
    @Res({ passthrough: true }) response: express.Response
  ): Promise<{ accessToken: string }> {
    const refreshTokenFromCookies: string =
      request.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(response)
      throw new UnauthorizedException('Refresh token not passed')
    }
    const accessToken = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )
    return { accessToken }
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: express.Response) {
    this.authService.removeRefreshTokenFromResponse(response)
    return true
  }
}
