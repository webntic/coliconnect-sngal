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
          <DialogTitle className="text-2xl">Add New Route</DialogTitle>
          <DialogDescription>
            Share your travel plans and get matched with package senders
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                placeholder="Dakar, Senegal"
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
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalDate">Estimated Arrival Date</Label>
              <Input
                id="arrivalDate"
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger id="vehicleType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="Flight">Flight</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableCapacity">Available Capacity</Label>
              <Input
                id="availableCapacity"
                placeholder="Up to 20kg"
                value={availableCapacity}
                onChange={(e) => setAvailableCapacity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pricePerKg">Price per Kg (USD)</Label>
              <Input
                id="pricePerKg"
                type="number"
                step="0.01"
                placeholder="5.00"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Set competitive pricing to attract more senders
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 font-semibold">
              Add Route
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
