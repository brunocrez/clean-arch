import React, { createContext, useContext, useState } from 'react'

const FormContext = createContext({} as FormStateProps)

type FormContextProps = {
  children: React.ReactNode
}

type FormStateProps = {
  isLoading: boolean
  errorMessage: string
}

const FormContextProvider = ({ children }: FormContextProps) => {
  const [formState] = useState<FormStateProps>({
    isLoading: false,
    errorMessage: '',
  })

  return (
    <FormContext.Provider value={formState}>{children}</FormContext.Provider>
  )
}

export const useFormContext = () => {
  const ctx = useContext(FormContext)
  console.log(ctx)
  if (!ctx) {
    throw new Error('useFormContext must be used within FormContextProvider')
  }
  return ctx
}

export default FormContextProvider
