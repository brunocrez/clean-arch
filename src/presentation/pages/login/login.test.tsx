import React from 'react'
import { render, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { InvalidCredentialError } from '@/domain/errors'
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

const populateEmail = async (
  sut: RenderResult,
  email = faker.internet.email()
) => {
  const emailInput = sut.getByTestId('email')
  await userEvent.type(emailInput, email)
}

const populatePassword = async (
  sut: RenderResult,
  password = faker.internet.password()
) => {
  const passwordInput = sut.getByTestId('password')
  await userEvent.type(passwordInput, password)
}

const simulateStatus = (
  sut: RenderResult,
  name: string,
  validationError?: string
) => {
  const status = sut.getByTestId(`${name}-status`)
  expect(status.title).toBe(validationError || 'GREAT!')
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢')
}

const submitValidForm = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  await populateEmail(sut, email)
  await populatePassword(sut, password)
  const button = sut.getByTestId('submit')
  await userEvent.click(button)
}

describe('Login Component', () => {
  beforeEach(() => localStorage.clear())

  test('should have initial state', () => {
    const { sut, validationStub } = makeSut()
    const bottomWrapper = sut.getByTestId('bottom-wrapper')
    expect(bottomWrapper.childElementCount).toBe(0)
    const button = sut.getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(true)
    simulateStatus(sut, 'email', validationStub.errorMessage)
    simulateStatus(sut, 'password', validationStub.errorMessage)
  })

  test('should show email error if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    await populateEmail(sut)
    simulateStatus(sut, 'email', validationStub.errorMessage)
  })

  test('should show password error if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    await populatePassword(sut)
    simulateStatus(sut, 'password', validationStub.errorMessage)
  })

  test('should show valid email state if validation goes well', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    await populateEmail(sut)
    simulateStatus(sut, 'email')
  })

  test('should show valid password state if validation goes well', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    await populatePassword(sut)
    simulateStatus(sut, 'password')
  })

  test('should enable the button if form is valid', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    await populateEmail(sut)
    await populatePassword(sut)
    const button = sut.getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })

  test('should show spinner on submit', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    await submitValidForm(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call authentication with right values', async () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = null
    const email = faker.internet.email()
    const password = faker.internet.password()
    await submitValidForm(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call authentication only once', async () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = null
    await populateEmail(sut)
    await populatePassword(sut)
    const button = sut.getByTestId('submit')
    await userEvent.dblClick(button)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should show error if authentication fails', async () => {
    const { sut, authenticationSpy, validationStub } = makeSut()
    validationStub.errorMessage = null
    const error = new InvalidCredentialError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await submitValidForm(sut)
    const bottomWrapper = sut.getByTestId('bottom-wrapper')
    await waitFor(() => bottomWrapper)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
  })
})
