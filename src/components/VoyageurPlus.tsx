import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { 
  Airplane, 
  Suitcase, 
  MapPin, 
  Calendar, 
  CurrencyDollar, 
  User, 
  Phone, 
  EnvelopeSimple,
  CheckCircle,
  Package,
  ArrowRight
} from '@phosphor-icons/react'

interface TravelerOffer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  departureCity: string
  arrivalCity: string
  departureDate: string
  arrivalDate: string
  availableWeight: number
  pricePerKg: number
  additionalInfo: string
  flightNumber?: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
}

export function VoyageurPlus() {
  const [travelerOffers, setTravelerOffers] = useKV<TravelerOffer[]>('traveler-offers', [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    arrivalDate: '',
    availableWeight: '',
    pricePerKg: '',
    flightNumber: '',
    additionalInfo: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.departureCity || !formData.arrivalCity || !formData.departureDate ||
        !formData.arrivalDate || !formData.availableWeight || !formData.pricePerKg) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      setIsSubmitting(false)
      return
    }

    const newOffer: TravelerOffer = {
      id: `offer-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      departureCity: formData.departureCity,
      arrivalCity: formData.arrivalCity,
      departureDate: formData.departureDate,
      arrivalDate: formData.arrivalDate,
      availableWeight: parseFloat(formData.availableWeight),
      pricePerKg: parseFloat(formData.pricePerKg),
      flightNumber: formData.flightNumber,
      additionalInfo: formData.additionalInfo,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }

    setTravelerOffers(current => [...(current || []), newOffer])

    toast.success('Votre offre a été soumise avec succès!', {
      description: 'Notre équipe va examiner votre offre et vous contactera bientôt.'
    })

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      departureCity: '',
      arrivalCity: '',
      departureDate: '',
      arrivalDate: '',
      availableWeight: '',
      pricePerKg: '',
      flightNumber: '',
      additionalInfo: ''
    })

    setIsSubmitting(false)
  }

  return (
    <section id="voyageur-plus" className="py-20 px-6 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_oklch(0.65_0.24_30)_0%,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_oklch(0.48_0.18_250)_0%,_transparent_50%)] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent-foreground px-5 py-2 rounded-full mb-6 border border-accent/30">
            <Airplane size={20} weight="fill" />
            <span className="text-sm font-semibold">Programme Voyageur Plus</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Monétisez Vos Kilos de Bagage
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vous voyagez prochainement ? Transformez vos kilos de bagage disponibles en revenus ! 
            Proposez votre espace bagages et aidez d'autres personnes à envoyer leurs colis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <CurrencyDollar size={28} weight="bold" className="text-white" />
                </div>
                <CardTitle className="text-2xl">Comment Ça Marche ?</CardTitle>
                <CardDescription className="text-base">
                  Devenez voyageur-transporteur en 3 étapes simples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Inscrivez Votre Voyage</h4>
                    <p className="text-sm text-muted-foreground">
                      Remplissez le formulaire avec vos dates et itinéraire de voyage. Indiquez les kilos disponibles dans vos bagages.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Fixez Votre Prix</h4>
                    <p className="text-sm text-muted-foreground">
                      Choisissez votre tarif au kilogramme. Notre plateforme vous met en relation avec des expéditeurs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Gagnez de l'Argent</h4>
                    <p className="text-sm text-muted-foreground">
                      Transportez les colis et recevez votre paiement de manière sécurisée via notre plateforme.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4">
                  <CheckCircle size={28} weight="bold" className="text-white" />
                </div>
                <CardTitle className="text-xl">Avantages Voyageur Plus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Revenus supplémentaires :</span> Rentabilisez vos voyages
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Flexibilité totale :</span> Vous fixez vos conditions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Sécurité garantie :</span> Transactions sécurisées et assurées
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Support 24/7 :</span> Notre équipe vous accompagne
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 rounded-2xl border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Package size={24} weight="bold" className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Note Importante</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tous les colis sont inspectés et conformes aux réglementations aériennes. 
                    Vous ne transportez que des articles légaux et déclarés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-2 border-border bg-card shadow-2xl sticky top-24">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Suitcase size={28} weight="bold" className="text-white" />
              </div>
              <CardTitle className="text-2xl">Proposez Vos Kilos</CardTitle>
              <CardDescription className="text-base">
                Remplissez le formulaire pour soumettre votre offre de voyage
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2 text-sm font-semibold">
                      <User size={16} weight="bold" />
                      Prénom *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Jean"
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-2 text-sm font-semibold">
                      <User size={16} weight="bold" />
                      Nom *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Dupont"
                      required
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold">
                    <EnvelopeSimple size={16} weight="bold" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jean.dupont@example.com"
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold">
                    <Phone size={16} weight="bold" />
                    Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+221 77 123 45 67"
                    required
                    className="border-2"
                  />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureCity" className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin size={16} weight="fill" className="text-primary" />
                      Ville de Départ *
                    </Label>
                    <Input
                      id="departureCity"
                      name="departureCity"
                      value={formData.departureCity}
                      onChange={handleInputChange}
                      placeholder="Paris"
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalCity" className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin size={16} weight="fill" className="text-secondary" />
                      Ville d'Arrivée *
                    </Label>
                    <Input
                      id="arrivalCity"
                      name="arrivalCity"
                      value={formData.arrivalCity}
                      onChange={handleInputChange}
                      placeholder="Dakar"
                      required
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate" className="flex items-center gap-2 text-sm font-semibold">
                      <Calendar size={16} weight="bold" />
                      Date de Départ *
                    </Label>
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalDate" className="flex items-center gap-2 text-sm font-semibold">
                      <Calendar size={16} weight="bold" />
                      Date d'Arrivée *
                    </Label>
                    <Input
                      id="arrivalDate"
                      name="arrivalDate"
                      type="date"
                      value={formData.arrivalDate}
                      onChange={handleInputChange}
                      required
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flightNumber" className="flex items-center gap-2 text-sm font-semibold">
                    <Airplane size={16} weight="bold" />
                    Numéro de Vol (optionnel)
                  </Label>
                  <Input
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleInputChange}
                    placeholder="AF 718"
                    className="border-2"
                  />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="availableWeight" className="flex items-center gap-2 text-sm font-semibold">
                      <Suitcase size={16} weight="bold" />
                      Kilos Disponibles *
                    </Label>
                    <Input
                      id="availableWeight"
                      name="availableWeight"
                      type="number"
                      min="1"
                      step="0.5"
                      value={formData.availableWeight}
                      onChange={handleInputChange}
                      placeholder="20"
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerKg" className="flex items-center gap-2 text-sm font-semibold">
                      <CurrencyDollar size={16} weight="bold" />
                      Prix par Kg (€) *
                    </Label>
                    <Input
                      id="pricePerKg"
                      name="pricePerKg"
                      type="number"
                      min="1"
                      step="0.5"
                      value={formData.pricePerKg}
                      onChange={handleInputChange}
                      placeholder="8.00"
                      required
                      className="border-2"
                    />
                  </div>
                </div>

                {formData.availableWeight && formData.pricePerKg && (
                  <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-4 rounded-xl border border-accent/20">
                    <p className="text-sm text-muted-foreground mb-1">Revenu Potentiel Maximum</p>
                    <p className="text-2xl font-bold text-foreground">
                      {(parseFloat(formData.availableWeight) * parseFloat(formData.pricePerKg)).toFixed(2)} €
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-sm font-semibold">
                    Informations Complémentaires
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Restrictions particulières, horaires préférés, etc."
                    rows={3}
                    className="border-2 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      Soumettre Mon Offre
                      <ArrowRight size={20} weight="bold" className="ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  En soumettant ce formulaire, vous acceptez nos conditions d'utilisation 
                  et notre politique de confidentialité.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
