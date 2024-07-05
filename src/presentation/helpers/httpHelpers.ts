import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
