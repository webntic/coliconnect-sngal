import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { User, UserCredentials } from '@/lib/types'
import { registerUser } from '@/lib/auth'
import { Plus, Trash, Key, CheckSquare, Square, Download, PencilSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { ActivityLogEntry } from '@/components/SuperAdminActivityLog'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export function SuperAdminTransportersManager() {
  const [users] = useKV<User[]>('users', [])
  const [credentials, setCredentials] = useKV<UserCredentials[]>('user-credentials', [])
  const [activityLog, setActivityLog] = useKV<ActivityLogEntry[]>('activity-log', [])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingTransporter, setEditingTransporter] = useState<User | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [newTransporter, setNewTransporter] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const transporters = (users || []).filter(u => u.role === 'transporter')

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

  const handleCreateTransporter = async () => {
    if (!newTransporter.name || !newTransporter.email || !newTransporter.phone || !newTransporter.password) {
      toast.error('Tous les champs sont requis')
      return
    }

    const transporterUser: User = {
      id: `transporter-${Date.now()}`,
      name: newTransporter.name,
      email: newTransporter.email,
      phone: newTransporter.phone,
      role: 'transporter',
      rating: 5,
      totalTransactions: 0,
      verified: true,
      createdAt: new Date().toISOString()
    }

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    allUsers.push(transporterUser)
    await window.spark.kv.set('users', allUsers)

    await registerUser(newTransporter.email, newTransporter.password, transporterUser.id, 'transporter')

    logActivity('user_created', 'Super Admin', newTransporter.email, `Transporteur ${newTransporter.name} créé`)

    setNewTransporter({ name: '', email: '', phone: '', password: '' })
    setIsCreateOpen(false)
    toast.success('Transporteur créé avec succès')
  }

  const handleUpdateTransporter = async () => {
    if (!editingTransporter) return

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsers.map(u => u.id === editingTransporter.id ? editingTransporter : u)
    await window.spark.kv.set('users', updatedUsers)

    logActivity('user_created', 'Super Admin', editingTransporter.email, `Transporteur ${editingTransporter.name} modifié`)

    setEditingTransporter(null)
    toast.success('Transporteur modifié avec succès')
  }

  const handleDeleteTransporter = async (transporterId: string, email: string, name: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce transporteur ?')) {
      return
    }

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsers.filter(u => u.id !== transporterId)
    await window.spark.kv.set('users', updatedUsers)

    setCredentials((current) => (current || []).filter(c => c.email !== email.toLowerCase()))

    logActivity('user_deleted', 'Super Admin', email, `Transporteur ${name} supprimé`)

    toast.success('Transporteur supprimé')
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error('Aucun transporteur sélectionné')
      return
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.length} transporteur(s) ?`)) {
      return
    }

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsers.filter(u => !selectedIds.includes(u.id))
    await window.spark.kv.set('users', updatedUsers)

    const deletedTransporters = transporters.filter(t => selectedIds.includes(t.id))
    deletedTransporters.forEach(t => {
      setCredentials((current) => (current || []).filter(c => c.email !== t.email.toLowerCase()))
    })

    logActivity('user_deleted', 'Super Admin', undefined, `${selectedIds.length} transporteurs supprimés en masse`)

    setSelectedIds([])
    toast.success(`${selectedIds.length} transporteur(s) supprimé(s)`)
  }

  const handleResetPassword = async (transporterId: string, email: string, name: string) => {
    const newPassword = prompt('Nouveau mot de passe pour ce transporteur :')
    
    if (!newPassword) return

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    await registerUser(email, newPassword, transporterId, 'transporter')
    
    logActivity('password_reset', 'Super Admin', email, `Mot de passe réinitialisé pour ${name}`)
    
    toast.success('Mot de passe réinitialisé avec succès')
  }

  const handleExport = () => {
    const csvContent = [
      ['Nom', 'Email', 'Téléphone', 'Note', 'Transactions', 'Date de création'],
      ...transporters.map(t => [
        t.name,
        t.email,
        t.phone,
        t.rating.toString(),
        t.totalTransactions.toString(),
        new Date(t.createdAt).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `transporteurs-${new Date().toISOString().split('T')[0]}.csv`
    link.click()

    toast.success('Liste des transporteurs exportée')
  }

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === transporters.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(transporters.map(t => t.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          {transporters.length} transporteur(s) actif(s)
          {selectedIds.length > 0 && ` • ${selectedIds.length} sélectionné(s)`}
        </p>
        <div className="flex gap-2 flex-wrap">
          {selectedIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="gap-2">
              <Trash size={18} />
              Supprimer ({selectedIds.length})
            </Button>
          )}
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download size={18} />
            Exporter
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} />
                Créer un Transporteur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un Transporteur</DialogTitle>
                <DialogDescription>
                  Créer un nouveau compte transporteur avec identifiant et mot de passe
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={newTransporter.name}
                    onChange={(e) => setNewTransporter({ ...newTransporter, name: e.target.value })}
                    placeholder="Ibrahima Sarr"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (identifiant de connexion)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newTransporter.email}
                    onChange={(e) => setNewTransporter({ ...newTransporter, email: e.target.value })}
                    placeholder="transporteur@mbstransport.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={newTransporter.phone}
                    onChange={(e) => setNewTransporter({ ...newTransporter, phone: e.target.value })}
                    placeholder="+221 77 123 45 67"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newTransporter.password}
                    onChange={(e) => setNewTransporter({ ...newTransporter, password: e.target.value })}
                    placeholder="Minimum 6 caractères"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateTransporter}>
                  Créer le Transporteur
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={!!editingTransporter} onOpenChange={(open) => !open && setEditingTransporter(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le Transporteur</DialogTitle>
            <DialogDescription>
              Modifier les informations du transporteur
            </DialogDescription>
          </DialogHeader>
          {editingTransporter && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nom complet</Label>
                <Input
                  id="edit-name"
                  value={editingTransporter.name}
                  onChange={(e) => setEditingTransporter({ ...editingTransporter, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingTransporter.email}
                  onChange={(e) => setEditingTransporter({ ...editingTransporter, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Téléphone</Label>
                <Input
                  id="edit-phone"
                  value={editingTransporter.phone}
                  onChange={(e) => setEditingTransporter({ ...editingTransporter, phone: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTransporter(null)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateTransporter}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === transporters.length && transporters.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transporters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Aucun transporteur
                </TableCell>
              </TableRow>
            ) : (
              transporters.map((transporter) => (
                <TableRow key={transporter.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(transporter.id)}
                      onCheckedChange={() => toggleSelection(transporter.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{transporter.name}</TableCell>
                  <TableCell>{transporter.email}</TableCell>
                  <TableCell>{transporter.phone}</TableCell>
                  <TableCell>{transporter.rating.toFixed(1)} ⭐</TableCell>
                  <TableCell>
                    {transporter.verified ? (
                      <Badge variant="default">Vérifié</Badge>
                    ) : (
                      <Badge variant="outline">Non vérifié</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(transporter.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingTransporter(transporter)}
                        className="gap-1 px-2"
                      >
                        <PencilSimple size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResetPassword(transporter.id, transporter.email, transporter.name)}
                        className="gap-1 px-2"
                      >
                        <Key size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteTransporter(transporter.id, transporter.email, transporter.name)}
                        className="gap-1 px-2"
                      >
                        <Trash size={14} />
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
