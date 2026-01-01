import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Package as PackageIcon, 
  MapPin, 
  ChatCircle, 
  Star, 
  TrendUp,
  CheckCircle,
  Clock,
  Truck,
  UserCircle,
  CurrencyDollar
} from '@phosphor-icons/react'

interface AdminStatsProps {
  stats: {
    totalUsers: number
    senders: number
    transporters: number
    verifiedUsers: number
    totalPackages: number
    pendingPackages: number
    activePackages: number
    completedPackages: number
    totalRoutes: number
    activeRoutes: number
    totalMessages: number
    totalConversations: number
    totalReviews: number
    avgRating: number
    totalRevenue: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: 'Total Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      subStats: [
        { label: 'Expéditeurs', value: stats.senders, icon: UserCircle },
        { label: 'Transporteurs', value: stats.transporters, icon: Truck },
        { label: 'Vérifiés', value: stats.verifiedUsers, icon: CheckCircle }
      ]
    },
    {
      title: 'Colis',
      value: stats.totalPackages,
      icon: PackageIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      subStats: [
        { label: 'En attente', value: stats.pendingPackages, icon: Clock },
        { label: 'Actifs', value: stats.activePackages, icon: TrendUp },
        { label: 'Livrés', value: stats.completedPackages, icon: CheckCircle }
      ]
    },
    {
      title: 'Itinéraires',
      value: stats.totalRoutes,
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      subStats: [
        { label: 'Actifs', value: stats.activeRoutes, icon: TrendUp },
        { label: 'Total', value: stats.totalRoutes, icon: MapPin }
      ]
    },
    {
      title: 'Communications',
      value: stats.totalConversations,
      icon: ChatCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subStats: [
        { label: 'Conversations', value: stats.totalConversations, icon: ChatCircle },
        { label: 'Messages', value: stats.totalMessages, icon: ChatCircle }
      ]
    },
    {
      title: 'Avis',
      value: stats.totalReviews,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      subStats: [
        { label: 'Note moyenne', value: stats.avgRating.toFixed(1), icon: Star }
      ]
    },
    {
      title: 'Revenus',
      value: `${(stats.totalRevenue / 1000).toFixed(0)}K FCFA`,
      icon: CurrencyDollar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      subStats: [
        { label: 'Colis livrés', value: stats.completedPackages, icon: CheckCircle }
      ]
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={stat.color} size={20} weight="bold" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="grid grid-cols-2 gap-3">
                {stat.subStats.map((sub, idx) => {
                  const SubIcon = sub.icon
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <SubIcon className="text-muted-foreground" size={14} />
                      <span className="text-muted-foreground">{sub.label}:</span>
                      <span className="font-semibold">{sub.value}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
