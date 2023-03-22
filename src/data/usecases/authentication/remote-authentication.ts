import { Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { HttpStatusCode, HttpClient } from '@/data/protocols/http'
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: Authentication.Params): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      body: params,
      method: 'post',
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.SUCCESS:
        return httpResponse.body
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
