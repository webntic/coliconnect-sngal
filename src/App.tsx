import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { QuoteCalculator } from '@/components/QuoteCalculator'
import { PricingInfo } from '@/components/PricingInfo'
import { About } from '@/components/About'
import { WhyUs } from '@/components/WhyUs'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
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