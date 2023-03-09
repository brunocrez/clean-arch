import { useFormContext } from '@/presentation/contexts/form-context'
import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { formState, setFormState } = useFormContext()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  return <input {...props} data-testid={props.name} onChange={handleChange} />
}

export default Input
