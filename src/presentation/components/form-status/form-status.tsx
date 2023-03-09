import React from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form-context'

const FormStatus: React.FC = () => {
  const { errorMessage, isLoading } = useFormContext()
  return (
    <div data-testid="bottom-wrapper" className={styles.bottomWrapper}>
      {isLoading && <Spinner style={styles.spinner} />}
      {errorMessage && <span className={styles.error}>error</span>}
    </div>
  )
}

export default FormStatus
