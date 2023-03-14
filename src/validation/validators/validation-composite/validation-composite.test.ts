import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('should return error any validation fails', () => {
    const fieldValidationSpy1 = new FieldValidationSpy('any-field')
    fieldValidationSpy1.error = new Error('first_error')
    const fieldValidationSpy2 = new FieldValidationSpy('any-field')
    fieldValidationSpy2.error = new Error('second_error')
    const sut = new ValidationComposite([
      fieldValidationSpy1,
      fieldValidationSpy2,
    ])
    const error = sut.validate('any-field', 'any-value')
    expect(error).toBe('first_error')
  })
})
