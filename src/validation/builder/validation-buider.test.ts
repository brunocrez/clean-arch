import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import faker from 'faker'

describe('ValidationBuilder', () => {
  const name = faker.database.column()
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field(name).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(name)])
  })

  test('should return EmailValidation', () => {
    const name = faker.database.column()
    const validations = sut.field(name).email().build()
    expect(validations).toEqual([new EmailValidation(name)])
  })

  test('should return MinLengthValidation', () => {
    const name = faker.database.column()
    const minLength = faker.datatype.number()
    const validations = sut.field(name).min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(name, minLength)])
  })

  test('should return a list of validations', () => {
    const name = faker.database.column()
    const minLength = faker.datatype.number()
    const validations = sut
      .field(name)
      .required()
      .min(minLength)
      .email()
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(name),
      new MinLengthValidation(name, minLength),
      new EmailValidation(name),
    ])
  })
})
