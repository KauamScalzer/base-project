import { InvalidParamTypeError, MissingParamError } from '../errors'
import { badRequest } from '../helpers/httpHelpers'
import { HttpResponse } from '../protocols'

export class SignUpUserController {
  async handle (request: SignUpUserController.Request): Promise<HttpResponse> {
    const requiredFields: string[] = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!request[field as keyof SignUpUserController.Request]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (typeof request.name !== 'string') {
      return badRequest(new InvalidParamTypeError('name'))
    }
    if (typeof request.email !== 'string') {
      return badRequest(new InvalidParamTypeError('email'))
    }
    if (typeof request.password !== 'string') {
      return badRequest(new InvalidParamTypeError('password'))
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
