import { useKV } from '@github/spark/hooks'
import { Separator } from '@/components/ui/separator'
import { Phone, Envelope, MapPin, FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')

  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&h=600&fit=crop&q=80" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-auto flex items-center bg-white/95 rounded-xl px-3 py-2 shadow-lg">
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
            <div className="mb-4">
              <div className="text-xl font-bold">MBS Transport</div>
              <div className="text-sm opacity-90">Mondial Bagage Services</div>
            </div>
            <p className="text-sm opacity-95 leading-relaxed">
              Votre partenaire de confiance pour le transport international entre le Sénégal, la France et le monde entier.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              Nos Services
              <div className="h-px flex-1 bg-white/20 max-w-[60px]"></div>
            </h4>
            <ul className="space-y-3 text-sm opacity-95">
              <li className="hover:opacity-100 hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                Fret Maritime
              </li>
              <li className="hover:opacity-100 hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                Fret Aérien
              </li>
              <li className="hover:opacity-100 hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                Envoi Express DHL
              </li>
              <li className="hover:opacity-100 hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                Transport Sous-Région
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              Contact Sénégal
              <div className="h-px flex-1 bg-white/20 max-w-[60px]"></div>
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone size={18} weight="duotone" />
                </div>
                <div>
                  <div className="text-xs opacity-80 mb-1">Appelez-nous</div>
                  <a href="tel:+221730615015" className="hover:opacity-100 transition-opacity font-semibold">
                    +221 73 061 50 15
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <MapPin size={18} weight="duotone" />
                </div>
                <div className="opacity-95 leading-relaxed">
                  Ouest Foire, en face l'hôpital Philippe Senghor<br />
                  Dakar, Sénégal
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              Contact France
              <div className="h-px flex-1 bg-white/20 max-w-[60px]"></div>
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone size={18} weight="duotone" />
                </div>
                <div>
                  <div className="text-xs opacity-80 mb-1">Appelez-nous</div>
                  <a href="tel:+33753343539" className="hover:opacity-100 transition-opacity font-semibold">
                    +33 7 53 34 35 39
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <MapPin size={18} weight="duotone" />
                </div>
                <div className="opacity-95 leading-relaxed">
                  4 rue Claude Debussy<br />
                  92220 Bagneux, France
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-sm opacity-90 text-center md:text-left">
              © {currentYear} MBS Transport. Tous droits réservés.
            </div>
            <a 
              href="https://webntic.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs opacity-75 hover:opacity-100 transition-opacity text-center md:text-left group"
            >
              Powered by{' '}
              <span className="font-semibold group-hover:underline">webntic.com</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Facebook"
            >
              <FacebookLogo size={20} weight="fill" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="Instagram"
            >
              <InstagramLogo size={20} weight="fill" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={20} weight="fill" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
