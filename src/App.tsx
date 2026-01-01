import { useAuth } from '@/hooks/use-auth'
import { AuthScreen } from '@/components/AuthScreen'
import { Header } from '@/components/Header'
import { SenderDashboard } from '@/components/SenderDashboard'
import { TransporterDashboard } from '@/components/TransporterDashboard'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const { currentUser, isAuthenticated, login, logout } = useAuth()

  if (!isAuthenticated || !currentUser) {
    return (
      <>
        <AuthScreen onAuth={login} />
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={logout} />
      {currentUser.role === 'sender' ? (
        <SenderDashboard user={currentUser} />
      ) : (
        <TransporterDashboard user={currentUser} />
      )}
      <Toaster />
    </div>
  )
}

export default App