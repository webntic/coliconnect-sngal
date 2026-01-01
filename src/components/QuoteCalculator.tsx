import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Calculator, Package, MapPin, Ruler, Scales, Calendar, ArrowRight, CheckCircle, Info, FloppyDisk, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

type ServiceType = 'maritime' | 'aerien' | 'express' | 'regional'

interface QuoteResult {
  basePrice: number
  insurance: number
  customs: number
  handling: number
  total: number
  deliveryTime: string
  serviceType: ServiceType
  weight: string
  destination: string
  timestamp: number
}

const servicePrices = {
  maritime: { base: 5000, perKg: 800, label: 'Fret Maritime', deliveryTime: '15-30 jours' },
  aerien: { base: 15000, perKg: 2500, label: 'Fret Aérien', deliveryTime: '2-5 jours' },
  express: { base: 25000, perKg: 4000, label: 'Express DHL', deliveryTime: '24-48h' },
  regional: { base: 8000, perKg: 1200, label: 'Sous-Région', deliveryTime: '3-7 jours' },
}

const destinations = [
  { value: 'france', label: 'France', multiplier: 1.0 },
  { value: 'senegal', label: 'Sénégal', multiplier: 1.0 },
  { value: 'mali', label: 'Mali', multiplier: 0.8 },
  { value: 'guinee', label: 'Guinée', multiplier: 0.7 },
  { value: 'gambie', label: 'Gambie', multiplier: 0.6 },
  { value: 'autre-europe', label: 'Autre Europe', multiplier: 1.2 },
  { value: 'autre-afrique', label: 'Autre Afrique', multiplier: 0.9 },
]

export function QuoteCalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>('maritime')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [destination, setDestination] = useState('france')
  const [needsInsurance, setNeedsInsurance] = useState(true)
  const [declaredValue, setDeclaredValue] = useState('')
  const [quote, setQuote] = useState<QuoteResult | null>(null)
  const [savedQuotes, setSavedQuotes] = useKV<QuoteResult[]>('mbs-saved-quotes', [])

  const calculateQuote = () => {
    const weightNum = parseFloat(weight)
    const destMultiplier = destinations.find(d => d.value === destination)?.multiplier || 1.0
    
    if (!weightNum || weightNum <= 0) {
      toast.error('Veuillez entrer un poids valide')
      return
    }

    const service = servicePrices[serviceType]
    const basePrice = (service.base + (service.perKg * weightNum)) * destMultiplier

    const lengthNum = parseFloat(length) || 0
    const widthNum = parseFloat(width) || 0
    const heightNum = parseFloat(height) || 0
    const volumetricWeight = (lengthNum * widthNum * heightNum) / 5000
    const chargeableWeight = Math.max(weightNum, volumetricWeight)
    
    const finalBasePrice = service.base + (service.perKg * chargeableWeight * destMultiplier)

    const declaredValueNum = parseFloat(declaredValue) || 0
    const insurance = needsInsurance ? Math.max(2000, declaredValueNum * 0.02) : 0

    const customs = serviceType === 'express' ? 0 : finalBasePrice * 0.05

    const handling = weightNum > 30 ? 3000 : weightNum > 10 ? 1500 : 500

    const total = finalBasePrice + insurance + customs + handling

    const newQuote: QuoteResult = {
      basePrice: Math.round(finalBasePrice),
      insurance: Math.round(insurance),
      customs: Math.round(customs),
      handling: Math.round(handling),
      total: Math.round(total),
      deliveryTime: service.deliveryTime,
      serviceType,
      weight,
      destination: destinations.find(d => d.value === destination)?.label || destination,
      timestamp: Date.now(),
    }

    setQuote(newQuote)

    toast.success('Devis calculé avec succès!')
  }

  const saveQuote = () => {
    if (quote) {
      setSavedQuotes((currentQuotes) => {
        const quotes = currentQuotes || []
        return [quote, ...quotes].slice(0, 5)
      })
      toast.success('Devis sauvegardé! Vous pouvez le retrouver dans votre historique.')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section id="devis" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
            <Calculator size={20} weight="duotone" />
            Calculateur de Devis
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Calculez Votre Tarif en Ligne
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Obtenez instantanément une estimation précise du coût de votre envoi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Package size={28} className="text-primary" weight="duotone" />
                Détails de votre Envoi
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service-type" className="text-base font-semibold">
                    Type de Service
                  </Label>
                  <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
                    <SelectTrigger id="service-type" className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maritime">🚢 Fret Maritime (Économique)</SelectItem>
                      <SelectItem value="aerien">✈️ Fret Aérien (Rapide)</SelectItem>
                      <SelectItem value="express">⚡ Express DHL (Ultra Rapide)</SelectItem>
                      <SelectItem value="regional">🌍 Transport Sous-Région</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-base font-semibold flex items-center gap-2">
                    <MapPin size={18} weight="duotone" />
                    Destination
                  </Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger id="destination" className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base font-semibold flex items-center gap-2">
                    <Scales size={18} weight="duotone" />
                    Poids (kg) *
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 25"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="h-12"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-sm text-muted-foreground">Le poids de votre colis en kilogrammes</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Ruler size={18} weight="duotone" />
                    Dimensions (cm) - Optionnel
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Input
                        type="number"
                        placeholder="L"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="h-12"
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Longueur</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="l"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="h-12"
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Largeur</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="H"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="h-12"
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Hauteur</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-accent/5 rounded-lg border border-accent/20">
                    <Info size={16} className="text-accent mt-0.5 flex-shrink-0" weight="duotone" />
                    <p className="text-xs text-muted-foreground">
                      Les dimensions permettent de calculer le poids volumétrique. Le poids facturable sera le plus élevé entre le poids réel et le poids volumétrique.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="insurance"
                      checked={needsInsurance}
                      onChange={(e) => setNeedsInsurance(e.target.checked)}
                      className="w-5 h-5 rounded border-input text-primary focus:ring-2 focus:ring-primary"
                    />
                    <Label htmlFor="insurance" className="text-base font-semibold cursor-pointer">
                      Ajouter une Assurance
                    </Label>
                  </div>

                  {needsInsurance && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="declared-value" className="text-sm">
                        Valeur Déclarée (FCFA)
                      </Label>
                      <Input
                        id="declared-value"
                        type="number"
                        placeholder="Ex: 500000"
                        value={declaredValue}
                        onChange={(e) => setDeclaredValue(e.target.value)}
                        className="h-12"
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground">
                        L'assurance couvre 2% de la valeur déclarée (minimum 2000 FCFA)
                      </p>
                    </motion.div>
                  )}
                </div>

                <Button
                  onClick={calculateQuote}
                  size="lg"
                  className="w-full h-14 text-lg font-semibold"
                >
                  <Calculator size={24} weight="duotone" className="mr-2" />
                  Calculer le Devis
                  <ArrowRight size={20} weight="bold" className="ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {quote ? (
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Votre Devis</h3>
                  <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1">
                    {servicePrices[quote.serviceType].label}
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={20} weight="duotone" />
                    <span className="font-medium">Délai de livraison:</span>
                    <span className="font-semibold text-foreground">{quote.deliveryTime}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tarif de Base</span>
                    <span className="font-semibold">{formatCurrency(quote.basePrice)}</span>
                  </div>

                  {quote.insurance > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Assurance</span>
                      <span className="font-semibold">{formatCurrency(quote.insurance)}</span>
                    </div>
                  )}

                  {quote.customs > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Frais de Douane (5%)</span>
                      <span className="font-semibold">{formatCurrency(quote.customs)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Manutention</span>
                    <span className="font-semibold">{formatCurrency(quote.handling)}</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center text-xl">
                    <span className="font-bold text-foreground">Total Estimé</span>
                    <span className="font-bold text-primary text-2xl">{formatCurrency(quote.total)}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={24} className="text-accent flex-shrink-0 mt-0.5" weight="duotone" />
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">Ce devis inclut:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Prise en charge et livraison</li>
                        <li>• Suivi en temps réel</li>
                        <li>• Support client 24/7</li>
                        <li>• Emballage de sécurité</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() => {
                      const element = document.getElementById('contact')
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                      toast.success('Descendez pour nous contacter et confirmer votre envoi')
                    }}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-accent hover:bg-accent/90"
                  >
                    Confirmer et Réserver
                    <ArrowRight size={20} weight="bold" className="ml-2" />
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={saveQuote}
                      variant="outline"
                      size="lg"
                      className="h-14 text-base font-semibold"
                    >
                      <FloppyDisk size={20} weight="duotone" className="mr-2" />
                      Sauvegarder
                    </Button>

                    <Button
                      onClick={() => setQuote(null)}
                      variant="outline"
                      size="lg"
                      className="h-14 text-base font-semibold"
                    >
                      Nouveau Calcul
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  * Ce devis est une estimation. Le tarif final peut varier selon la nature exacte du colis et les conditions douanières.
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&h=600&fit=crop&q=80" 
                    alt="Fast shipping"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h4 className="text-2xl font-bold mb-2">Livraison Rapide et Sûre</h4>
                      <p className="text-white/90">Partout dans le monde</p>
                    </div>
                  </div>
                </div>

                <Card className="p-8 h-full flex flex-col items-center justify-center text-center bg-muted/30">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Calculator size={48} className="text-primary" weight="duotone" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Prêt à calculer ?
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Remplissez les informations de votre envoi sur la gauche pour obtenir instantanément votre devis personnalisé
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="p-4 bg-background rounded-lg border">
                      <div className="text-2xl font-bold text-primary mb-1">≈30s</div>
                      <div className="text-sm text-muted-foreground">Calcul instantané</div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border">
                      <div className="text-2xl font-bold text-primary mb-1">100%</div>
                      <div className="text-sm text-muted-foreground">Transparent</div>
                  </div>
                </div>
              </Card>
            </div>
            )}
          </motion.div>
        </div>

        {savedQuotes && savedQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock size={28} className="text-primary" weight="duotone" />
                Devis Récents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedQuotes.map((savedQuote, index) => (
                  <Card
                    key={savedQuote.timestamp}
                    className="p-4 hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary/30"
                    onClick={() => setQuote(savedQuote)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="text-xs">
                        {servicePrices[savedQuote.serviceType].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(savedQuote.timestamp).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Destination:</span>
                        <span className="text-sm font-semibold">{savedQuote.destination}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Poids:</span>
                        <span className="text-sm font-semibold">{savedQuote.weight} kg</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-foreground">Total:</span>
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(savedQuote.total)}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Cliquez sur un devis pour l'afficher à nouveau
              </p>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info size={24} className="text-primary flex-shrink-0 mt-1" weight="duotone" />
                <div>
                  <h4 className="font-bold text-foreground mb-1">Besoin d'aide ?</h4>
                  <p className="text-sm text-muted-foreground">
                    Notre équipe est disponible pour vous accompagner dans votre devis et répondre à toutes vos questions
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
              >
                Nous Contacter
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
