import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext): User[keyof User] | User => {
    const request = context.switchToHttp().getRequest()
    const currentUser = request.user

    return data ? currentUser[data] : currentUser
  }
)
