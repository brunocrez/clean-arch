import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  validate(name: string, value: string): string {
    return this.errorMessage
  }
}
