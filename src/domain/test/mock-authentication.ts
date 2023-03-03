import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'

export const mockAuth = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
