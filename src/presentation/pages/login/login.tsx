import React from 'react'
import styles from './login-styles.scss'

import { Header, Footer, FormStatus } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Digite seu e-mail" />
        <input type="password" name="password" placeholder="Digite sua senha" />
        <button className={styles.submit} type="submit">
          Entrar
        </button>
        <span className={styles.link}>criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
