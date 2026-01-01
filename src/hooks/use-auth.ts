import { useKV } from '@github/spark/hooks'
import { User } from '@/lib/types'

export function useAuth() {
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)

  const login = (user: User) => {
    setCurrentUser(() => user)
  }

  const logout = () => {
    setCurrentUser(() => null)
  }

  const updateUser = (updates: Partial<User>) => {
    setCurrentUser((current) => current ? { ...current, ...updates } : null)
  }

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    updateUser
  }
}
