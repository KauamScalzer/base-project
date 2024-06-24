export class AlreadyInUseError extends Error {
  constructor (paramName: string) {
    super(`The recieved ${paramName} is already in use`)
    this.name = 'AlreadyInUseError'
  }
}
