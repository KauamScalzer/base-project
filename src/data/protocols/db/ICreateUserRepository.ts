export interface ICreateUserRepository {
  create (user: ICreateUserRepository.Params): Promise<void>
}

export namespace ICreateUserRepository {
  export type Params = {
    name: string
    password: string
    email: string
  }
}
