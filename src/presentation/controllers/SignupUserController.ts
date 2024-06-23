import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/httpHelpers'
import { HttpResponse } from '../protocols'

export class SignUpUserController {
  async handle (request: SignUpUserController.Request): Promise<HttpResponse> {
    if (!request.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!request.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!request.password) {
      return badRequest(new MissingParamError('password'))
    }
    return {
      statusCode: 501,
      body: 'Not Implemented'
    }
  }
}

export namespace SignUpUserController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
