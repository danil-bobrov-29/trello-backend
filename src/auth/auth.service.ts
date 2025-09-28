import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { AST } from 'eslint'
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
    const existingUser: User | null = await this.userService.getByEmail(email)

    if (!existingUser) {
      throw new UnauthorizedException('User does not exist')
    }

    const isVerify: boolean = await this.passwordService.verifyPassword(
      password,
      existingUser.passwordHash
    )

    if (!isVerify) {
      throw new UnauthorizedException('Invalid password')
    }

    const { accessToken, refreshToken } = await this.jwtStrategy.createTokens(
      existingUser.id
    )

    await this.tokenService.createToken({
      refreshToken,
      user: { connect: { id: existingUser.id } },
    })

    return { accessToken: accessToken, refreshToken: refreshToken }
  }

  async getNewTokens(refreshToken: string): Promise<string> {
    const result = await this.jwtStrategy.verify(refreshToken)

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    return await this.jwtStrategy.createAssessToken({
      sub: result.sub,
    })
  }
}
