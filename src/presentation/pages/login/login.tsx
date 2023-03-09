import React from 'react'
import styles from './login-styles.scss'
import { Header, Footer, FormStatus } from '@/presentation/components'
import Input from '@/presentation/components/input/input'
import FormContextProvider from '@/presentation/contexts/form-context'

const Login: React.FC = () => {
  return (
    <FormContextProvider>
      <div className={styles.login}>
        <Header />
        <form className={styles.form}>
          <h2>Login</h2>
          <Input
            data-testid="email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            data-testid="password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={styles.link}>criar conta</span>
          <FormStatus />
        </form>
        <Footer />
      </div>
    </FormContextProvider>
  )
}

export default Login
