import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAuth } from '@/domain/test/mock-authentication'
import { InvalidCredentialError } from '@/domain/errors/invalid-credential-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy()
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
})
