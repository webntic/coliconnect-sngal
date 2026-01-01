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
          <DialogTitle className="text-2xl">Create New Package Request</DialogTitle>
          <DialogDescription>
            Provide details about your package and we'll match you with transporters
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Package Title</Label>
              <Input
                id="title"
                placeholder="Electronics, Documents, Clothing, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your package contents and any special handling requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Package Size</Label>
              <Select value={size} onValueChange={(v) => setSize(v as PackageSize)}>
                <SelectTrigger id="size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (&lt;5kg)</SelectItem>
                  <SelectItem value="medium">Medium (5-15kg)</SelectItem>
                  <SelectItem value="large">Large (15-30kg)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (&gt;30kg)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
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
              <Label htmlFor="origin">Pickup Location</Label>
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
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                id="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDeadline">Delivery Deadline</Label>
              <Input
                id="deliveryDeadline"
                type="date"
                value={deliveryDeadline}
                onChange={(e) => setDeliveryDeadline(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="price">Proposed Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="50.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Platform fee (15%) will be added at checkout
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 font-semibold">
              Create Package Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
