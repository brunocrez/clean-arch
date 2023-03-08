import React, { memo } from 'react'
import styles from './header-styles.scss'
import { Logo } from '@/presentation/components'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquete para Programadores</h1>
    </header>
  )
}

export default memo(Header)
