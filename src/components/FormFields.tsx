'use client'

import { useFormStatus } from 'react-dom'

interface FormFieldsProps {
  children: React.ReactNode
}

export function FormFields({ children }: FormFieldsProps) {
  const { pending } = useFormStatus()

  return (
    <fieldset disabled={pending}>
      {children}
    </fieldset>
  )
}