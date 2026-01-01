import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { List, X } from '@phosphor-icons/react'

interface NavigationProps {
  onNavigateToDashboard?: () => void
}

export function Navigation({ onNavigateToDashboard }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">MBS</span>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">MBS Transport</div>
              <div className="text-xs text-muted-foreground hidden sm:block">Mondial Bagage Services</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('devis')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Devis en Ligne
            </button>
            <button
              onClick={() => scrollToSection('a-propos')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection('devis')} size="sm" className="bg-accent hover:bg-accent/90">
              Calculer un Devis
            </Button>
            {onNavigateToDashboard && (
              <Button onClick={onNavigateToDashboard} size="sm" variant="outline">
                Espace Client
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('devis')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Devis en Ligne
            </button>
            <button
              onClick={() => scrollToSection('a-propos')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection('devis')} className="w-full bg-accent hover:bg-accent/90">
              Calculer un Devis
            </Button>
            {onNavigateToDashboard && (
              <Button onClick={onNavigateToDashboard} variant="outline" className="w-full">
                Espace Client
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
