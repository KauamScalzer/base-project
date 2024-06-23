import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/httpHelpers'
import { HttpResponse } from '../protocols'

export class SignUpUserController {
  async handle (request: SignUpUserController.Request): Promise<HttpResponse> {
    if (!request.name) {
      return badRequest(new MissingParamError('name'))
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
