export interface ICreateUser {
  create: (user: ICreateUser.Params) => Promise<ICreateUser.Result> 
}

export namespace ICreateUser {
  export type Params = {
    name: string
    password: string
    email: string
  }

  export type Result = {
    id: number
  } | null
}
