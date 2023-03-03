import { AccountModel } from 'domain/models/account-model'

type AuthenticationParam = {
  email: string
  password: string
}

export interface Authentication {
  auth (params: AuthenticationParam): Promise<AccountModel>
}