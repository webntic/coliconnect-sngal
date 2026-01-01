import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Route, User } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, MapPin, Calendar, Truck, CurrencyDollar } from '@phosphor-icons/react'
import { NewRouteDialog } from './NewRouteDialog'
import { RouteCard } from './RouteCard'

interface TransporterDashboardProps {
  user: User
}

export function TransporterDashboard({ user }: TransporterDashboardProps) {
  const [routes, setRoutes] = useKV<Route[]>('routes', [])
  const [showNewRoute, setShowNewRoute] = useState(false)

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

  return (
    <div className="container max-w-7xl px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Routes</h2>
          <p className="text-muted-foreground mt-1">
            Manage your travel routes and earn by delivering packages
          </p>
        </div>
        <Button onClick={() => setShowNewRoute(true)} size="lg" className="gap-2 font-semibold">
          <Plus size={20} weight="bold" />
          Add Route
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            <Truck size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userRoutes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{upcomingRoutes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <MapPin size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{pastRoutes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <CurrencyDollar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">${(pastRoutes.length * 45).toFixed(0)}</div>
          </CardContent>
        </Card>
      </div>

      {userRoutes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Truck size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No routes yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Add your upcoming travel routes and get matched with package senders
            </p>
            <Button onClick={() => setShowNewRoute(true)} size="lg" className="gap-2">
              <Plus size={20} weight="bold" />
              Add First Route
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {upcomingRoutes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Upcoming Routes</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingRoutes.map(route => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </div>
          )}

          {pastRoutes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Past Routes</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pastRoutes.slice(0, 4).map(route => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <NewRouteDialog
        open={showNewRoute}
        onClose={() => setShowNewRoute(false)}
        onSubmit={handleAddRoute}
      />
    </div>
  )
}
