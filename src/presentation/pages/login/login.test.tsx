import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const errorMessage = faker.random.words()
  validationStub.errorMessage = errorMessage
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return { sut, validationStub, authenticationSpy }
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

  test('should enable the button if form is valid', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    await userEvent.type(emailInput, faker.internet.email())
    await userEvent.type(passwordInput, faker.internet.password())
    const button = sut.getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })

  test('should show spinner on submit', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    await userEvent.type(emailInput, faker.internet.email())
    await userEvent.type(passwordInput, faker.internet.password())
    const button = sut.getByTestId('submit')
    await userEvent.click(button)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call authentication with right values', async () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const email = faker.internet.email()
    const password = faker.internet.password()
    await userEvent.type(emailInput, email)
    await userEvent.type(passwordInput, password)
    const button = sut.getByTestId('submit')
    await userEvent.click(button)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
})
