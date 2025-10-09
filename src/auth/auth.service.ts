import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import * as express from 'express'
import { TokenService } from '../token/token.service'
import { UserService } from '../user/user.service'
import { TUserResponse } from '../user/user.types'
import { AuthDto, RegisterDto } from './dto/auth.dto'
import { JwtStrategy } from './jwt.strategy'
import { PasswordService } from './password.service'
import { ILoginResponse } from './types/auth.types'

@Injectable()
export class AuthService {
  REFRESH_TOKEN_NAME = 'refreshToken'
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly tokenService: TokenService
  ) {}

  async register({
    email,
    password,
    firstName,
    surname,
  }: RegisterDto): Promise<TUserResponse> {
    const existingUser: User | null = await this.userService.getByEmail(email)

    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    const passwordHash: string =
      await this.passwordService.hashPassword(password)

    return await this.userService.create({
      email,
      firstName,
      surname,
      passwordHash,
    })
  }

  async login({ email, password }: AuthDto): Promise<ILoginResponse> {
    const user: User = await this.validateUser({ email })

    const isVerify = await this.passwordService.verifyPassword(
      password,
      user.passwordHash
    )

    if (!isVerify) {
      throw new UnauthorizedException('Invalid password')
    }

    const { accessToken, refreshToken } = await this.jwtStrategy.createTokens(
      user.id
    )

    await this.tokenService.createToken({
      refreshToken,
      user: { connect: { id: user.id } },
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(filter: Prisma.UserWhereInput): Promise<User> {
    const existingUser: User | null = await this.userService.getFirstByFilter({
      ...filter,
    })

    if (!existingUser) {
      throw new NotFoundException('User does not exist')
    }

    return existingUser
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtStrategy.verify(refreshToken)

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const user = await this.validateUser({ id: result.sub })

    return await this.jwtStrategy.createAssessToken({ sub: user.id })
  }

  async isVerifyToken(token: string): Promise<boolean> {
    const isVerify = await this.jwtStrategy.verify(token)

    return !!isVerify
  }

  addRefreshTokenToResponse(response: express.Response, refreshToken: string) {
    response.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      sameSite: 'none',
      path: '/',
    })
  }

  removeRefreshTokenFromResponse(response: express.Response) {
    response.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
      path: '/',
    })
  }
}
