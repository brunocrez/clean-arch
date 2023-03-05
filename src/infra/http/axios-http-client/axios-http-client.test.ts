import { AxiosHttpClient } from './axios-http-client'

import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const mockResponse = {
  status: faker.datatype.number(),
  data: faker.random.objectElement()
}

mockAxios.post.mockResolvedValue(mockResponse)

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

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
