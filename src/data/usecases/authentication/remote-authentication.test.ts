import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { mockAuth } from '../../../domain/test/mock-authentication'

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
})
