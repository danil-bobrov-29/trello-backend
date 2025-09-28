import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import * as express from 'express'
import { TUserResponse } from '../user/user.types'
import { AuthService } from './auth.service'
import { AuthDto, RegisterDto } from './dto/auth.dto'
import { ILoginResponse } from './types/auth.types'

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
  async signInUser(@Body() userData: AuthDto): Promise<ILoginResponse> {
    return await this.authService.login(userData)
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@Req() request: express.Request): Promise<ILoginResponse> {
    const refreshTokenFromCookies: string =
      request.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      throw new UnauthorizedException('Refresh token not passed')
    }

    const accessToken = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )

    return { accessToken, refreshToken: refreshTokenFromCookies }
  }
}
