import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post (params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
    const response = await axios.post(params.url, params.body)
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}
