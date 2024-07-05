export interface IVerifyUserExistByEmailRepository {
  verify (email: string): Promise<boolean>
}
