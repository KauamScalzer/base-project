import { IVerifyUserExistByEmailRepository } from '../../../src/data/protocols/db/user'

export class VerifyUserExistByEmailRepositorySpy implements IVerifyUserExistByEmailRepository {
  email?: string
  result: boolean = true
  async verify (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}
