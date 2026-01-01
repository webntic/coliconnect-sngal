import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { QuoteCalculator } from '@/components/QuoteCalculator'
import { PricingInfo } from '@/components/PricingInfo'
import { About } from '@/components/About'
import { WhyUs } from '@/components/WhyUs'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { AuthScreen } from '@/components/AuthScreen'
import { SenderDashboard } from '@/components/SenderDashboard'
import { TransporterDashboard } from '@/components/TransporterDashboard'
import { useAuth } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const { currentUser, isAuthenticated, login } = useAuth()

  if (!showLanding && !isAuthenticated) {
    return (
      <>
        <AuthScreen onAuth={(user) => login(user)} />
        <Toaster />
      </>
    )
  }

  if (isAuthenticated && currentUser) {
    return (
      <>
        {currentUser.role === 'sender' ? (
          <SenderDashboard />
        ) : (
          <TransporterDashboard />
        )}
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigateToDashboard={() => setShowLanding(false)} />
      <Hero onGetStarted={() => setShowLanding(false)} />
      <Services />
      <QuoteCalculator />
      <PricingInfo />
      <About />
      <WhyUs />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App