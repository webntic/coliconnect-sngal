import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Package, Truck, Shield, Eye, EyeSlash, House, EnvelopeSimple, Sparkle } from '@phosphor-icons/react'
import { User, UserRole } from '@/lib/types'
import { toast } from 'sonner'
import { verifyAdminCredentials, verifyUserCredentials, registerUser, initializeAdminCredentials, validatePassword } from '@/lib/auth'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingParticles } from '@/components/FloatingParticles'

interface AuthScreenProps {
  onAuth: (user: User) => void
  onBackToHome?: () => void
}

export function AuthScreen({ onAuth, onBackToHome }: AuthScreenProps) {
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
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  useEffect(() => {
    initializeAdminCredentials()
  }, [])

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)

    try {
      if (!resetEmail) {
        toast.error('Veuillez entrer votre adresse email')
        setResetLoading(false)
        return
      }

      const userExists = users?.some(u => u.email === resetEmail)
      
      if (!userExists) {
        toast.error('Aucun compte associé à cet email')
        setResetLoading(false)
        return
      }

      await new Promise(resolve => setTimeout(resolve, 1500))

      toast.success('Un email de réinitialisation a été envoyé à ' + resetEmail, {
        description: 'Veuillez vérifier votre boîte de réception',
        duration: 5000
      })
      
      setShowForgotPassword(false)
      setResetEmail('')
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email')
    } finally {
      setResetLoading(false)
    }
  }

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
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&h=1080&fit=crop&q=80" 
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <FloatingParticles />
          
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(72, 121, 221, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, rgba(231, 150, 92, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(72, 121, 221, 0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full py-6"
        >
          <div className="container max-w-md mx-auto px-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToHome}
              className="group flex items-center gap-3 bg-card/90 backdrop-blur-sm hover:bg-card border border-border rounded-xl p-3 transition-all hover:shadow-lg w-full"
            >
              <div className="h-12 w-auto flex items-center">
                <img 
                  src={logoUrl} 
                  alt="MBS Transport Logo" 
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png'
                  }}
                />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-base font-bold text-foreground">MBS Transport</h2>
                <p className="text-xs text-muted-foreground">Mondial Bagage Services</p>
              </div>
              <House size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          </div>
        </motion.div>

        <div className="flex-1 flex items-center justify-center p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md"
          >
          <Card className="w-full shadow-2xl border-2 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'linear-gradient(45deg, transparent 30%, rgba(72, 121, 221, 0.1) 50%, transparent 70%)',
                  'linear-gradient(90deg, transparent 30%, rgba(72, 121, 221, 0.1) 50%, transparent 70%)',
                  'linear-gradient(135deg, transparent 30%, rgba(72, 121, 221, 0.1) 50%, transparent 70%)',
                ],
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <CardHeader className="space-y-2 text-center relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4
                }}
                className="flex justify-center mb-2"
              >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center relative shadow-lg">
                <Shield size={32} weight="bold" className="text-primary-foreground" />
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(72, 121, 221, 0.5)',
                      '0 0 40px rgba(72, 121, 221, 0.8)',
                      '0 0 20px rgba(72, 121, 221, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
              <CardTitle className="text-3xl font-bold">Accès Administrateur</CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
              <CardDescription className="text-base">
                Connexion réservée aux administrateurs MBS Transport
              </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onSubmit={handleAdminLogin} 
                className="space-y-6"
              >
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
                  className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300" 
                  size="lg"
                  disabled={loading}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Connexion...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Se connecter
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <div className="pt-3 border-t">
                  <p className="text-xs text-center text-muted-foreground mb-2">Ou connexion rapide:</p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={() => {
                      setAdminUsername('admin@mbstransport.com')
                      setAdminPassword('MBS2024Admin!')
                      setTimeout(() => {
                        const form = document.querySelector('form')
                        if (form) {
                          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
                        }
                      }, 100)
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Shield size={16} weight="fill" className="mr-2" />
                    Connexion Admin Automatique
                  </Button>
                  </motion.div>
                </div>

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
              </motion.form>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1920&h=1080&fit=crop&q=80" 
          alt="Monument de la Renaissance - Dakar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-accent/70" />
        
        <FloatingParticles />
        
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 right-6 z-10"
      >
        <div className="container max-w-7xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToHome}
            className="group flex items-center gap-3 bg-card/95 backdrop-blur-md hover:bg-card border border-border rounded-xl p-3 transition-all hover:shadow-xl w-fit"
          >
            <div className="h-12 w-auto flex items-center">
              <img 
                src={logoUrl} 
                alt="MBS Transport Logo" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png'
                }}
              />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-base font-bold text-foreground">MBS Transport</h2>
              <p className="text-xs text-muted-foreground">Mondial Bagage Services</p>
            </div>
            <House size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-6xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full shadow-2xl border-2 relative overflow-hidden bg-card/95 backdrop-blur-md">
                <motion.div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      'linear-gradient(90deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <CardHeader className="space-y-2 text-center relative z-10 pb-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5
                    }}
                    className="flex justify-center mb-2"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center relative shadow-lg">
                      <Package size={32} weight="bold" className="text-primary-foreground" />
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(72, 121, 221, 0.5)',
                            '0 0 40px rgba(72, 121, 221, 0.8)',
                            '0 0 20px rgba(72, 121, 221, 0.5)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <CardTitle className="text-2xl font-bold">Connexion Client</CardTitle>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <CardDescription>
                      Accédez à votre espace personnel
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onSubmit={handleUserLogin} 
                    className="space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="amadou@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Mot de passe</Label>
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            Mot de passe oublié?
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300" 
                      size="lg"
                      disabled={loading}
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Connexion...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="ready"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Se connecter
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>

                    <div className="text-center space-y-2 pt-2">
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
                  </motion.form>

                  <div className="mt-6 pt-6 border-t">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-center mb-3"
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Sparkle size={16} weight="fill" className="text-accent" />
                        <p className="text-sm font-semibold text-foreground">Accès Rapide Démo</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Testez avec un compte démo</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="grid grid-cols-3 gap-2"
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        onClick={() => {
                          const adminUser: User = {
                            id: 'admin-demo',
                            name: 'Administrateur MBS',
                            email: 'admin@mbstransport.com',
                            phone: '+221 77 306 15 15',
                            role: 'admin',
                            rating: 5.0,
                            totalTransactions: 0,
                            verified: true,
                            createdAt: new Date().toISOString()
                          }
                          toast.success('Connexion Admin')
                          onAuth(adminUser)
                        }}
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-primary/5 hover:border-primary/50 transition-all w-full"
                      >
                        <Shield size={20} weight="fill" className="text-primary" />
                        <span className="text-xs font-semibold">Admin</span>
                      </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        onClick={() => {
                          const senderUser: User = {
                            id: 'sender-demo',
                            name: 'Amadou Diallo',
                            email: 'client@mbstransport.com',
                            phone: '+221 77 123 45 67',
                            role: 'sender',
                            rating: 4.8,
                            totalTransactions: 12,
                            verified: true,
                            createdAt: new Date().toISOString()
                          }
                          toast.success('Connexion Client')
                          onAuth(senderUser)
                        }}
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-primary/5 hover:border-primary/50 transition-all w-full"
                      >
                        <Package size={20} weight="fill" className="text-primary" />
                        <span className="text-xs font-semibold">Client</span>
                      </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        onClick={() => {
                          const transporterUser: User = {
                            id: 'transporter-demo',
                            name: 'Moussa Sarr',
                            email: 'transporteur@mbstransport.com',
                            phone: '+221 77 987 65 43',
                            role: 'transporter',
                            rating: 4.9,
                            totalTransactions: 45,
                            verified: true,
                            createdAt: new Date().toISOString()
                          }
                          toast.success('Connexion Transporteur')
                          onAuth(transporterUser)
                        }}
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-primary/5 hover:border-primary/50 transition-all w-full"
                      >
                        <Truck size={20} weight="fill" className="text-primary" />
                        <span className="text-xs font-semibold">Transp.</span>
                      </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full shadow-2xl border-2 relative overflow-hidden bg-card/95 backdrop-blur-md">
                <motion.div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      'linear-gradient(90deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                      'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <CardHeader className="space-y-2 text-center relative z-10 pb-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.6
                    }}
                    className="flex justify-center mb-2"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center relative shadow-lg">
                      <Truck size={32} weight="bold" className="text-accent-foreground" />
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(231, 150, 92, 0.5)',
                            '0 0 40px rgba(231, 150, 92, 0.8)',
                            '0 0 20px rgba(231, 150, 92, 0.5)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <CardTitle className="text-2xl font-bold">Espace Inscription</CardTitle>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <CardDescription>
                      Créez votre compte en quelques clics
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    onSubmit={handleUserRegister} 
                    className="space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Je souhaite m'inscrire en tant que</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedRole('sender')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                              selectedRole === 'sender' 
                                ? 'border-primary bg-primary/10 shadow-md' 
                                : 'border-border bg-card hover:border-primary/50'
                            }`}
                          >
                            <Package size={28} weight={selectedRole === 'sender' ? 'fill' : 'regular'} className={selectedRole === 'sender' ? 'text-primary' : 'text-muted-foreground'} />
                            <span className={`text-sm font-semibold ${selectedRole === 'sender' ? 'text-primary' : 'text-foreground'}`}>Client</span>
                            <span className="text-xs text-muted-foreground text-center">Envoyer des colis</span>
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedRole('transporter')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                              selectedRole === 'transporter' 
                                ? 'border-accent bg-accent/10 shadow-md' 
                                : 'border-border bg-card hover:border-accent/50'
                            }`}
                          >
                            <Truck size={28} weight={selectedRole === 'transporter' ? 'fill' : 'regular'} className={selectedRole === 'transporter' ? 'text-accent' : 'text-muted-foreground'} />
                            <span className={`text-sm font-semibold ${selectedRole === 'transporter' ? 'text-accent' : 'text-foreground'}`}>Transporteur</span>
                            <span className="text-xs text-muted-foreground text-center">Transporter des colis</span>
                          </motion.button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-name">Nom Complet</Label>
                        <Input
                          id="register-name"
                          placeholder="Amadou Diallo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-phone">Numéro de Téléphone</Label>
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="+221 77 123 45 67"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="amadou@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Mot de passe</Label>
                        <div className="relative">
                          <Input
                            id="register-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
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
                        <p className="text-xs text-muted-foreground">
                          Minimum 6 caractères
                        </p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-11 text-base font-semibold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg hover:shadow-xl transition-all duration-300" 
                      size="lg"
                      disabled={loading}
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Création...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="ready"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Créer un compte
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      En créant un compte, vous acceptez nos Conditions d'Utilisation
                    </p>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <EnvelopeSimple size={28} weight="bold" className="text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Mot de passe oublié?</DialogTitle>
            <DialogDescription className="text-center">
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Adresse Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="amadou@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={resetLoading}
              >
                {resetLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetEmail('')
                }}
                className="w-full"
              >
                Annuler
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
