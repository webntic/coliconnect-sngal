import { useMemo, useState } from 'react'
import { Route, User } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MapPin, Calendar, Truck, CurrencyDollar, CheckCircle, XCircle, Star, Scales } from '@phosphor-icons/react'

interface AdminRoutesTableProps {
  routes: Route[]
  users: User[]
  searchQuery: string
}

export function AdminRoutesTable({ routes, users, searchQuery }: AdminRoutesTableProps) {
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all')
  const [sortBy, setSortBy] = useState<'created' | 'departure' | 'price' | 'rating'>('created')

  const filteredAndSortedRoutes = useMemo(() => {
    let filtered = routes

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(route =>
        route.origin.toLowerCase().includes(query) ||
        route.destination.toLowerCase().includes(query) ||
        route.transporterName.toLowerCase().includes(query) ||
        route.vehicleType.toLowerCase().includes(query) ||
        route.id.includes(query)
      )
    }

    if (verifiedFilter === 'verified') {
      filtered = filtered.filter(route => route.verified)
    } else if (verifiedFilter === 'unverified') {
      filtered = filtered.filter(route => !route.verified)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'departure':
          return new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime()
        case 'price':
          return b.pricePerKg - a.pricePerKg
        case 'rating':
          return b.transporterRating - a.transporterRating
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [routes, searchQuery, verifiedFilter, sortBy])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin size={24} />
              Gestion des Itinéraires
            </CardTitle>
            <CardDescription>
              {filteredAndSortedRoutes.length} itinéraire{filteredAndSortedRoutes.length > 1 ? 's' : ''} affiché{filteredAndSortedRoutes.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={verifiedFilter} onValueChange={(v) => setVerifiedFilter(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Vérification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="verified">Vérifiés</SelectItem>
                <SelectItem value="unverified">Non vérifiés</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Date de création</SelectItem>
                <SelectItem value="departure">Date de départ</SelectItem>
                <SelectItem value="price">Prix/kg</SelectItem>
                <SelectItem value="rating">Note transporteur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transporteur</TableHead>
                <TableHead>Itinéraire</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Prix/kg</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedRoutes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucun itinéraire trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedRoutes.map(route => (
                  <TableRow key={route.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Truck className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{route.transporterName}</p>
                          <p className="text-xs text-muted-foreground">ID: {route.transporterId.slice(0, 8)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1.5">
                        <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">{route.origin}</p>
                          <p className="text-muted-foreground">→ {route.destination}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {new Date(route.departureDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">→</span>
                          <span className="text-muted-foreground">
                            {new Date(route.arrivalDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {route.vehicleType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Scales size={14} className="text-muted-foreground" />
                        <span>{route.availableCapacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CurrencyDollar size={16} className="text-muted-foreground" />
                        <span className="font-semibold">{route.pricePerKg}</span>
                        <span className="text-xs text-muted-foreground">FCFA</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500" weight="fill" />
                        <span className="font-medium">{route.transporterRating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {route.verified ? (
                        <div className="flex items-center gap-1.5 text-green-600">
                          <CheckCircle size={18} weight="fill" />
                          <span className="text-sm font-medium">Vérifié</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <XCircle size={18} />
                          <span className="text-sm">Non vérifié</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
