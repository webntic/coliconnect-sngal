import { useKV } from '@github/spark/hooks'
import { Route, User } from '@/lib/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Calendar, Truck, ArrowRight, Star } from '@phosphor-icons/react'
import { StartConversationButton } from './StartConversationButton'
import { useState } from 'react'

interface AvailableRoutesProps {
  currentUser: User
  onConversationCreated?: () => void
}

export function AvailableRoutes({ currentUser, onConversationCreated }: AvailableRoutesProps) {
  const [routes] = useKV<Route[]>('routes', [])
  const [searchTerm, setSearchTerm] = useState('')

  const availableRoutes = (routes || [])
    .filter(route => {
      if (route.transporterId === currentUser.id) return false
      if (new Date(route.departureDate) < new Date()) return false
      
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        return (
          route.origin.toLowerCase().includes(search) ||
          route.destination.toLowerCase().includes(search) ||
          route.vehicleType.toLowerCase().includes(search)
        )
      }
      
      return true
    })
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Rechercher par origine, destination ou véhicule..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-3 pr-4">
          {availableRoutes.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Truck size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Aucun itinéraire trouvé pour cette recherche' 
                    : 'Aucun itinéraire disponible pour le moment'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            availableRoutes.map(route => (
              <Card key={route.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Truck size={20} className="text-accent" weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base">{route.transporterName}</h3>
                        <p className="text-sm text-muted-foreground">{route.vehicleType}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Star size={14} weight="fill" className="text-yellow-500" />
                          <span>{route.transporterRating.toFixed(1)}</span>
                          {route.verified && (
                            <Badge variant="outline" className="ml-2 text-xs px-1.5 py-0 h-5">
                              Vérifié
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <StartConversationButton
                      currentUser={currentUser}
                      otherUserId={route.transporterId}
                      otherUserName={route.transporterName}
                      otherUserRole="transporter"
                      routeId={route.id}
                      onConversationCreated={onConversationCreated}
                      size="sm"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
                    <span className="font-medium truncate">{route.origin}</span>
                    <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                    <span className="font-medium truncate">{route.destination}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span>{new Date(route.departureDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{route.availableCapacity}</span>
                      <span className="font-bold text-accent">{route.pricePerKg.toLocaleString()} FCFA/kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
