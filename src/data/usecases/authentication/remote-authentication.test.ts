import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test'
import { mockAccountModel, mockAuth } from '@/domain/test'
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClient)
  return { sut, httpPostClient }
}

describe('RemoteAuthentication', () => {
  test('should call http client with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClient } = makeSut(url)
    await sut.auth(mockAuth())
    expect(httpPostClient.url).toBe(url)
  })

  test('should call http client with correct body', async () => {
    const mock = mockAuth()
    const { sut, httpPostClient } = makeSut()
    await sut.auth(mock)
    expect(httpPostClient.body).toEqual(mock)
  })

  test('should throw UnexpectedError when http post client returns 400', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = { statusCode: HttpStatusCode.BAD_REQUEST }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw InvalidCredentialError when http post client returns 401', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = { statusCode: HttpStatusCode.UNAUTHORIZED }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new InvalidCredentialError())
  })

  test('should throw UnexpectedError when http post client returns 404', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = { statusCode: HttpStatusCode.NOT_FOUND }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError when http post client returns 500', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = { statusCode: HttpStatusCode.SERVER_ERROR }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel when http post client returns 200', async () => {
    const { sut, httpPostClient } = makeSut()
    const httpResponse = mockAccountModel()
    httpPostClient.response = {
      statusCode: HttpStatusCode.SUCCESS,
      body: httpResponse
    }
    const promise = await sut.auth(mockAuth())
    expect(promise).toEqual(httpResponse)
  })
})
