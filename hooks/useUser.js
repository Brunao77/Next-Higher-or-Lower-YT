import { useState, useEffect } from 'react'
import { authStateChanged } from '../firebase/client'

export const useUser = () => {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    authStateChanged(setUser)
  }, [])

  return user
}
