import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpyList: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpyList = [
    new FieldValidationSpy('any-field'),
    new FieldValidationSpy('any-field'),
  ]
  const sut = new ValidationComposite(fieldValidationSpyList)
  return { sut, fieldValidationSpyList }
}

describe('ValidationComposite', () => {
  test('should return error any validation fails', () => {
    const { sut, fieldValidationSpyList } = makeSut()
    fieldValidationSpyList[0].error = new Error('first_error')
    fieldValidationSpyList[1].error = new Error('second_error')
    const error = sut.validate('any-field', 'any-value')
    expect(error).toBe('first_error')
  })
})
