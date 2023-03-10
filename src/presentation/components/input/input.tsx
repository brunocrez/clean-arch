import React from 'react'
import styles from './input-wrapper.scss'
import { useFormContext } from '@/presentation/contexts/form-context'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { state, setState } = useFormContext()
  const error = props.name ? state?.[`${props.name}Error`] : ''

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const getStatus = (): string => {
    return '🔴'
    // 🟢
  }

  return (
    <div className={styles.inputWrapper}>
      <input {...props} data-testid={props.name} onChange={handleChange} />
      <span
        data-testid={`${props.name}-status`}
        title={`${error}`}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
