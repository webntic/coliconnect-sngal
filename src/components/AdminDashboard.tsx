import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Package as PackageType, User, Route, Conversation, Message, Review } from '@/lib/types'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Users,
  Package as PackageIcon,
  MapPin,
  SignOut,
  MagnifyingGlass,
  ChartBar,
  ChatCircle,
  Star,
  TrendUp,
  CheckCircle,
  XCircle,
  Clock,
  Warning,
  UserCircle,
  Truck,
  Gear
} from '@phosphor-icons/react'
import { UserManagement } from './UserManagement'
import { AdminPackagesTable } from './AdminPackagesTable'
import { AdminRoutesTable } from './AdminRoutesTable'
import { AdminStats } from './AdminStats'
import { AdminMessagesMonitor } from './AdminMessagesMonitor'
import { AdminReviewsMonitor } from './AdminReviewsMonitor'
import { AdminCredentialsInfo } from './AdminCredentialsInfo'
import { LogoManager } from './LogoManager'

export function AdminDashboard() {
  const { logout } = useAuth()
  const [users] = useKV<User[]>('users', [])
  const [packages] = useKV<PackageType[]>('packages', [])
  const [routes] = useKV<Route[]>('routes', [])
  const [conversations] = useKV<Conversation[]>('conversations', [])
  const [messages] = useKV<Message[]>('messages', [])
  const [reviews] = useKV<Review[]>('reviews', [])
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'packages' | 'routes' | 'messages' | 'reviews' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = useMemo(() => {
    const totalUsers = users?.length || 0
    const senders = users?.filter(u => u.role === 'sender').length || 0
    const transporters = users?.filter(u => u.role === 'transporter').length || 0
    const verifiedUsers = users?.filter(u => u.verified).length || 0
    
    const totalPackages = packages?.length || 0
    const pendingPackages = packages?.filter(p => p.status === 'pending').length || 0
    const activePackages = packages?.filter(p => ['matched', 'in_transit'].includes(p.status)).length || 0
    const completedPackages = packages?.filter(p => p.status === 'delivered').length || 0
    
    const totalRoutes = routes?.length || 0
    const activeRoutes = routes?.filter(r => new Date(r.departureDate) > new Date()).length || 0
    
    const totalMessages = messages?.length || 0
    const totalConversations = conversations?.length || 0
    
    const totalReviews = reviews?.length || 0
    const avgRating = reviews?.length ? 
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

    const totalRevenue = packages
      ?.filter(p => p.status === 'delivered')
      .reduce((sum, p) => sum + p.price, 0) || 0

    return {
      totalUsers,
      senders,
      transporters,
      verifiedUsers,
      totalPackages,
      pendingPackages,
      activePackages,
      completedPackages,
      totalRoutes,
      activeRoutes,
      totalMessages,
      totalConversations,
      totalReviews,
      avgRating,
      totalRevenue
    }
  }, [users, packages, routes, conversations, messages, reviews])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <ChartBar className="text-primary-foreground" size={24} weight="bold" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">MBS Transport</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-80 hidden md:block">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Rechercher utilisateurs, colis, routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" size="sm" onClick={logout}>
              <SignOut size={18} />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <ChartBar size={18} />
              <span className="hidden sm:inline">Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users size={18} />
              <span className="hidden sm:inline">Utilisateurs</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-2">
              <PackageIcon size={18} />
              <span className="hidden sm:inline">Colis</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="gap-2">
              <MapPin size={18} />
              <span className="hidden sm:inline">Itinéraires</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <ChatCircle size={18} />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star size={18} />
              <span className="hidden sm:inline">Avis</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Gear size={18} />
              <span className="hidden sm:inline">Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats stats={stats} />
            
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PackageIcon size={20} />
                        Colis Récents
                      </CardTitle>
                      <CardDescription>
                        Les 5 derniers colis créés
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {packages?.slice(-5).reverse().map(pkg => (
                        <div key={pkg.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{pkg.title}</p>
                            <p className="text-xs text-muted-foreground">{pkg.origin} → {pkg.destination}</p>
                          </div>
                          <Badge variant={
                            pkg.status === 'delivered' ? 'default' :
                            pkg.status === 'in_transit' ? 'secondary' :
                            'outline'
                          }>
                            {pkg.status}
                          </Badge>
                        </div>
                      ))}
                      {!packages?.length && (
                        <p className="text-sm text-muted-foreground text-center py-4">Aucun colis</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin size={20} />
                        Itinéraires Récents
                      </CardTitle>
                      <CardDescription>
                        Les 5 derniers itinéraires créés
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {routes?.slice(-5).reverse().map(route => (
                        <div key={route.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{route.transporterName}</p>
                            <p className="text-xs text-muted-foreground">{route.origin} → {route.destination}</p>
                          </div>
                          <Badge variant={route.verified ? 'default' : 'outline'}>
                            {route.verified ? 'Vérifié' : 'En attente'}
                          </Badge>
                        </div>
                      ))}
                      {!routes?.length && (
                        <p className="text-sm text-muted-foreground text-center py-4">Aucun itinéraire</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <AdminCredentialsInfo />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  Nouveaux Utilisateurs
                </CardTitle>
                <CardDescription>
                  Les 10 derniers utilisateurs inscrits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {users?.slice(-10).reverse().map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {user.role === 'sender' ? (
                            <UserCircle className="text-primary" size={24} />
                          ) : (
                            <Truck className="text-primary" size={24} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.role === 'sender' ? 'secondary' : 'default'}>
                          {user.role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                        </Badge>
                        {user.verified && (
                          <CheckCircle className="text-green-600" size={18} weight="fill" />
                        )}
                      </div>
                    </div>
                  ))}
                  {!users?.length && (
                    <p className="text-sm text-muted-foreground text-center py-4">Aucun utilisateur</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="packages">
            <AdminPackagesTable packages={packages || []} users={users || []} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="routes">
            <AdminRoutesTable routes={routes || []} users={users || []} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="messages">
            <AdminMessagesMonitor 
              conversations={conversations || []} 
              messages={messages || []}
              users={users || []}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="reviews">
            <AdminReviewsMonitor 
              reviews={reviews || []}
              users={users || []}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="settings">
            <div className="max-w-2xl mx-auto">
              <LogoManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
