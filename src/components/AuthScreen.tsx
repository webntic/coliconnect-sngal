import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, Truck, Shield, Eye, EyeSlash } from '@phosphor-icons/react'
import { User, UserRole } from '@/lib/types'
import { toast } from 'sonner'
import { verifyAdminCredentials, verifyUserCredentials, registerUser, initializeAdminCredentials, validatePassword } from '@/lib/auth'
import { useKV } from '@github/spark/hooks'

interface AuthScreenProps {
  onAuth: (user: User) => void
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [selectedRole, setSelectedRole] = useState<UserRole>('sender')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [users] = useKV<User[]>('registered-users', [])

  useEffect(() => {
    initializeAdminCredentials()
  }, [])

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const isValid = await verifyAdminCredentials(adminUsername, adminPassword)
      
      if (!isValid) {
        toast.error('Identifiant ou mot de passe administrateur incorrect')
        setLoading(false)
        return
      }

      const adminUser: User = {
        id: 'admin-' + Date.now().toString(),
        name: 'Administrateur MBS',
        email: adminUsername,
        phone: '+221 77 306 15 15',
        role: 'admin',
        rating: 5.0,
        totalTransactions: 0,
        verified: true,
        createdAt: new Date().toISOString()
      }

      toast.success('Connexion administrateur réussie')
      onAuth(adminUser)
    } catch (error) {
      toast.error('Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const credentials = await verifyUserCredentials(email, password)
      
      if (!credentials) {
        toast.error('Email ou mot de passe incorrect')
        setLoading(false)
        return
      }

      const user = users?.find(u => u.id === credentials.userId)
      
      if (!user) {
        toast.error('Utilisateur non trouvé')
        setLoading(false)
        return
      }

      toast.success(`Bienvenue ${user.name}!`)
      onAuth(user)
    } catch (error) {
      toast.error('Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!name || !email || !phone || !password) {
        toast.error('Veuillez remplir tous les champs')
        setLoading(false)
        return
      }

      const passwordValidation = validatePassword(password)
      if (!passwordValidation.valid) {
        toast.error(passwordValidation.message)
        setLoading(false)
        return
      }

      const existingCredentials = await verifyUserCredentials(email, password)
      if (existingCredentials) {
        toast.error('Un compte existe déjà avec cet email')
        setLoading(false)
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

      await registerUser(email, password, newUser.id, selectedRole as 'sender' | 'transporter')

      const updatedUsers = [...(users || []), newUser]
      await window.spark.kv.set('registered-users', updatedUsers)

      toast.success('Compte créé avec succès!')
      onAuth(newUser)
    } catch (error) {
      toast.error('Erreur lors de la création du compte')
    } finally {
      setLoading(false)
    }
  }

  if (showAdminLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <Shield size={32} weight="bold" className="text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Accès Administrateur</CardTitle>
            <CardDescription className="text-base">
              Connexion réservée aux administrateurs MBS Transport
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername">Identifiant</Label>
                  <Input
                    id="adminUsername"
                    type="text"
                    placeholder="admin@mbstransport"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="adminPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg border">
                  <p className="text-xs font-mono text-muted-foreground">
                    <strong className="text-foreground">Identifiant:</strong> admin@mbstransport<br />
                    <strong className="text-foreground">Mot de passe:</strong> MBS2024Admin!
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-semibold" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setShowAdminLogin(false)
                  setAdminUsername('')
                  setAdminPassword('')
                  setShowPassword(false)
                }}
                className="text-sm text-muted-foreground hover:text-foreground underline w-full text-center"
              >
                ← Retour à la connexion normale
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
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
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'register')} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={mode === 'login' ? handleUserLogin : handleUserRegister} className="space-y-6">
            <div className="space-y-4">
              {mode === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Je souhaite</Label>
                    <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sender" className="flex items-center gap-2">
                          <Package size={18} />
                          <span>Envoyer</span>
                        </TabsTrigger>
                        <TabsTrigger value="transporter" className="flex items-center gap-2">
                          <Truck size={18} />
                          <span>Transporter</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

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
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="amadou@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {mode === 'register' && (
                  <p className="text-xs text-muted-foreground">
                    Minimum 6 caractères
                  </p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold bg-accent hover:bg-accent/90" 
              size="lg"
              disabled={loading}
            >
              {loading ? (mode === 'login' ? 'Connexion...' : 'Création...') : (mode === 'login' ? 'Se connecter' : 'Créer un compte')}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowAdminLogin(true)
                  setSelectedRole('admin')
                }}
                className="text-xs text-muted-foreground hover:text-foreground underline flex items-center justify-center gap-1 mx-auto"
              >
                <Shield size={14} weight="fill" />
                Accès administrateur
              </button>
              
              <p className="text-xs text-muted-foreground">
                En continuant, vous acceptez nos Conditions d'Utilisation
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
