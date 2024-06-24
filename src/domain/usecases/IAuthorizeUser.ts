export interface IAuthorizeUser {
  authorize: (email: string, password: string) => Promise<IAuthorizeUser.Result> 
}

export namespace IAuthorizeUser {
  export type Result = {
    id: number
    token: string
    name: string
  } | null
}
