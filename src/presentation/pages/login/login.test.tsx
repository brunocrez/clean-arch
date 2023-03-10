import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const errorMessage = faker.random.words()
  validationStub.errorMessage = errorMessage
  const sut = render(<Login validation={validationStub} />)
  return { sut, validationStub }
}

describe('Login Component', () => {
  test('should have initial state', () => {
    const { sut, validationStub } = makeSut()
    const bottomWrapper = sut.getByTestId('bottom-wrapper')
    expect(bottomWrapper.childElementCount).toBe(0)
    const button = sut.getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should show email error if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    await userEvent.type(emailInput, faker.internet.email())
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('should show password error if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')
    await userEvent.type(passwordInput, faker.internet.password())
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should show valid email state if validation goes well', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')
    await userEvent.type(emailInput, faker.internet.email())
    expect(emailStatus.title).toBe('GREAT!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('should show valid password state if validation goes well', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')
    await userEvent.type(passwordInput, faker.internet.password())
    expect(passwordStatus.title).toBe('GREAT!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
