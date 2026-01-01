import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Airplane, 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  Calendar,
  Suitcase,
  CurrencyDollar,
  User,
  Phone,
  EnvelopeSimple
} from '@phosphor-icons/react'
import { toast } from 'sonner'

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

export function AdminTravelersMonitor() {
  const [travelerOffers, setTravelerOffers] = useKV<TravelerOffer[]>('traveler-offers', [])

  const handleApprove = (offerId: string) => {
    setTravelerOffers((current) =>
      (current || []).map((offer) =>
        offer.id === offerId ? { ...offer, status: 'approved' as const } : offer
      )
    )
    toast.success('Offre approuvée avec succès')
  }

  const handleReject = (offerId: string) => {
    setTravelerOffers((current) =>
      (current || []).map((offer) =>
        offer.id === offerId ? { ...offer, status: 'rejected' as const } : offer
      )
    )
    toast.success('Offre rejetée')
  }

  const handleDelete = (offerId: string) => {
    setTravelerOffers((current) => (current || []).filter((offer) => offer.id !== offerId))
    toast.success('Offre supprimée')
  }

  const getStatusBadge = (status: TravelerOffer['status']) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle size={14} weight="fill" className="mr-1" />
            Approuvée
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle size={14} weight="fill" className="mr-1" />
            Rejetée
          </Badge>
        )
      default:
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Clock size={14} weight="fill" className="mr-1" />
            En attente
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const pendingOffers = (travelerOffers || []).filter(offer => offer.status === 'pending')
  const approvedOffers = (travelerOffers || []).filter(offer => offer.status === 'approved')
  const rejectedOffers = (travelerOffers || []).filter(offer => offer.status === 'rejected')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-amber-500/20 bg-gradient-to-br from-card to-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">En Attente</p>
                <p className="text-3xl font-bold text-foreground">{pendingOffers.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock size={24} weight="bold" className="text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-card to-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approuvées</p>
                <p className="text-3xl font-bold text-foreground">{approvedOffers.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle size={24} weight="bold" className="text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-500/20 bg-gradient-to-br from-card to-red-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejetées</p>
                <p className="text-3xl font-bold text-foreground">{rejectedOffers.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <XCircle size={24} weight="bold" className="text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Airplane size={20} weight="bold" className="text-white" />
            </div>
            <div>
              <CardTitle>Offres Voyageur Plus</CardTitle>
              <CardDescription>Gérer les offres de transport de bagages</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {(travelerOffers || []).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Airplane size={32} weight="bold" className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Aucune offre de voyageur pour le moment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voyageur</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Itinéraire</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Vol</TableHead>
                    <TableHead>Capacité</TableHead>
                    <TableHead>Prix/Kg</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(travelerOffers || []).map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <User size={16} weight="bold" className="text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {offer.firstName} {offer.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ID: {offer.id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Phone size={12} weight="bold" className="text-muted-foreground" />
                            <span className="text-muted-foreground">{offer.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <EnvelopeSimple size={12} weight="bold" className="text-muted-foreground" />
                            <span className="text-muted-foreground truncate max-w-[150px]">
                              {offer.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} weight="fill" className="text-primary" />
                            <span className="text-sm font-medium">{offer.departureCity}</span>
                          </div>
                          <span className="text-muted-foreground">→</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} weight="fill" className="text-secondary" />
                            <span className="text-sm font-medium">{offer.arrivalCity}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Calendar size={12} weight="bold" className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Départ: {formatDate(offer.departureDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Calendar size={12} weight="bold" className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Arrivée: {formatDate(offer.arrivalDate)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {offer.flightNumber ? (
                          <Badge variant="outline" className="font-mono text-xs">
                            {offer.flightNumber}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Non renseigné</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Suitcase size={14} weight="bold" className="text-primary" />
                          <span className="font-semibold">{offer.availableWeight} kg</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CurrencyDollar size={14} weight="bold" className="text-accent" />
                          <span className="font-semibold">{offer.pricePerKg} €</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(offer.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {offer.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApprove(offer.id)}
                                className="h-8 text-green-600 hover:text-green-700 hover:bg-green-500/10"
                              >
                                <CheckCircle size={16} weight="bold" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleReject(offer.id)}
                                className="h-8 text-red-600 hover:text-red-700 hover:bg-red-500/10"
                              >
                                <XCircle size={16} weight="bold" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(offer.id)}
                            className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
