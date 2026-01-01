import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Package, Truck } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { User } from '@/lib/types'
import { toast } from 'sonner'

interface HeroProps {
  onGetStarted?: () => void
  onQuickLogin?: (user: User) => void
}

export function Hero({ onGetStarted, onQuickLogin }: HeroProps) {
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

  const handleQuickLogin = (role: 'admin' | 'sender' | 'transporter') => {
    let user: User

    if (role === 'admin') {
      user = {
        id: 'admin-demo',
        name: 'Administrateur MBS',
        email: 'admin@mbstransport.com',
        phone: '+221 77 306 15 15',
        role: 'admin',
        rating: 5.0,
        totalTransactions: 0,
        verified: true,
        createdAt: new Date().toISOString()
      }
      toast.success('Connexion en tant qu\'Administrateur')
    } else if (role === 'sender') {
      user = {
        id: 'sender-demo',
        name: 'Amadou Diallo',
        email: 'client@mbstransport.com',
        phone: '+221 77 123 45 67',
        role: 'sender',
        rating: 4.8,
        totalTransactions: 12,
        verified: true,
        createdAt: new Date().toISOString()
      }
      toast.success('Connexion en tant que Client')
    } else {
      user = {
        id: 'transporter-demo',
        name: 'Moussa Sarr',
        email: 'transporteur@mbstransport.com',
        phone: '+221 77 987 65 43',
        role: 'transporter',
        rating: 4.9,
        totalTransactions: 45,
        verified: true,
        createdAt: new Date().toISOString()
      }
      toast.success('Connexion en tant que Transporteur')
    }

    if (onQuickLogin) {
      onQuickLogin(user)
    }
  }

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[100px]"
      style={{
        background: 'linear-gradient(135deg, oklch(0.42 0.15 240) 0%, oklch(0.52 0.12 240) 50%, oklch(0.72 0.19 50) 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
            Transport International de Confiance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            MBS Transport
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Mondial Bagage Services
          </p>
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Votre partenaire de confiance pour le transport maritime et aérien entre le Sénégal, la France et le monde entier
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
            >
              Demander un Devis
              <ArrowRight className="ml-2" size={20} weight="bold" />
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById('services')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold"
            >
              Découvrir nos Services
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-12"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto">
              <div className="text-center mb-4">
                <h3 className="text-white font-semibold text-lg mb-1">Accès Rapide Démo</h3>
                <p className="text-white/70 text-sm">Testez la plateforme avec un compte démo</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  onClick={() => handleQuickLogin('admin')}
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-0 text-primary hover:text-primary h-auto py-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
                >
                  <Shield size={28} weight="fill" />
                  <div className="text-center">
                    <div className="font-bold">Administrateur</div>
                    <div className="text-xs text-muted-foreground">Gestion complète</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleQuickLogin('sender')}
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-0 text-primary hover:text-primary h-auto py-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
                >
                  <Package size={28} weight="fill" />
                  <div className="text-center">
                    <div className="font-bold">Client</div>
                    <div className="text-xs text-muted-foreground">Envoyer des colis</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleQuickLogin('transporter')}
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-0 text-primary hover:text-primary h-auto py-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
                >
                  <Truck size={28} weight="fill" />
                  <div className="text-center">
                    <div className="font-bold">Transporteur</div>
                    <div className="text-xs text-muted-foreground">Gérer les routes</div>
                  </div>
                </Button>
              </div>

              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/60 text-center">
                  <strong className="text-white/90">Identifiants des comptes test:</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs font-mono text-white/70">
                  <div className="text-center">
                    <div className="text-white/90 font-semibold mb-1">Admin</div>
                    <div>admin@mbstransport.com</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/90 font-semibold mb-1">Client</div>
                    <div>client@mbstransport.com</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/90 font-semibold mb-1">Transporteur</div>
                    <div>transporteur@mbstransport.com</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80">Années d'Expérience</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Colis Livrés</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Service Client</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
