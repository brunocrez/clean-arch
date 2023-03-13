import React from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { useFormContext } from '@/presentation/contexts/form-context'

const FormStatus: React.FC = () => {
  const { state } = useFormContext()
  const { isLoading, mainError } = state
  return (
    <div data-testid="bottom-wrapper" className={styles.bottomWrapper}>
      {isLoading && <Spinner style={styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={styles.error}>
          {mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatus
