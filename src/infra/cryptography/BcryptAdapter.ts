import { IHasher, IHashComparer } from '@/data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (
    private readonly salt: number
  ) {}

  async hash (stringToHash: string): Promise<string> {
    return bcrypt.hash(stringToHash, this.salt)
  }

  async compare (compareString: string, hashedString: string): Promise<boolean> {
    return bcrypt.compare(compareString, hashedString)
  }
}
