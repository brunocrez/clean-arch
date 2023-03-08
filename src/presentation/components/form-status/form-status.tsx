import React from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'

const FormStatus: React.FC = () => {
  return (
    <div className={styles.bottomWrapper}>
      <Spinner style={styles.spinner} />
      <span className={styles.error}>error</span>
    </div>
  )
}

export default FormStatus
