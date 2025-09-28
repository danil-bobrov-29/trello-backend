import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordService {
  private readonly rounds = 10

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.rounds)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
