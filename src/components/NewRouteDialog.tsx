import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Route } from '@/lib/types'

interface NewRouteDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (route: Omit<Route, 'id' | 'transporterId' | 'transporterName' | 'transporterRating' | 'verified' | 'createdAt'>) => void
}

export function NewRouteDialog({ open, onClose, onSubmit }: NewRouteDialogProps) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [vehicleType, setVehicleType] = useState('Car')
  const [availableCapacity, setAvailableCapacity] = useState('')
  const [pricePerKg, setPricePerKg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      origin,
      destination,
      departureDate,
      arrivalDate,
      vehicleType,
      availableCapacity,
      pricePerKg: parseFloat(pricePerKg)
    })

    setOrigin('')
    setDestination('')
    setDepartureDate('')
    setArrivalDate('')
    setVehicleType('Car')
    setAvailableCapacity('')
    setPricePerKg('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ajouter un Nouvel Itinéraire</DialogTitle>
          <DialogDescription>
            Partagez vos plans de voyage et connectez-vous avec des expéditeurs de colis
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="origin">Origine</Label>
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
              <Label htmlFor="departureDate">Date de Départ</Label>
              <Input
                id="departureDate"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalDate">Date d'Arrivée Estimée</Label>
              <Input
                id="arrivalDate"
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Type de Véhicule</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger id="vehicleType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Car">Voiture</SelectItem>
                  <SelectItem value="Van">Camionnette</SelectItem>
                  <SelectItem value="Truck">Camion</SelectItem>
                  <SelectItem value="Flight">Avion</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                  <SelectItem value="Ship">Bateau</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableCapacity">Capacité Disponible</Label>
              <Input
                id="availableCapacity"
                placeholder="Jusqu'à 20kg"
                value={availableCapacity}
                onChange={(e) => setAvailableCapacity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pricePerKg">Prix par Kg (FCFA)</Label>
              <Input
                id="pricePerKg"
                type="number"
                step="100"
                placeholder="3000"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Définissez un tarif compétitif pour attirer plus d'expéditeurs. Pour les envois GP (Gros Poids &gt;50kg), ce prix au kg sera appliqué.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 font-semibold bg-accent hover:bg-accent/90">
              Ajouter l'Itinéraire
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
