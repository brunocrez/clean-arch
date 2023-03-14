import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpyList: FieldValidationSpy[]
}

const makeSut = (name: string): SutTypes => {
  const fieldValidationSpyList = [
    new FieldValidationSpy(name),
    new FieldValidationSpy(name),
  ]
  const sut = new ValidationComposite(fieldValidationSpyList)
  return { sut, fieldValidationSpyList }
}

describe('ValidationComposite', () => {
  test('should return error any validation fails', () => {
    const errorMessage = faker.random.words()
    const name = faker.database.column()
    const { sut, fieldValidationSpyList } = makeSut(name)
    fieldValidationSpyList[0].error = new Error(errorMessage)
    fieldValidationSpyList[1].error = new Error(faker.random.words())
    const error = sut.validate(name, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('should not return error none validation fails', () => {
    const name = faker.database.column()
    const { sut } = makeSut(name)
    const error = sut.validate(name, faker.random.word())
    expect(error).toBeFalsy()
  })
})
