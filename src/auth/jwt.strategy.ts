import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JsonWebTokenError, JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async createAssessToken(payload: { sub: string }): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    })
  }

  async createRefreshToken(payload: { sub: string }): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    })
  }

  async createTokens(user_id: string) {
    const payload = { sub: user_id }

    const accessToken = await this.createAssessToken(payload)
    const refreshToken = await this.createRefreshToken(payload)

    return { accessToken, refreshToken }
  }

  async verify(token: string) {
    try {
      return await this.jwtService.verifyAsync(token)
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return null
      }
    }
  }
}
