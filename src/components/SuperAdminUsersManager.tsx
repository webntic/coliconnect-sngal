import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, UserCredentials } from '@/lib/types'
import { Trash, Key, MagnifyingGlass, Download } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { registerUser } from '@/lib/auth'
import { ActivityLogEntry } from '@/components/SuperAdminActivityLog'

export function SuperAdminUsersManager() {
  const [users] = useKV<User[]>('users', [])
  const [credentials, setCredentials] = useKV<UserCredentials[]>('user-credentials', [])
  const [activityLog, setActivityLog] = useKV<ActivityLogEntry[]>('activity-log', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'sender' | 'transporter'>('all')
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all')

  const allUsers = (users || []).filter(u => u.role === 'sender' || u.role === 'transporter')

  const logActivity = (action: ActivityLogEntry['action'], actor: string, target?: string, details?: string) => {
    const newLog: ActivityLogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      action,
      actor,
      target,
      details
    }
    setActivityLog((current) => [...(current || []), newLog])
  }

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesVerified = filterVerified === 'all' || 
                           (filterVerified === 'verified' && user.verified) ||
                           (filterVerified === 'unverified' && !user.verified)
    return matchesSearch && matchesRole && matchesVerified
  })

  const handleDeleteUser = async (userId: string, email: string, name: string, role: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return
    }

    const allUsersData = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsersData.filter(u => u.id !== userId)
    await window.spark.kv.set('users', updatedUsers)

    setCredentials((current) => (current || []).filter(c => c.email !== email.toLowerCase()))

    logActivity('user_deleted', 'Super Admin', email, `${role === 'transporter' ? 'Transporteur' : 'Client'} ${name} supprimé`)

    toast.success('Utilisateur supprimé')
  }

  const handleResetPassword = async (userId: string, email: string, role: 'sender' | 'transporter', name: string) => {
    const newPassword = prompt('Nouveau mot de passe pour cet utilisateur :')
    
    if (!newPassword) return

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    await registerUser(email, newPassword, userId, role)
    
    logActivity('password_reset', 'Super Admin', email, `Mot de passe réinitialisé pour ${name}`)
    
    toast.success('Mot de passe réinitialisé avec succès')
  }

  const handleToggleVerification = async (user: User) => {
    const allUsersData = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsersData.map(u => 
      u.id === user.id ? { ...u, verified: !u.verified } : u
    )
    await window.spark.kv.set('users', updatedUsers)

    logActivity('user_created', 'Super Admin', user.email, `Statut de vérification changé pour ${user.name}`)

    toast.success(`Utilisateur ${!user.verified ? 'vérifié' : 'non vérifié'}`)
  }

  const handleExport = () => {
    const csvContent = [
      ['Nom', 'Email', 'Téléphone', 'Rôle', 'Note', 'Vérifié', 'Transactions', 'Date de création'],
      ...filteredUsers.map(u => [
        u.name,
        u.email,
        u.phone,
        u.role === 'transporter' ? 'Transporteur' : 'Client',
        u.rating.toString(),
        u.verified ? 'Oui' : 'Non',
        u.totalTransactions.toString(),
        new Date(u.createdAt).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `utilisateurs-${new Date().toISOString().split('T')[0]}.csv`
    link.click()

    toast.success('Liste des utilisateurs exportée')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Rechercher par nom, email ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="sender">Clients</SelectItem>
            <SelectItem value="transporter">Transporteurs</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterVerified} onValueChange={(value: any) => setFilterVerified(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="verified">Vérifiés</SelectItem>
            <SelectItem value="unverified">Non vérifiés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredUsers.length} utilisateur(s) {filteredUsers.length !== allUsers.length && `(${allUsers.length} au total)`}
        </p>
        <Button variant="outline" onClick={handleExport} className="gap-2">
          <Download size={18} />
          Exporter
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  {searchTerm || filterRole !== 'all' || filterVerified !== 'all' 
                    ? 'Aucun utilisateur ne correspond aux critères de recherche'
                    : 'Aucun utilisateur'}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'transporter' ? 'default' : 'secondary'}>
                      {user.role === 'transporter' ? 'Transporteur' : 'Client'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.rating.toFixed(1)} ⭐</TableCell>
                  <TableCell>
                    <button onClick={() => handleToggleVerification(user)}>
                      {user.verified ? (
                        <Badge variant="default" className="cursor-pointer">Vérifié</Badge>
                      ) : (
                        <Badge variant="outline" className="cursor-pointer">Non vérifié</Badge>
                      )}
                    </button>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResetPassword(user.id, user.email, user.role as 'sender' | 'transporter', user.name)}
                        className="gap-2"
                      >
                        <Key size={16} />
                        MDP
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id, user.email, user.name, user.role)}
                        className="gap-2"
                      >
                        <Trash size={16} />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
