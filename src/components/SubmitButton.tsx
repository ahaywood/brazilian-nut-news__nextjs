'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className="w-full bg-cinder py-6 text-center text-[38px] font-bold leading-none text-icterine hover:bg-fountainBlue"
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}

export { SubmitButton }