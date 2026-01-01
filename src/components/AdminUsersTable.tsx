import { useMemo, useState } from 'react'
import { User } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CheckCircle, XCircle, MagnifyingGlass, Funnel, UserCircle, Truck, Star, Phone, Envelope } from '@phosphor-icons/react'

interface AdminUsersTableProps {
  users: User[]
  searchQuery: string
}

export function AdminUsersTable({ users, searchQuery }: AdminUsersTableProps) {
  const [roleFilter, setRoleFilter] = useState<'all' | 'sender' | 'transporter'>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'rating' | 'transactions'>('created')

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query) ||
        user.id.includes(query)
      )
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    if (verifiedFilter === 'verified') {
      filtered = filtered.filter(user => user.verified)
    } else if (verifiedFilter === 'unverified') {
      filtered = filtered.filter(user => !user.verified)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating
        case 'transactions':
          return b.totalTransactions - a.totalTransactions
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [users, searchQuery, roleFilter, verifiedFilter, sortBy])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCircle size={24} />
              Gestion des Utilisateurs
            </CardTitle>
            <CardDescription>
              {filteredAndSortedUsers.length} utilisateur{filteredAndSortedUsers.length > 1 ? 's' : ''} affiché{filteredAndSortedUsers.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="sender">Expéditeurs</SelectItem>
                <SelectItem value="transporter">Transporteurs</SelectItem>
              </SelectContent>
            </Select>

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
                <SelectItem value="created">Date d'inscription</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="transactions">Transactions</SelectItem>
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
                <TableHead>Utilisateur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Inscrit le</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.role === 'sender' ? (
                              <UserCircle size={24} />
                            ) : (
                              <Truck size={24} />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Envelope size={14} className="text-muted-foreground" />
                          <span className="text-xs">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={14} className="text-muted-foreground" />
                          <span className="text-xs">{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'sender' ? 'secondary' : 'default'}>
                        {user.role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500" weight="fill" />
                        <span className="font-medium">{user.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.totalTransactions}</span>
                    </TableCell>
                    <TableCell>
                      {user.verified ? (
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
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </span>
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
