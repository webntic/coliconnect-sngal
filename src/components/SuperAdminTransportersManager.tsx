import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { User, UserCredentials } from '@/lib/types'
import { registerUser } from '@/lib/auth'
import { Plus, Trash, Key } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function SuperAdminTransportersManager() {
  const [users] = useKV<User[]>('users', [])
  const [credentials, setCredentials] = useKV<UserCredentials[]>('user-credentials', [])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTransporter, setNewTransporter] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const transporters = (users || []).filter(u => u.role === 'transporter')

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

    setNewTransporter({ name: '', email: '', phone: '', password: '' })
    setIsCreateOpen(false)
    toast.success('Transporteur créé avec succès')
  }

  const handleDeleteTransporter = async (transporterId: string, email: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce transporteur ?')) {
      return
    }

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsers.filter(u => u.id !== transporterId)
    await window.spark.kv.set('users', updatedUsers)

    setCredentials((current) => (current || []).filter(c => c.email !== email.toLowerCase()))

    toast.success('Transporteur supprimé')
  }

  const handleResetPassword = async (transporterId: string, email: string) => {
    const newPassword = prompt('Nouveau mot de passe pour ce transporteur :')
    
    if (!newPassword) return

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    await registerUser(email, newPassword, transporterId, 'transporter')
    toast.success('Mot de passe réinitialisé avec succès')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {transporters.length} transporteur(s) actif(s)
        </p>
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

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transporters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Aucun transporteur
                </TableCell>
              </TableRow>
            ) : (
              transporters.map((transporter) => (
                <TableRow key={transporter.id}>
                  <TableCell className="font-medium">{transporter.name}</TableCell>
                  <TableCell>{transporter.email}</TableCell>
                  <TableCell>{transporter.phone}</TableCell>
                  <TableCell>{transporter.rating.toFixed(1)} ⭐</TableCell>
                  <TableCell>{new Date(transporter.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResetPassword(transporter.id, transporter.email)}
                        className="gap-2"
                      >
                        <Key size={16} />
                        Réinitialiser
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteTransporter(transporter.id, transporter.email)}
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
