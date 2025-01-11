'use client'

import React from 'react'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}