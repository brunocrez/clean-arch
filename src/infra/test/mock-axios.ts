import { HttpPostParams } from '@/data/protocols/http'

import axios from 'axios'
import faker from 'faker'

export const mockAxios = axios as jest.Mocked<typeof axios>

export const mockResponse = {
  status: faker.datatype.number(),
  data: faker.random.objectElement()
}

mockAxios.post.mockResolvedValue(mockResponse)

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
