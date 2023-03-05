import { mockAxios, mockPostRequest, mockResponse } from '@/infra/test/mock-axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  test('should call axios with right params', async () => {
    const request = mockPostRequest()
    const sut = new AxiosHttpClient()
    await sut.post(request)
    expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return correct response', async () => {
    const sut = new AxiosHttpClient()
    const response = await sut.post(mockPostRequest())
    expect(response).toEqual({
      statusCode: mockResponse.status,
      body: mockResponse.data
    })
  })
})
