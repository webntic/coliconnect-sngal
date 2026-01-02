import { Button } from '@/components/ui/button'
import { ArrowRight, CaretLeft, CaretRight } from '@phosphor-icons/react'
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
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&h=1080&fit=crop&q=80'
  },
  {
    title: 'Fret Aérien',
    description: 'Expédition rapide et sécurisée par avion pour vos colis urgents',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop&q=80'
  },
  {
    title: 'Envoi Express DHL',
    description: 'Service express international avec DHL pour une livraison ultra-rapide',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&h=1080&fit=crop&q=80'
  },
  {
    title: 'Transport Sous-Région',
    description: 'Livraison dans toute la sous-région du Sénégal et pays limitrophes',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1080&fit=crop&q=80'
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
        >
          <img 
            src={services[currentSlide].image}
            alt={services[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
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
