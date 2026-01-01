import { Button } from '@/components/ui/button'
import { ArrowRight, Anchor, Airplane, Lightning, TruckTrailer, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '@/lib/types'
import { useState, useEffect } from 'react'

interface HeroProps {
  onGetStarted?: () => void
  onQuickLogin?: (user: User) => void
}

const services = [
  {
    title: 'Fret Maritime',
    description: 'Transport de marchandises par voie maritime entre le Sénégal et le monde entier',
    icon: Anchor,
    gradient: 'linear-gradient(135deg, oklch(0.45 0.18 240) 0%, oklch(0.55 0.15 240) 100%)',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)'
  },
  {
    title: 'Fret Aérien',
    description: 'Expédition rapide et sécurisée par avion pour vos colis urgents',
    icon: Airplane,
    gradient: 'linear-gradient(135deg, oklch(0.50 0.15 200) 0%, oklch(0.60 0.12 220) 100%)',
    pattern: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08) 0%, transparent 40%)'
  },
  {
    title: 'Envoi Express DHL',
    description: 'Service express international avec DHL pour une livraison ultra-rapide',
    icon: Lightning,
    gradient: 'linear-gradient(135deg, oklch(0.65 0.20 45) 0%, oklch(0.75 0.18 55) 100%)',
    pattern: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.15) 0%, transparent 45%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 35%)'
  },
  {
    title: 'Transport Sous-Région',
    description: 'Livraison dans toute la sous-région du Sénégal et pays limitrophes',
    icon: TruckTrailer,
    gradient: 'linear-gradient(135deg, oklch(0.48 0.16 160) 0%, oklch(0.58 0.14 180) 100%)',
    pattern: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)'
  }
]

export function Hero({ onGetStarted }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted()
    } else {
      scrollToContact()
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <section
      id="accueil"
      className="relative h-screen w-full overflow-hidden pt-[100px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            background: services[currentSlide].gradient,
          }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: services[currentSlide].pattern
            }}
          />
          
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)',
              backgroundSize: '60px 60px'
            }} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <div className="flex justify-center mb-8">
                {(() => {
                  const Icon = services[currentSlide].icon
                  return <Icon size={120} weight="thin" className="text-white/90" />
                })()}
              </div>

              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                Service {currentSlide + 1} / {services.length}
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                {services[currentSlide].title}
              </h1>
              
              <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium px-4">
                {services[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-10 py-7 text-xl font-bold transition-all hover:scale-105 shadow-2xl"
                >
                  Demander un Devis
                  <ArrowRight className="ml-2" size={24} weight="bold" />
                </Button>
                <Button
                  onClick={() => {
                    const element = document.getElementById('services')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  size="lg"
                  variant="outline"
                  className="bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white/25 px-10 py-7 text-xl font-bold"
                >
                  Tous nos Services
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all hover:scale-110"
      >
        <CaretLeft size={32} weight="bold" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all hover:scale-110"
      >
        <CaretRight size={32} weight="bold" />
      </button>

      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-12 bg-white' 
                : 'w-3 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
