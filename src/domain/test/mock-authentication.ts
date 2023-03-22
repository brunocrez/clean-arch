import { Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

import faker from 'faker'

export const mockAuth = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
})
