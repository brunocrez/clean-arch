import React from 'react'
import styles from './spinner-styles.scss'

type SpinnerProps = {
  style: string
}

const Spinner: React.FC<SpinnerProps> = ({ style }: SpinnerProps) => {
  return (
    <div data-testid="spinner" className={`${styles.spinner} ${style}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
