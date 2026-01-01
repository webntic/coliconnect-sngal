import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useKV } from '@github/spark/hooks'
import { Package, Route, User } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  Package as PackageIcon, 
  MapPin, 
  Calendar,
  Scales,
  CurrencyCircleDollar,
  CheckCircle
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  route: Route
  transporter: User
}

export function BookingDialog({ open, onOpenChange, route, transporter }: BookingDialogProps) {
  const { currentUser, isAuthenticated } = useAuth()
  const [packages, setPackages] = useKV<Package[]>('packages', [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    weight: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !currentUser) {
      toast.error('Veuillez vous connecter pour réserver')
      return
    }

    if (currentUser.role !== 'sender') {
      toast.error('Seuls les clients peuvent effectuer des réservations')
      return
    }

    if (!formData.title || !formData.description || !formData.weight) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    const weight = parseFloat(formData.weight)
    if (isNaN(weight) || weight <= 0) {
      toast.error('Veuillez entrer un poids valide')
      return
    }

    setIsSubmitting(true)

    try {
      const totalPrice = weight * route.pricePerKg

      const newPackage: Package = {
        id: `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        title: formData.title,
        description: formData.description,
        size: 'gp',
        weight: weight,
        origin: route.origin,
        destination: route.destination,
        pickupDate: route.departureDate,
        deliveryDeadline: route.arrivalDate,
        price: totalPrice,
        status: 'matched',
        transporterId: route.transporterId,
        createdAt: new Date().toISOString(),
      }

      setPackages((currentPackages) => [...(currentPackages || []), newPackage])

      toast.success('Réservation effectuée avec succès!', {
        description: `Votre colis de ${weight}kg a été réservé pour ${totalPrice.toFixed(2)}€`
      })

      setFormData({ title: '', description: '', weight: '' })
      onOpenChange(false)
    } catch (error) {
      console.error('Erreur lors de la réservation:', error)
      toast.error('Une erreur est survenue lors de la réservation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculatePrice = () => {
    const weight = parseFloat(formData.weight)
    if (isNaN(weight) || weight <= 0) return 0
    return weight * route.pricePerKg
  }

  const estimatedPrice = calculatePrice()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <PackageIcon size={28} className="text-primary" />
            Réserver ce trajet
          </DialogTitle>
          <DialogDescription>
            Complétez les informations de votre colis pour réserver avec {transporter.name}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <div>
                <span className="font-semibold">{route.origin}</span>
                <span className="text-muted-foreground"> → </span>
                <span className="font-semibold">{route.destination}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-secondary" />
              <span className="text-muted-foreground">
                {format(new Date(route.departureDate), 'd MMM yyyy', { locale: fr })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CurrencyCircleDollar size={18} className="text-accent" />
              <span className="font-semibold text-primary">
                {route.pricePerKg}€/kg
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={18} weight="fill" className="text-green-600" />
              <span className="text-xs text-muted-foreground">
                Transporteur vérifié
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du colis *</Label>
            <Input
              id="title"
              placeholder="Ex: Documents importants, Vêtements, etc."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du contenu *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez le contenu de votre colis en détail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Scales size={18} />
              Poids (kg) *
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="0.1"
              placeholder="Ex: 5.5"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              required
            />
          </div>

          {estimatedPrice > 0 && (
            <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Prix estimé:</span>
                <span className="text-2xl font-bold text-accent">
                  {estimatedPrice.toFixed(2)}€
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {formData.weight}kg × {route.pricePerKg}€/kg
              </p>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Réservation...' : 'Confirmer la réservation'}
            </Button>
          </DialogFooter>
        </form>

        {!isAuthenticated && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              Vous devez être connecté en tant que client pour effectuer une réservation.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
