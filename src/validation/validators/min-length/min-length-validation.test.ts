import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  test('should return error if field is invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should not return error if field is valid', () => {
    const sut = makeSut(3)
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
