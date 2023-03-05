import { AxiosHttpClient } from './axios-http-client'

import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('should call axios with right URL', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockAxios).toHaveBeenCalledWith(url)
  })
})
