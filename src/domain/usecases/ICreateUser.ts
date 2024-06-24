export interface ICreateUser {
  create: (user: ICreateUser.Params) => Promise<boolean> 
}

export namespace ICreateUser {
  export type Params = {
    name: string
    password: string
    email: string
  }
}
