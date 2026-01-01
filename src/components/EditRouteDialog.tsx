import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Route } from '@/lib/types'

interface EditRouteDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (route: Route) => void
  route: Route | null
}

export function EditRouteDialog({ open, onClose, onSubmit, route }: EditRouteDialogProps) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [vehicleType, setVehicleType] = useState('Car')
  const [availableCapacity, setAvailableCapacity] = useState('')
  const [pricePerKg, setPricePerKg] = useState('')

  useEffect(() => {
    if (route) {
      setOrigin(route.origin)
      setDestination(route.destination)
      setDepartureDate(route.departureDate.split('T')[0])
      setArrivalDate(route.arrivalDate.split('T')[0])
      setVehicleType(route.vehicleType)
      setAvailableCapacity(route.availableCapacity)
      setPricePerKg(route.pricePerKg.toString())
    }
  }, [route])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!route) return

    onSubmit({
      ...route,
      origin,
      destination,
      departureDate,
      arrivalDate,
      vehicleType,
      availableCapacity,
      pricePerKg: parseFloat(pricePerKg)
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Modifier l'Itinéraire</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de votre itinéraire
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-origin">Origine</Label>
              <Input
                id="edit-origin"
                placeholder="Dakar, Sénégal"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-destination">Destination</Label>
              <Input
                id="edit-destination"
                placeholder="Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-departureDate">Date de Départ</Label>
              <Input
                id="edit-departureDate"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-arrivalDate">Date d'Arrivée Estimée</Label>
              <Input
                id="edit-arrivalDate"
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-vehicleType">Type de Véhicule</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger id="edit-vehicleType">
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
              <Label htmlFor="edit-availableCapacity">Capacité Disponible</Label>
              <Input
                id="edit-availableCapacity"
                placeholder="Jusqu'à 20kg"
                value={availableCapacity}
                onChange={(e) => setAvailableCapacity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-pricePerKg">Prix par Kg (€)</Label>
              <Input
                id="edit-pricePerKg"
                type="number"
                step="0.5"
                placeholder="5"
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
              Enregistrer les Modifications
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
