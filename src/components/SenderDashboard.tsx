import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Package as PackageType, User, Route, Conversation } from '@/lib/types'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, MapPin, Calendar, Package as PackageIcon, CurrencyDollar, SignOut, User as UserIcon, ChatCircle, MagnifyingGlass } from '@phosphor-icons/react'
import { NewPackageDialog } from './NewPackageDialog'
import { PackageCard } from './PackageCard'
import { RouteMap } from './RouteMap'
import { MessagingSystem } from './MessagingSystem'
import { AvailableRoutes } from './AvailableRoutes'

interface SenderDashboardProps {
  user?: User
}

export function SenderDashboard({ user: propUser }: SenderDashboardProps) {
  const { currentUser, logout } = useAuth()
  const user = propUser || currentUser
  const [packages, setPackages] = useKV<PackageType[]>('packages', [])
  const [routes] = useKV<Route[]>('routes', [])
  const [conversations] = useKV<Conversation[]>('conversations', [])
  const [showNewPackage, setShowNewPackage] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)
  const [showMessaging, setShowMessaging] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'browse' | 'messages'>('dashboard')

  if (!user) {
    return null
  }

  const unreadCount = (conversations || [])
    .filter(conv => conv.participant1Id === user.id || conv.participant2Id === user.id)
    .reduce((sum, conv) => sum + conv.unreadCount, 0)

  const userPackages = (packages || []).filter(pkg => pkg.senderId === user.id)
  const pendingPackages = userPackages.filter(pkg => pkg.status === 'pending')
  const activePackages = userPackages.filter(pkg => ['matched', 'in_transit'].includes(pkg.status))
  const completedPackages = userPackages.filter(pkg => pkg.status === 'delivered')

  const handleAddPackage = (newPackage: Omit<PackageType, 'id' | 'senderId' | 'senderName' | 'status' | 'createdAt'>) => {
    const packageToAdd: PackageType = {
      ...newPackage,
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    setPackages((current) => [...(current || []), packageToAdd])
    setShowNewPackage(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">MBS</span>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">Tableau de Bord Expéditeur</div>
                <div className="text-xs text-muted-foreground">Mondial Bagage Services</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant={activeTab === 'browse' ? 'default' : 'outline'}
                size="sm" 
                onClick={() => setActiveTab('browse')}
                className="gap-2"
              >
                <MagnifyingGlass size={18} />
                <span className="hidden sm:inline">Trouver Transporteur</span>
              </Button>
              <Button 
                variant={activeTab === 'messages' ? 'default' : 'outline'}
                size="sm" 
                onClick={() => setActiveTab('messages')}
                className="gap-2 relative"
              >
                <ChatCircle size={18} />
                <span className="hidden sm:inline">Messages</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 min-w-5 px-1.5 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-muted">
                <UserIcon size={20} className="text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <SignOut size={18} />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'messages' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                <p className="text-muted-foreground mt-1">
                  Communiquez avec les transporteurs
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('dashboard')}
              >
                Retour au tableau de bord
              </Button>
            </div>
            <MessagingSystem currentUser={user} />
          </div>
        ) : activeTab === 'browse' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Trouver un Transporteur</h2>
                <p className="text-muted-foreground mt-1">
                  Parcourez les itinéraires disponibles et contactez les transporteurs
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('dashboard')}
              >
                Retour au tableau de bord
              </Button>
            </div>
            <AvailableRoutes 
              currentUser={user} 
              onConversationCreated={() => setActiveTab('messages')}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Mes Envois</h2>
                <p className="text-muted-foreground mt-1">
                  Gérez vos envois et suivez vos livraisons
                </p>
              </div>
              <Button onClick={() => setShowNewPackage(true)} size="lg" className="gap-2 font-semibold bg-accent hover:bg-accent/90">
                <Plus size={20} weight="bold" />
                Nouvel Envoi
              </Button>
            </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Envois</CardTitle>
              <PackageIcon size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPackages.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Calendar size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{pendingPackages.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">En Transit</CardTitle>
              <MapPin size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activePackages.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Livrés</CardTitle>
              <CurrencyDollar size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedPackages.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <RouteMap
            routes={routes || []}
            packages={userPackages}
            selectedPackage={selectedPackage}
            onPackageSelect={setSelectedPackage}
          />
        </div>

        {userPackages.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <PackageIcon size={40} className="text-muted-foreground" />
              </div>
            <h3 className="text-xl font-semibold mb-2">Aucun envoi pour le moment</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Créez votre première demande d'envoi et connectez-vous avec des transporteurs se rendant à votre destination
            </p>
            <Button onClick={() => setShowNewPackage(true)} size="lg" className="gap-2 bg-accent hover:bg-accent/90">
              <Plus size={20} weight="bold" />
              Créer Premier Envoi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {activePackages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Envois en Transit</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {activePackages.map(pkg => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </div>
          )}

          {pendingPackages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">En Attente de Transporteur</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pendingPackages.map(pkg => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </div>
          )}

          {completedPackages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Livrés</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {completedPackages.slice(0, 4).map(pkg => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
          </>
        )}

      <NewPackageDialog
        open={showNewPackage}
        onClose={() => setShowNewPackage(false)}
        onSubmit={handleAddPackage}
      />
      </main>
    </div>
  )
}
