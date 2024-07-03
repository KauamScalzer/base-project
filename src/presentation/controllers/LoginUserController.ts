import { IAuthorizeUser } from '../../domain/usecases'
import { InvalidParamTypeError, MissingParamError } from '../errors'
import { badRequest, ok, serverError, unauthorized } from '../helpers/httpHelpers'
import { Controller, HttpResponse } from '../protocols'

export class LoginUserController implements Controller {
  constructor (
    private readonly authorizeUser: IAuthorizeUser
  ) {}

  async handle (request: LoginUserController.Request): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['email', 'password']
      for (const field of requiredFields) {
        if (!request[field as keyof LoginUserController.Request]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (typeof request.email !== 'string') {
        return badRequest(new InvalidParamTypeError('email'))
      }
      if (typeof request.password !== 'string') {
        return badRequest(new InvalidParamTypeError('password'))
      }
      const result = await this.authorizeUser.authorize(request.email, request.password)
      if (!result) {
        return unauthorized()
      }
      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace LoginUserController {
  export type Request = {
    email: string
    password: string
  }
}
