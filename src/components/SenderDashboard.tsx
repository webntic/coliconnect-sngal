import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Package as PackageType, User, Route } from '@/lib/types'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, MapPin, Calendar, Package as PackageIcon, CurrencyDollar, SignOut, User as UserIcon } from '@phosphor-icons/react'
import { NewPackageDialog } from './NewPackageDialog'
import { PackageCard } from './PackageCard'
import { RouteMap } from './RouteMap'

interface SenderDashboardProps {
  user?: User
}

export function SenderDashboard({ user: propUser }: SenderDashboardProps) {
  const { currentUser, logout } = useAuth()
  const user = propUser || currentUser!
  const [packages, setPackages] = useKV<PackageType[]>('packages', [])
  const [routes] = useKV<Route[]>('routes', [])
  const [showNewPackage, setShowNewPackage] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)

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

      <NewPackageDialog
        open={showNewPackage}
        onClose={() => setShowNewPackage(false)}
        onSubmit={handleAddPackage}
      />
      </main>
    </div>
  )
}
