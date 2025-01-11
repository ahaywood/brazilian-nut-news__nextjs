import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = () => {
    const date = new Date()
    return date.getFullYear()
  }

  return (
    <footer className="px-16">
      Copyright &copy;{currentYear()}.{' '}
      <a href="https://ahhacreative.com" target="_blank" rel="noreferrer">
        Ah Ha Creative, LLC
      </a>
      . All Rights Reserved.
      <br />
      <Link href="/legal/privacy">Privacy Policy</Link> .{' '}
      <Link href="/legal/disclaimers">Disclaimers</Link> .{' '}
      <Link href="/legal/terms">Terms and Conditions</Link>
    </footer>
  )
}

export { Footer }
