import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, MapPin, ChatCircleDots, ShieldCheck, UserPlus, TrendUp, Calendar } from '@phosphor-icons/react'
import { User, Package as PackageType, Route, Message, Conversation } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export function SuperAdminStats() {
  const [users] = useKV<User[]>('users', [])
  const [packages] = useKV<PackageType[]>('packages', [])
  const [routes] = useKV<Route[]>('routes', [])
  const [messages] = useKV<Message[]>('messages', [])
  const [conversations] = useKV<Conversation[]>('conversations', [])
  const [departures] = useKV<any[]>('departures', [])

  const allUsers = users || []
  const admins = allUsers.filter(u => u.role === 'admin')
  const transporters = allUsers.filter(u => u.role === 'transporter')
  const senders = allUsers.filter(u => u.role === 'sender')
  const verifiedUsers = allUsers.filter(u => u.verified)

  const allPackages = packages || []
  const pendingPackages = allPackages.filter(p => p.status === 'pending')
  const activePackages = allPackages.filter(p => p.status === 'in_transit' || p.status === 'matched')
  const deliveredPackages = allPackages.filter(p => p.status === 'delivered')

  const allRoutes = routes || []

  const allMessages = messages || []
  const allConversations = conversations || []

  const allDepartures = departures || []

  const verificationRate = allUsers.length > 0 ? (verifiedUsers.length / allUsers.length) * 100 : 0
  const deliveryRate = allPackages.length > 0 ? (deliveredPackages.length / allPackages.length) * 100 : 0

  const recentUsers = allUsers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="text-primary" size={24} weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{allUsers.length}</div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <TrendUp size={14} className="text-green-600" />
              <span>{verifiedUsers.length} vérifiés ({verificationRate.toFixed(0)}%)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colis</CardTitle>
            <Package className="text-secondary" size={24} weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{allPackages.length}</div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <Badge variant="outline" className="text-xs">{activePackages.length} actifs</Badge>
              <Badge variant="default" className="text-xs">{deliveredPackages.length} livrés</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Routes</CardTitle>
            <MapPin className="text-accent" size={24} weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{allRoutes.length}</div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>{allRoutes.length} routes disponibles</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <ChatCircleDots className="text-blue-500" size={24} weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{allMessages.length}</div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>{allConversations.length} conversations</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
            <ShieldCheck className="text-muted-foreground" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{admins.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transporteurs</CardTitle>
            <UserPlus className="text-muted-foreground" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transporters.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="text-muted-foreground" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senders.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Taux de vérification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={verificationRate} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{verifiedUsers.length} / {allUsers.length} utilisateurs vérifiés</span>
              <span className="font-semibold">{verificationRate.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Taux de livraison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={deliveryRate} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{deliveredPackages.length} / {allPackages.length} colis livrés</span>
              <span className="font-semibold">{deliveryRate.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Utilisateurs Récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Aucun utilisateur récent</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.role === 'transporter' ? 'default' : 'secondary'}>
                      {user.role === 'transporter' ? 'Transporteur' : 'Client'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={20} />
            Départs Planifiés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{allDepartures.length}</div>
          <p className="text-sm text-muted-foreground mt-1">départs dans le planning</p>
        </CardContent>
      </Card>
    </div>
  )
}
