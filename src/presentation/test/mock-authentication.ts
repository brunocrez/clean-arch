import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++
    this.params = params
    return Promise.resolve(this.account)
  }
}
