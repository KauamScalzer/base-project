export class InvalidParamTypeError extends Error {
  constructor (paramName: string) {
    super(`Invalid type for param: ${paramName}`)
    this.name = 'InvalidParamTypeError'
  }
}
