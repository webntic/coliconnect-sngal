import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { List, X, WhatsappLogo, Phone } from '@phosphor-icons/react'

interface NavigationProps {
  onNavigateToDashboard?: () => void
}

export function Navigation({ onNavigateToDashboard }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-card via-card to-muted/30 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="h-20 w-auto flex items-center p-2 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
              <img 
                src={logoUrl} 
                alt="MBS Transport Logo" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png'
                }}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20 mr-4">
              <WhatsappLogo size={20} weight="fill" className="text-green-500" />
              <div>
                <p className="text-[10px] text-muted-foreground font-medium leading-tight">Service Client</p>
                <a 
                  href="https://wa.me/221773068652" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Phone size={12} weight="bold" />
                  +221 77 306 86 52
                </a>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-all hover:scale-105 relative group"
            >
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-all hover:scale-105 relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('devis')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-all hover:scale-105 relative group"
            >
              Devis en Ligne
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('a-propos')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-all hover:scale-105 relative group"
            >
              À Propos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-all hover:scale-105 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </button>
            <Button onClick={() => scrollToSection('devis')} size="sm" className="bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:scale-105 transition-all">
              Calculer un Devis
            </Button>
            {onNavigateToDashboard && (
              <Button onClick={onNavigateToDashboard} size="sm" variant="outline" className="hover:bg-primary/10 hover:border-primary transition-all">
                Espace Client
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-gradient-to-b from-transparent to-muted/30 backdrop-blur-xl border-t border-border/30">
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-3 rounded-xl border border-green-500/20 mb-2">
              <WhatsappLogo size={28} weight="fill" className="text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Service Client</p>
                <a 
                  href="https://wa.me/221773068652" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Phone size={14} weight="bold" />
                  +221 77 306 86 52
                </a>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('devis')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Devis en Ligne
            </button>
            <button
              onClick={() => scrollToSection('a-propos')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection('devis')} className="w-full bg-gradient-to-r from-accent to-secondary hover:shadow-lg">
              Calculer un Devis
            </Button>
            {onNavigateToDashboard && (
              <Button onClick={onNavigateToDashboard} variant="outline" className="w-full hover:bg-primary/10">
                Espace Client
              </Button>
            )}
          </div>
        )}
    </nav>
  )
}
