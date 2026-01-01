import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Route, User, Package as PackageType, Conversation } from '@/lib/types'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, MapPin, Calendar, Truck, CurrencyDollar, SignOut, User as UserIcon, ChatCircle, MagnifyingGlass, Airplane } from '@phosphor-icons/react'
import { NewRouteDialog } from './NewRouteDialog'
import { RouteCard } from './RouteCard'
import { RouteMap } from './RouteMap'
import { MessagingSystem } from './MessagingSystem'
import { AvailablePackages } from './AvailablePackages'
import { TransporterProfile } from './TransporterProfile'
import { DeparturesSchedule } from './DeparturesSchedule'

interface TransporterDashboardProps {
  user?: User
}

export function TransporterDashboard({ user: propUser }: TransporterDashboardProps) {
  const { currentUser, logout, updateUser } = useAuth()
  const user = propUser || currentUser
  const [routes, setRoutes] = useKV<Route[]>('routes', [])
  const [packages] = useKV<PackageType[]>('packages', [])
  const [conversations] = useKV<Conversation[]>('conversations', [])
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')
  const [showNewRoute, setShowNewRoute] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [showMessaging, setShowMessaging] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'browse' | 'departures' | 'messages' | 'profile'>('dashboard')
  const [showLanding, setShowLanding] = useState(false)

  if (!user) {
    return null
  }

  const unreadCount = (conversations || [])
    .filter(conv => conv.participant1Id === user.id || conv.participant2Id === user.id)
    .reduce((sum, conv) => sum + conv.unreadCount, 0)

  const userRoutes = (routes || []).filter(route => route.transporterId === user.id)
  const upcomingRoutes = userRoutes.filter(route => new Date(route.departureDate) >= new Date())
  const pastRoutes = userRoutes.filter(route => new Date(route.departureDate) < new Date())

  const handleAddRoute = (newRoute: Omit<Route, 'id' | 'transporterId' | 'transporterName' | 'transporterRating' | 'verified' | 'createdAt'>) => {
    const routeToAdd: Route = {
      ...newRoute,
      id: Date.now().toString(),
      transporterId: user.id,
      transporterName: user.name,
      transporterRating: user.rating,
      verified: user.verified,
      createdAt: new Date().toISOString()
    }
    
    setRoutes((current) => [...(current || []), routeToAdd])
    setShowNewRoute(false)
  }

  if (showLanding) {
    window.location.href = '/'
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src={logoUrl} 
                alt="MBS Transport" 
                className="h-12 w-auto object-contain"
              />
            </button>
            
            <div className="flex items-center gap-4">
              <Button 
                variant={activeTab === 'departures' ? 'default' : 'outline'}
                size="sm" 
                onClick={() => setActiveTab('departures')}
                className="gap-2"
              >
                <Airplane size={18} />
                <span className="hidden sm:inline">Nos Départs</span>
              </Button>
              <Button 
                variant={activeTab === 'browse' ? 'default' : 'outline'}
                size="sm" 
                onClick={() => setActiveTab('browse')}
                className="gap-2"
              >
                <MagnifyingGlass size={18} />
                <span className="hidden sm:inline">Trouver Colis</span>
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
              <Button 
                variant={activeTab === 'profile' ? 'default' : 'outline'}
                size="sm" 
                onClick={() => setActiveTab('profile')}
                className="gap-2"
              >
                <UserIcon size={18} />
                <span className="hidden sm:inline">Profil</span>
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <SignOut size={18} />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'departures' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Nos Départs</h2>
                <p className="text-muted-foreground mt-1">
                  Planning des vols et itinéraires validés
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('dashboard')}
              >
                Retour au tableau de bord
              </Button>
            </div>
            <DeparturesSchedule standalone={false} />
          </div>
        ) : activeTab === 'profile' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Mon Profil</h2>
                <p className="text-muted-foreground mt-1">
                  Gérez vos informations personnelles
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('dashboard')}
              >
                Retour au tableau de bord
              </Button>
            </div>
            <div className="max-w-2xl">
              <TransporterProfile user={user} onUpdateProfile={updateUser} />
            </div>
          </div>
        ) : activeTab === 'messages' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                <p className="text-muted-foreground mt-1">
                  Communiquez avec les expéditeurs
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
                <h2 className="text-3xl font-bold tracking-tight">Trouver des Colis</h2>
                <p className="text-muted-foreground mt-1">
                  Parcourez les colis disponibles et contactez les expéditeurs
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('dashboard')}
              >
                Retour au tableau de bord
              </Button>
            </div>
            <AvailablePackages 
              currentUser={user} 
              onConversationCreated={() => setActiveTab('messages')}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Mes Itinéraires</h2>
                <p className="text-muted-foreground mt-1">
                  Gérez vos trajets et gagnez en transportant des colis
                </p>
              </div>
              <Button onClick={() => setShowNewRoute(true)} size="lg" className="gap-2 font-semibold bg-accent hover:bg-accent/90">
                <Plus size={20} weight="bold" />
                Ajouter Itinéraire
              </Button>
            </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Itinéraires</CardTitle>
              <Truck size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userRoutes.length}</div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">À Venir</CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{upcomingRoutes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Complétés</CardTitle>
            <MapPin size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{pastRoutes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <CurrencyDollar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{(pastRoutes.length * 45000).toLocaleString()} FCFA</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <RouteMap
          routes={userRoutes}
          packages={packages || []}
          selectedRoute={selectedRoute}
          onRouteSelect={setSelectedRoute}
        />
      </div>

      {userRoutes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Truck size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun itinéraire pour le moment</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Ajoutez vos prochains trajets et connectez-vous avec des expéditeurs de colis
            </p>
            <Button onClick={() => setShowNewRoute(true)} size="lg" className="gap-2 bg-accent hover:bg-accent/90">
              <Plus size={20} weight="bold" />
              Ajouter Premier Itinéraire
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {upcomingRoutes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Itinéraires à Venir</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingRoutes.map(route => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </div>
          )}

          {pastRoutes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Itinéraires Passés</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pastRoutes.slice(0, 4).map(route => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
          </>
        )}

      <NewRouteDialog
        open={showNewRoute}
        onClose={() => setShowNewRoute(false)}
        onSubmit={handleAddRoute}
      />
      </main>
    </div>
  )
}
