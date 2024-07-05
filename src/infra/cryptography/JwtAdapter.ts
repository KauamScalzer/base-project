import { IEncrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter {
  constructor (
    private readonly secret: string
  ) {}
  async encrypt (string: string): Promise<string> {
    return jwt.sign({ id: string }, this.secret)
  }
}
