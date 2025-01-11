import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  // TODO: Style the 404 page
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}