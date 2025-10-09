import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import * as express from 'express'
import { TUserResponse } from '../user/user.types'
import { AuthService } from './auth.service'
import { RefreshToken } from './decorator/refresh-token.decorator'
import { AuthDto, RegisterDto } from './dto/auth.dto'
import { RefreshTokenGuard } from './guard/refresh-token.guard'

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
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @RefreshToken() refreshToken: string
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.getNewTokens(refreshToken)
    return { accessToken }
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh/verify')
  @UseGuards(RefreshTokenGuard)
  async verifyRefreshToken(
    @RefreshToken() refreshToken: string
  ): Promise<{ isVerify: boolean }> {
    const isVerify = await this.authService.isVerifyToken(refreshToken)

    return { isVerify }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: express.Response) {
    this.authService.removeRefreshTokenFromResponse(response)
    return true
  }
}
