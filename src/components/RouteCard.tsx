import { Route } from '@/lib/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Truck, ArrowRight, Star } from '@phosphor-icons/react'

interface RouteCardProps {
  route: Route
}

export function RouteCard({ route }: RouteCardProps) {
  const isUpcoming = new Date(route.departureDate) >= new Date()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Truck size={20} className="text-accent" weight="duotone" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base">{route.vehicleType}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                <Star size={14} weight="fill" className="text-yellow-500" />
                <span>{route.transporterRating.toFixed(1)}</span>
                {route.verified && (
                  <Badge variant="outline" className="ml-2 text-xs px-1.5 py-0 h-5">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Badge variant={isUpcoming ? "default" : "secondary"}>
            {isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
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
            <span>{new Date(route.departureDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{route.availableCapacity}</span>
            <span className="font-bold text-accent">${route.pricePerKg}/kg</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
