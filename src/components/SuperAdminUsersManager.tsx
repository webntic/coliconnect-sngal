import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { User, UserCredentials } from '@/lib/types'
import { Trash, Key } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { registerUser } from '@/lib/auth'

export function SuperAdminUsersManager() {
  const [users] = useKV<User[]>('users', [])
  const [credentials, setCredentials] = useKV<UserCredentials[]>('user-credentials', [])

  const allUsers = (users || []).filter(u => u.role === 'sender' || u.role === 'transporter')

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return
    }

    const allUsersData = await window.spark.kv.get<User[]>('users') || []
    const updatedUsers = allUsersData.filter(u => u.id !== userId)
    await window.spark.kv.set('users', updatedUsers)

    setCredentials((current) => (current || []).filter(c => c.email !== email.toLowerCase()))

    toast.success('Utilisateur supprimé')
  }

  const handleResetPassword = async (userId: string, email: string, role: 'sender' | 'transporter') => {
    const newPassword = prompt('Nouveau mot de passe pour cet utilisateur :')
    
    if (!newPassword) return

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    await registerUser(email, newPassword, userId, role)
    toast.success('Mot de passe réinitialisé avec succès')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {allUsers.length} utilisateur(s) actif(s)
        </p>
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
            {allUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Aucun utilisateur
                </TableCell>
              </TableRow>
            ) : (
              allUsers.map((user) => (
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
                    {user.verified ? (
                      <Badge variant="default">Vérifié</Badge>
                    ) : (
                      <Badge variant="outline">Non vérifié</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResetPassword(user.id, user.email, user.role as 'sender' | 'transporter')}
                        className="gap-2"
                      >
                        <Key size={16} />
                        Réinitialiser
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id, user.email)}
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
