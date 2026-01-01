import { useMemo, useState } from 'react'
import { Package as PackageType, User } from '@/lib/types'
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
import { Package as PackageIcon, MapPin, Calendar, Scales, CurrencyDollar, Clock, CheckCircle, TrendUp, XCircle } from '@phosphor-icons/react'

interface AdminPackagesTableProps {
  packages: PackageType[]
  users: User[]
  searchQuery: string
}

export function AdminPackagesTable({ packages, users, searchQuery }: AdminPackagesTableProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | PackageType['status']>('all')
  const [sizeFilter, setSizeFilter] = useState<'all' | PackageType['size']>('all')
  const [sortBy, setSortBy] = useState<'created' | 'price' | 'weight' | 'pickup'>('created')

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = packages

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query) ||
        pkg.origin.toLowerCase().includes(query) ||
        pkg.destination.toLowerCase().includes(query) ||
        pkg.senderName.toLowerCase().includes(query) ||
        pkg.id.includes(query)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(pkg => pkg.status === statusFilter)
    }

    if (sizeFilter !== 'all') {
      filtered = filtered.filter(pkg => pkg.size === sizeFilter)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'weight':
          return b.weight - a.weight
        case 'pickup':
          return new Date(b.pickupDate).getTime() - new Date(a.pickupDate).getTime()
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [packages, searchQuery, statusFilter, sizeFilter, sortBy])

  const getStatusIcon = (status: PackageType['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={18} weight="fill" className="text-green-600" />
      case 'in_transit':
        return <TrendUp size={18} className="text-blue-600" />
      case 'matched':
        return <CheckCircle size={18} className="text-purple-600" />
      case 'cancelled':
        return <XCircle size={18} className="text-red-600" />
      default:
        return <Clock size={18} className="text-orange-600" />
    }
  }

  const getStatusLabel = (status: PackageType['status']) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'matched': return 'Associé'
      case 'in_transit': return 'En transit'
      case 'delivered': return 'Livré'
      case 'cancelled': return 'Annulé'
    }
  }

  const getSizeLabel = (size: PackageType['size']) => {
    switch (size) {
      case 'small': return 'Petit'
      case 'medium': return 'Moyen'
      case 'large': return 'Grand'
      case 'xlarge': return 'Très grand'
      case 'gp': return 'GP (>50kg)'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PackageIcon size={24} />
              Gestion des Colis
            </CardTitle>
            <CardDescription>
              {filteredAndSortedPackages.length} colis affiché{filteredAndSortedPackages.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="matched">Associé</SelectItem>
                <SelectItem value="in_transit">En transit</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sizeFilter} onValueChange={(v) => setSizeFilter(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les tailles</SelectItem>
                <SelectItem value="small">Petit</SelectItem>
                <SelectItem value="medium">Moyen</SelectItem>
                <SelectItem value="large">Grand</SelectItem>
                <SelectItem value="xlarge">Très grand</SelectItem>
                <SelectItem value="gp">GP (&gt;50kg)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Date de création</SelectItem>
                <SelectItem value="price">Prix</SelectItem>
                <SelectItem value="weight">Poids</SelectItem>
                <SelectItem value="pickup">Date de collecte</SelectItem>
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
                <TableHead>Colis</TableHead>
                <TableHead>Expéditeur</TableHead>
                <TableHead>Itinéraire</TableHead>
                <TableHead>Détails</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date collecte</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun colis trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedPackages.map(pkg => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                          <PackageIcon className="text-orange-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{pkg.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{pkg.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{pkg.senderName}</p>
                        <p className="text-xs text-muted-foreground">ID: {pkg.senderId.slice(0, 8)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1.5">
                        <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">{pkg.origin}</p>
                          <p className="text-muted-foreground">→ {pkg.destination}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Scales size={14} className="text-muted-foreground" />
                          <span>{pkg.weight}kg</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getSizeLabel(pkg.size)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CurrencyDollar size={16} className="text-muted-foreground" />
                        <span className="font-semibold">{pkg.price.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">FCFA</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(pkg.status)}
                        <span className="text-sm font-medium">{getStatusLabel(pkg.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(pkg.pickupDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
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
