import React, { createContext, useContext, useState } from 'react'

const FormContext = createContext(null)

type FormContextProps = {
  children: React.ReactNode
}

type FormStateProps = {
  isLoading: boolean
  errorMessage: string
  email: string
  password: string
}

const FormContextProvider = ({ children }: FormContextProps) => {
  const [formState, setFormState] = useState<FormStateProps>({
    isLoading: false,
    errorMessage: '',
    email: '',
    password: '',
  })

  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const ctx = useContext(FormContext)
  if (!ctx) {
    throw new Error('useFormContext must be used within FormContextProvider')
  }
  return ctx
}

export default FormContextProvider
