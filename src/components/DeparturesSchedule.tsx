import { useKV } from '@github/spark/hooks'
import { Route, User } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MapPin, 
  Calendar, 
  Airplane, 
  Clock, 
  User as UserIcon, 
  Star, 
  CheckCircle,
  Truck
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface DeparturesScheduleProps {
  standalone?: boolean
}

export function DeparturesSchedule({ standalone = true }: DeparturesScheduleProps) {
  const [routes] = useKV<Route[]>('routes', [])
  const [users] = useKV<User[]>('users', [])

  const verifiedRoutes = (routes || [])
    .filter(route => {
      const transporter = users?.find(u => u.id === route.transporterId)
      return transporter?.verified && new Date(route.departureDate) >= new Date()
    })
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())

  const getTransporter = (transporterId: string) => {
    return users?.find(u => u.id === transporterId)
  }

  if (verifiedRoutes.length === 0) {
    const emptyState = (
      <div className="text-center py-16">
        <Airplane size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">Aucun départ disponible</h3>
        <p className="text-muted-foreground">
          Les prochains départs seront affichés dès qu'ils seront validés par l'administration.
        </p>
      </div>
    )
    
    return standalone ? (
      <div className="container max-w-7xl mx-auto px-6 py-12">{emptyState}</div>
    ) : emptyState
  }

  const content = (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Nos Départs</h1>
        <p className="text-lg text-muted-foreground">
          Planning des vols et itinéraires validés par MBS Transport
        </p>
      </div>

      <div className="grid gap-6">
        {verifiedRoutes.map((route) => {
          const transporter = getTransporter(route.transporterId)
          
          return (
            <Card key={route.id} className="overflow-hidden border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {route.vehicleType.toLowerCase().includes('avion') ? (
                          <Airplane size={24} className="text-primary" />
                        ) : (
                          <Truck size={24} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {route.origin} → {route.destination}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {route.vehicleType}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="text-primary" size={18} />
                        <div>
                          <span className="font-medium">Départ:</span>{' '}
                          <span className="text-muted-foreground">
                            {format(new Date(route.departureDate), 'EEEE d MMMM yyyy', { locale: fr })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="text-secondary" size={18} />
                        <div>
                          <span className="font-medium">Arrivée:</span>{' '}
                          <span className="text-muted-foreground">
                            {format(new Date(route.arrivalDate), 'EEEE d MMMM yyyy', { locale: fr })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="text-accent" size={18} />
                        <div>
                          <span className="font-medium">Capacité:</span>{' '}
                          <span className="text-muted-foreground">{route.availableCapacity}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-lg text-primary">
                          {route.pricePerKg}€/kg
                        </span>
                      </div>
                    </div>
                  </div>

                  {transporter && (
                    <Card className="bg-card border shadow-sm min-w-[280px]">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={transporter.avatar} alt={transporter.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {transporter.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{transporter.name}</span>
                              {transporter.verified && (
                                <CheckCircle size={16} weight="fill" className="text-primary" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 mb-2">
                              <Star size={14} weight="fill" className="text-accent" />
                              <span className="text-sm font-medium">{transporter.rating.toFixed(1)}</span>
                              <span className="text-xs text-muted-foreground">
                                ({transporter.totalTransactions} voyages)
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <UserIcon size={12} />
                              <span>Transporteur vérifié</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle size={14} weight="fill" />
                      Validé par MBS Transport
                    </Badge>
                  </div>
                  
                  <Button variant="default" size="sm">
                    Réserver ce trajet
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
  
  return standalone ? (
    <div className="container max-w-7xl mx-auto px-6 py-12">{content}</div>
  ) : content
}
