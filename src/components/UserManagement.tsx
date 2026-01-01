import { useMemo, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { User, UserRole } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  CheckCircle, 
  XCircle, 
  UserCircle, 
  Truck, 
  Star, 
  Phone, 
  Envelope, 
  PencilSimple,
  Trash,
  ShieldCheck,
  UserSwitch,
  Lock,
  LockOpen
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface UserManagementProps {
  searchQuery: string
}

export function UserManagement({ searchQuery }: UserManagementProps) {
  const [users, setUsers] = useKV<User[]>('users', [])
  const [roleFilter, setRoleFilter] = useState<'all' | 'sender' | 'transporter' | 'admin'>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'rating' | 'transactions'>('created')
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    verified: false,
  })
  
  const [newRole, setNewRole] = useState<UserRole>('sender')

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users || []

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

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      verified: user.verified,
    })
    setIsEditDialogOpen(true)
  }

  const openRoleDialog = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setIsRoleDialogOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const handleUpdateUser = () => {
    if (!selectedUser) return

    setUsers((currentUsers) => 
      (currentUsers || []).map(user =>
        user.id === selectedUser.id
          ? { ...user, ...editForm }
          : user
      )
    )

    toast.success('Utilisateur mis à jour', {
      description: `Les informations de ${editForm.name} ont été modifiées.`
    })
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleChangeRole = () => {
    if (!selectedUser) return

    setUsers((currentUsers) =>
      (currentUsers || []).map(user =>
        user.id === selectedUser.id
          ? { ...user, role: newRole }
          : user
      )
    )

    toast.success('Rôle modifié', {
      description: `${selectedUser.name} est maintenant ${
        newRole === 'admin' ? 'Administrateur' : 
        newRole === 'sender' ? 'Expéditeur' : 'Transporteur'
      }.`
    })
    setIsRoleDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    setUsers((currentUsers) =>
      (currentUsers || []).filter(user => user.id !== selectedUser.id)
    )

    toast.success('Utilisateur supprimé', {
      description: `${selectedUser.name} a été supprimé du système.`
    })
    setIsDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const toggleVerification = (user: User) => {
    setUsers((currentUsers) =>
      (currentUsers || []).map(u =>
        u.id === user.id
          ? { ...u, verified: !u.verified }
          : u
      )
    )

    toast.success(
      user.verified ? 'Vérification retirée' : 'Utilisateur vérifié',
      {
        description: user.verified 
          ? `${user.name} n'est plus vérifié.`
          : `${user.name} est maintenant vérifié.`
      }
    )
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="text-purple-600" size={24} weight="fill" />
      case 'transporter':
        return <Truck className="text-primary" size={24} />
      case 'sender':
      default:
        return <UserCircle className="text-primary" size={24} />
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrateur'
      case 'transporter':
        return 'Transporteur'
      case 'sender':
      default:
        return 'Expéditeur'
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'transporter':
        return 'default'
      case 'sender':
      default:
        return 'secondary'
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserSwitch size={24} />
                Gestion des Utilisateurs
              </CardTitle>
              <CardDescription>
                Gérer les rôles, les permissions et les informations des utilisateurs
              </CardDescription>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="sender">Expéditeurs</SelectItem>
                <SelectItem value="transporter">Transporteurs</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={verifiedFilter} onValueChange={(v) => setVerifiedFilter(v as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par vérification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="verified">Vérifiés uniquement</SelectItem>
                <SelectItem value="unverified">Non vérifiés</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Date d'inscription</SelectItem>
                <SelectItem value="name">Nom alphabétique</SelectItem>
                <SelectItem value="rating">Note (meilleur)</SelectItem>
                <SelectItem value="transactions">Transactions</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto">
              <Badge variant="outline" className="text-base px-4 py-1.5">
                {filteredAndSortedUsers.length} utilisateur{filteredAndSortedUsers.length > 1 ? 's' : ''}
              </Badge>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      <UserCircle size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">Aucun utilisateur trouvé</p>
                      <p className="text-sm">Essayez de modifier vos filtres de recherche</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedUsers.map(user => (
                    <TableRow key={user.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {getRoleIcon(user.role)}
                          </div>
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
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {getRoleLabel(user.role)}
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleVerification(user)}
                          className="gap-1.5"
                        >
                          {user.verified ? (
                            <>
                              <CheckCircle size={18} className="text-green-600" weight="fill" />
                              <span className="text-sm font-medium text-green-600">Vérifié</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={18} className="text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Non vérifié</span>
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openRoleDialog(user)}
                            title="Changer le rôle"
                          >
                            <UserSwitch size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                            title="Modifier l'utilisateur"
                          >
                            <PencilSimple size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(user)}
                            title="Supprimer l'utilisateur"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash size={18} />
                          </Button>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PencilSimple size={24} />
              Modifier l'utilisateur
            </DialogTitle>
            <DialogDescription>
              Modifiez les informations de {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nom complet</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Nom de l'utilisateur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Téléphone</Label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="+221 XX XXX XX XX"
              />
            </div>

            <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                {editForm.verified ? (
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                ) : (
                  <XCircle size={20} className="text-muted-foreground" />
                )}
                <Label htmlFor="edit-verified" className="cursor-pointer">
                  Compte vérifié
                </Label>
              </div>
              <Switch
                id="edit-verified"
                checked={editForm.verified}
                onCheckedChange={(checked) => setEditForm({ ...editForm, verified: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateUser}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserSwitch size={24} />
              Modifier le rôle
            </DialogTitle>
            <DialogDescription>
              Changez le rôle de {selectedUser?.name} dans le système
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm font-medium">Rôle actuel</p>
              <Badge variant={selectedUser ? getRoleBadgeVariant(selectedUser.role) : 'secondary'} className="text-base">
                {selectedUser && getRoleLabel(selectedUser.role)}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-role">Nouveau rôle</Label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as UserRole)}>
                <SelectTrigger id="new-role">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sender">
                    <div className="flex items-center gap-2">
                      <UserCircle size={18} />
                      <span>Expéditeur</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="transporter">
                    <div className="flex items-center gap-2">
                      <Truck size={18} />
                      <span>Transporteur</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} />
                      <span>Administrateur</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Attention :</strong> Changer le rôle d'un utilisateur affectera ses permissions et l'accès aux fonctionnalités de la plateforme.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleChangeRole}>
              Modifier le rôle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash size={24} />
              Supprimer l'utilisateur
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-2">
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
              <Badge variant={selectedUser ? getRoleBadgeVariant(selectedUser.role) : 'secondary'}>
                {selectedUser && getRoleLabel(selectedUser.role)}
              </Badge>
            </div>

            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Cette action est irréversible
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Toutes les données associées à cet utilisateur seront conservées mais l'utilisateur ne pourra plus se connecter.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
