export class InvalidCredentialError extends Error {
  constructor () {
    super('Invalid Credentials. Try again!')
    this.name = 'InvalidCredentialError'
  }
}
