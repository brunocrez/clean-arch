import { RemoteAuthentication } from '@/data/usecases'
import { HttpClientSpy } from '@/data/test'
import { mockAccountModel, mockAuth } from '@/domain/test'
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpClient: HttpClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClient = new HttpClientSpy<RemoteAuthentication.Model>()
  const sut = new RemoteAuthentication(url, httpClient)
  return {
    sut,
    httpClient,
  }
}

describe('RemoteAuthentication', () => {
  test('should call http client with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClient } = makeSut(url)
    await sut.auth(mockAuth())
    expect(httpClient.url).toBe(url)
  })

  test('should call http client with correct body', async () => {
    const mock = mockAuth()
    const { sut, httpClient } = makeSut()
    await sut.auth(mock)
    expect(httpClient.body).toEqual(mock)
  })

  test('should throw UnexpectedError when http post client returns 400', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = { statusCode: HttpStatusCode.BAD_REQUEST }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw InvalidCredentialError when http post client returns 401', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = { statusCode: HttpStatusCode.UNAUTHORIZED }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new InvalidCredentialError())
  })

  test('should throw UnexpectedError when http post client returns 404', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = { statusCode: HttpStatusCode.NOT_FOUND }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError when http post client returns 500', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = { statusCode: HttpStatusCode.SERVER_ERROR }
    const promise = sut.auth(mockAuth())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel when http post client returns 200', async () => {
    const { sut, httpClient } = makeSut()
    const httpResponse = mockAccountModel()
    httpClient.response = {
      statusCode: HttpStatusCode.SUCCESS,
      body: httpResponse,
    }
    const promise = await sut.auth(mockAuth())
    expect(promise).toEqual(httpResponse)
  })
})
