import { ICreateUser } from '../../domain/usecases'
import { AlreadyInUseError, InvalidParamTypeError, MissingParamError } from '../errors'
import { badRequest, conflict } from '../helpers/httpHelpers'
import { HttpResponse } from '../protocols'

export class SignUpUserController {
  constructor (
    private readonly createUser: ICreateUser
  ) {}

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
    const user = await this.createUser.create(request)
    if (!user) {
      return conflict(new AlreadyInUseError('email'))
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
