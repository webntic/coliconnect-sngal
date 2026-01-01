import { Package as PackageType } from '@/lib/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Package as PackageIcon, ArrowRight } from '@phosphor-icons/react'

interface PackageCardProps {
  package: PackageType
}

const statusConfig = {
  pending: { label: 'En Attente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  matched: { label: 'Assigné', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  in_transit: { label: 'En Transit', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  delivered: { label: 'Livré', color: 'bg-green-100 text-green-800 border-green-200' },
  cancelled: { label: 'Annulé', color: 'bg-gray-100 text-gray-800 border-gray-200' }
}

const sizeLabels = {
  small: 'Petit (<5kg)',
  medium: 'Moyen (5-15kg)',
  large: 'Grand (15-30kg)',
  xlarge: 'Très Grand (30-50kg)',
  gp: 'GP - Gros Poids (>50kg)'
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const status = statusConfig[pkg.status]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PackageIcon size={20} className="text-primary" weight="duotone" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">{pkg.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{pkg.description}</p>
            </div>
          </div>
          <Badge variant="outline" className={status.color}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="font-medium truncate">{pkg.origin}</span>
          <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="font-medium truncate">{pkg.destination}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span>{new Date(pkg.pickupDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{sizeLabels[pkg.size]}</span>
            <span className="font-bold text-primary">{pkg.price.toLocaleString()} FCFA</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
