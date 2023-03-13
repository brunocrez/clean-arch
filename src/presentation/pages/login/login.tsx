import React, { useEffect, useState } from 'react'
import styles from './login-styles.scss'
import { Header, Footer, FormStatus, Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
}: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className={styles.login}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            disabled={!!state.emailError || !!state.passwordError}
            className={styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={styles.link}>criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
