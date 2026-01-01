import { useKV } from '@github/spark/hooks'
import { Package as PackageType, User } from '@/lib/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Calendar, Package as PackageIcon, ArrowRight } from '@phosphor-icons/react'
import { StartConversationButton } from './StartConversationButton'
import { useState } from 'react'

interface AvailablePackagesProps {
  currentUser: User
  onConversationCreated?: () => void
}

const sizeLabels = {
  small: 'Petit (<5kg)',
  medium: 'Moyen (5-15kg)',
  large: 'Grand (15-30kg)',
  xlarge: 'Très Grand (30-50kg)',
  gp: 'GP - Gros Poids (>50kg)'
}

export function AvailablePackages({ currentUser, onConversationCreated }: AvailablePackagesProps) {
  const [packages] = useKV<PackageType[]>('packages', [])
  const [searchTerm, setSearchTerm] = useState('')

  const availablePackages = (packages || [])
    .filter(pkg => {
      if (pkg.senderId === currentUser.id) return false
      if (pkg.status !== 'pending') return false
      
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        return (
          pkg.title.toLowerCase().includes(search) ||
          pkg.origin.toLowerCase().includes(search) ||
          pkg.destination.toLowerCase().includes(search)
        )
      }
      
      return true
    })
    .sort((a, b) => new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime())

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Rechercher par titre, origine ou destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-3 pr-4">
          {availablePackages.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <PackageIcon size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Aucun colis trouvé pour cette recherche' 
                    : 'Aucun colis disponible pour le moment'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            availablePackages.map(pkg => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <PackageIcon size={20} className="text-primary" weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">{pkg.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{pkg.senderName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{pkg.description}</p>
                      </div>
                    </div>
                    <StartConversationButton
                      currentUser={currentUser}
                      otherUserId={pkg.senderId}
                      otherUserName={pkg.senderName}
                      otherUserRole="sender"
                      packageId={pkg.id}
                      onConversationCreated={onConversationCreated}
                      size="sm"
                    />
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
                      <span>{new Date(pkg.pickupDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{sizeLabels[pkg.size]}</Badge>
                      <span className="font-bold text-primary">{pkg.price.toLocaleString()} FCFA</span>
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
