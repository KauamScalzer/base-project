import { faker } from '@faker-js/faker'
import { IHasher, IHashComparer } from '../../../src/data/protocols/cryptography'

export class HasherSpy implements IHasher {
  stringToHash?: string
  result: string = faker.string.uuid()
  async hash (stringToHash: string): Promise<string> {
    this.stringToHash = stringToHash
    return this.result
  }
}

export class HashComparerSpy implements IHashComparer {
  hashedString?: string
  compareString?: string
  result: boolean = true
  async compare (compareString: string, hashedString: string): Promise<boolean> {
    this.hashedString = hashedString
    this.compareString = compareString
    return this.result
  }
}
