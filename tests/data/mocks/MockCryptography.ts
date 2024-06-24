import { faker } from '@faker-js/faker'
import { IHasher } from '../../../src/data/protocols/cryptography'

export class HasherSpy implements IHasher {
  stringToHash?: string
  result: string = faker.string.uuid()
  async hash (stringToHash: string): Promise<string> {
    this.stringToHash = stringToHash
    return this.result
  }
}
