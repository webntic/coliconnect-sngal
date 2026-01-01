import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { TransportGP } from '@/components/TransportGP'
import { VoyageurPlus } from '@/components/VoyageurPlus'
import { PricingInfo } from '@/components/PricingInfo'
import { About } from '@/components/About'
import { WhyUs } from '@/components/WhyUs'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { AuthScreen } from '@/components/AuthScreen'
import { SenderDashboard } from '@/components/SenderDashboard'
import { TransporterDashboard } from '@/components/TransporterDashboard'
import { AdminDashboard } from '@/components/AdminDashboard'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { DeparturesSchedule } from '@/components/DeparturesSchedule'
import { useAuth } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/sonner'
import { seedTestDepartures } from '@/lib/seed-data'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const { currentUser, isAuthenticated, login } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeTestData = async () => {
      try {
        await seedTestDepartures()
        setIsInitialized(true)
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des données de test:', error)
        setIsInitialized(true)
      }
    }

    initializeTestData()
  }, [])

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!showLanding && !isAuthenticated) {
    return (
      <>
        <AuthScreen 
          onAuth={(user) => login(user)} 
          onBackToHome={() => setShowLanding(true)}
        />
        <WhatsAppButton />
        <Toaster />
      </>
    )
  }

  if (isAuthenticated && currentUser) {
    return (
      <>
        {currentUser.role === 'admin' ? (
          <AdminDashboard />
        ) : currentUser.role === 'sender' ? (
          <SenderDashboard />
        ) : (
          <TransporterDashboard />
        )}
        <WhatsAppButton />
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigateToDashboard={() => setShowLanding(false)} />
      <Hero onGetStarted={() => setShowLanding(false)} />
      <Services />
      <TransportGP />
      <VoyageurPlus />
      <PricingInfo />
      <About />
      <WhyUs />
      <div id="nos-departs" className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
        <DeparturesSchedule standalone={true} />
      </div>
      <Contact />
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}

export default App