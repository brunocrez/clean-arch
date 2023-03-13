import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

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
    try {
      event.preventDefault()
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const response = await authentication.auth({
        email: state.email,
        password: state.password,
      })
      localStorage.setItem('accessToken', response.accessToken)
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={styles.login}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
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
          <span
            onClick={() => navigate('/signup')}
            data-testid="signup"
            className={styles.link}
          >
            criar conta
          </span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
