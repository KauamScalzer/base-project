import { IHasher } from '../../data/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher {
  constructor (
    private readonly salt: number
  ) {}

  async hash (stringToHash: string): Promise<string> {
    return bcrypt.hash(stringToHash, this.salt)
  }
}
