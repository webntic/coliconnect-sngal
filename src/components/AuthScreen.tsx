import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, Truck, Shield } from '@phosphor-icons/react'
import { User, UserRole } from '@/lib/types'
import { toast } from 'sonner'

interface AuthScreenProps {
  onAuth: (user: User) => void
}

const ADMIN_CODE = 'MBS2024ADMIN'

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('sender')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [adminCode, setAdminCode] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedRole === 'admin' && adminCode !== ADMIN_CODE) {
      toast.error('Code administrateur invalide')
      return
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: selectedRole,
      rating: 5.0,
      totalTransactions: 0,
      verified: true,
      createdAt: new Date().toISOString()
    }

    onAuth(newUser)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Package size={32} weight="bold" className="text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">MBS Transport</CardTitle>
          <CardDescription className="text-base">
            Connectez, expédiez et livrez des colis dans le monde entier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {!showAdminLogin ? (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Je souhaite</Label>
                  <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="sender" className="flex items-center gap-2">
                        <Package size={18} />
                        <span>Envoyer Colis</span>
                      </TabsTrigger>
                      <TabsTrigger value="transporter" className="flex items-center gap-2">
                        <Truck size={18} />
                        <span>Transporter</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(true)
                      setSelectedRole('admin')
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline mt-2"
                  >
                    Accès administrateur
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border-2 border-primary/20">
                    <Shield size={24} className="text-primary" weight="fill" />
                    <div>
                      <p className="font-semibold text-sm">Mode Administrateur</p>
                      <p className="text-xs text-muted-foreground">Accès réservé</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false)
                      setSelectedRole('sender')
                      setAdminCode('')
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    ← Retour
                  </button>
                </div>
              )}

              {showAdminLogin && (
                <div className="space-y-2">
                  <Label htmlFor="adminCode">Code Administrateur</Label>
                  <Input
                    id="adminCode"
                    type="password"
                    placeholder="Entrez le code admin"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    required
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Code: MBS2024ADMIN
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nom Complet</Label>
                <Input
                  id="name"
                  placeholder="Amadou Diallo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="amadou@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+221 77 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold bg-accent hover:bg-accent/90" size="lg">
              Commencer
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              En continuant, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
