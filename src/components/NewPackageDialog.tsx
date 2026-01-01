import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Package as PackageType, PackageSize } from '@/lib/types'

interface NewPackageDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (pkg: Omit<PackageType, 'id' | 'senderId' | 'senderName' | 'status' | 'createdAt'>) => void
}

export function NewPackageDialog({ open, onClose, onSubmit }: NewPackageDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [size, setSize] = useState<PackageSize>('medium')
  const [weight, setWeight] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [deliveryDeadline, setDeliveryDeadline] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      size,
      weight: parseFloat(weight),
      origin,
      destination,
      pickupDate,
      deliveryDeadline,
      price: parseFloat(price)
    })

    setTitle('')
    setDescription('')
    setSize('medium')
    setWeight('')
    setOrigin('')
    setDestination('')
    setPickupDate('')
    setDeliveryDeadline('')
    setPrice('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Créer une Nouvelle Demande d'Envoi</DialogTitle>
          <DialogDescription>
            Fournissez les détails de votre colis et nous vous mettrons en relation avec des transporteurs
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Titre du Colis</Label>
              <Input
                id="title"
                placeholder="Électronique, Documents, Vêtements, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez le contenu de votre colis et les instructions de manipulation spéciales..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Taille du Colis</Label>
              <Select value={size} onValueChange={(v) => setSize(v as PackageSize)}>
                <SelectTrigger id="size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Petit (&lt;5kg)</SelectItem>
                  <SelectItem value="medium">Moyen (5-15kg)</SelectItem>
                  <SelectItem value="large">Grand (15-30kg)</SelectItem>
                  <SelectItem value="xlarge">Très Grand (30-50kg)</SelectItem>
                  <SelectItem value="gp">GP - Gros Poids (&gt;50kg)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Poids (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="10.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Lieu d'Enlèvement</Label>
              <Input
                id="origin"
                placeholder="Dakar, Sénégal"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate">Date d'Enlèvement</Label>
              <Input
                id="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDeadline">Date Limite de Livraison</Label>
              <Input
                id="deliveryDeadline"
                type="date"
                value={deliveryDeadline}
                onChange={(e) => setDeliveryDeadline(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="price">Prix Proposé (FCFA)</Label>
              <Input
                id="price"
                type="number"
                step="100"
                placeholder="50000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Frais de plateforme (10%) ajoutés lors du paiement
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 font-semibold bg-accent hover:bg-accent/90">
              Créer la Demande
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
