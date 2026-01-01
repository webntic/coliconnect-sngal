import { useKV } from '@github/spark/hooks'
import { Separator } from '@/components/ui/separator'
import { Phone, Envelope, MapPin, FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&h=600&fit=crop&q=80" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-auto flex items-center bg-white rounded-lg px-2 py-1">
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
            <div className="mb-3">
              <div className="text-lg font-bold">MBS Transport</div>
              <div className="text-xs opacity-80">Mondial Bagage Services</div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Votre partenaire de confiance pour le transport international entre le Sénégal, la France et le monde entier.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Fret Maritime</li>
              <li>Fret Aérien</li>
              <li>Envoi Express DHL</li>
              <li>Transport Sous-Région</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Sénégal</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" weight="duotone" />
                <a href="tel:+221730615015" className="hover:opacity-80 transition-opacity">
                  +221 73 061 50 15
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" weight="duotone" />
                <div className="opacity-90">
                  Ouest Foire, en face l'hôpital Philippe Senghor<br />
                  Dakar, Sénégal
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact France</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" weight="duotone" />
                <a href="tel:+33753343539" className="hover:opacity-80 transition-opacity">
                  +33 7 53 34 35 39
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" weight="duotone" />
                <div className="opacity-90">
                  4 rue Claude Debussy<br />
                  92220 Bagneux, France
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm opacity-80">
            © {currentYear} MBS Transport. Tous droits réservés.
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <FacebookLogo size={18} weight="fill" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              aria-label="Instagram"
            >
              <InstagramLogo size={18} weight="fill" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={18} weight="fill" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
