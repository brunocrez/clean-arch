import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientSpy
}

const makeSut = (url = 'MOCK_URL'): SutTypes => {
  const httpPostClient = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClient)
  return { sut, httpPostClient }
}

describe('RemoteAuthentication', () => {
  test('should call http client with correct URL', async () => {
    const url = 'DEFAULT_URL'
    const { sut, httpPostClient } = makeSut(url)
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  })
})
