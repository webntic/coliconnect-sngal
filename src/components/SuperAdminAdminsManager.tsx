import { useState, useEffect } from 'react'
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

export function SuperAdminAdminsManager() {
  const [users] = useKV<User[]>('users', [])
  const [credentials, setCredentials] = useKV<UserCredentials[]>('user-credentials', [])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const admins = (users || []).filter(u => u.role === 'admin')

  const handleCreateAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.phone || !newAdmin.password) {
      toast.error('Tous les champs sont requis')
      return
    }

    const adminUser: User = {
      id: `admin-${Date.now()}`,
      name: newAdmin.name,
      email: newAdmin.email,
      phone: newAdmin.phone,
      role: 'admin',
      rating: 5,
      totalTransactions: 0,
      verified: true,
      createdAt: new Date().toISOString()
    }

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    allUsers.push(adminUser)
    await window.spark.kv.set('users', allUsers)

    await registerUser(newAdmin.email, newAdmin.password, adminUser.id, 'admin' as any)

    setNewAdmin({ name: '', email: '', phone: '', password: '' })
    setIsCreateOpen(false)
    toast.success('Administrateur créé avec succès')
  }

  const handleDeleteAdmin = async (adminId: string, email: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      return
    }

    const allUsers = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsers.filter(u => u.id !== adminId)
    await window.spark.kv.set('users', updatedUsers)

    setCredentials((current) => (current || []).filter(c => c.email !== email.toLowerCase()))

    toast.success('Administrateur supprimé')
  }

  const handleResetPassword = async (adminId: string, email: string) => {
    const newPassword = prompt('Nouveau mot de passe pour cet administrateur :')
    
    if (!newPassword) return

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    await registerUser(email, newPassword, adminId, 'admin' as any)
    toast.success('Mot de passe réinitialisé avec succès')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {admins.length} administrateur(s) actif(s)
        </p>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={18} />
              Créer un Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un Administrateur</DialogTitle>
              <DialogDescription>
                Créer un nouveau compte administrateur avec identifiant et mot de passe
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="Mamadou Diop"
                />
              </div>
              <div>
                <Label htmlFor="email">Email (identifiant de connexion)</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="admin@mbstransport.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={newAdmin.phone}
                  onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                  placeholder="+221 77 123 45 67"
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  placeholder="Minimum 6 caractères"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateAdmin}>
                Créer l'Administrateur
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
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Aucun administrateur
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phone}</TableCell>
                  <TableCell>{new Date(admin.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResetPassword(admin.id, admin.email)}
                        className="gap-2"
                      >
                        <Key size={16} />
                        Réinitialiser
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteAdmin(admin.id, admin.email)}
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
