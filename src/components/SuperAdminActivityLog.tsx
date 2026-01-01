import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { MagnifyingGlass, UserPlus, Trash, Key, Package, MapPin, ChatCircleDots } from '@phosphor-icons/react'

export interface ActivityLogEntry {
  id: string
  timestamp: string
  action: 'user_created' | 'user_deleted' | 'password_reset' | 'package_created' | 'package_deleted' | 'route_created' | 'route_deleted' | 'message_sent' | 'data_deleted'
  actor: string
  target?: string
  details?: string
}

export function SuperAdminActivityLog() {
  const [activityLog, setActivityLog] = useKV<ActivityLogEntry[]>('activity-log', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState<string>('all')

  const allLogs = activityLog || []

  const filteredLogs = allLogs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.target?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (log.details?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filterAction === 'all' || log.action === filterAction
    return matchesSearch && matchesFilter
  })

  const sortedLogs = filteredLogs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'user_created':
        return <UserPlus className="text-green-600" size={18} />
      case 'user_deleted':
        return <Trash className="text-red-600" size={18} />
      case 'password_reset':
        return <Key className="text-blue-600" size={18} />
      case 'package_created':
        return <Package className="text-green-600" size={18} />
      case 'package_deleted':
        return <Trash className="text-red-600" size={18} />
      case 'route_created':
        return <MapPin className="text-green-600" size={18} />
      case 'route_deleted':
        return <Trash className="text-red-600" size={18} />
      case 'message_sent':
        return <ChatCircleDots className="text-blue-600" size={18} />
      case 'data_deleted':
        return <Trash className="text-red-600" size={18} />
      default:
        return null
    }
  }

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'user_created':
        return 'Utilisateur créé'
      case 'user_deleted':
        return 'Utilisateur supprimé'
      case 'password_reset':
        return 'Mot de passe réinitialisé'
      case 'package_created':
        return 'Colis créé'
      case 'package_deleted':
        return 'Colis supprimé'
      case 'route_created':
        return 'Route créée'
      case 'route_deleted':
        return 'Route supprimée'
      case 'message_sent':
        return 'Message envoyé'
      case 'data_deleted':
        return 'Données supprimées'
      default:
        return action
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes('deleted')) return 'destructive'
    if (action.includes('created')) return 'default'
    return 'secondary'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Rechercher dans le journal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrer par action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les actions</SelectItem>
            <SelectItem value="user_created">Utilisateur créé</SelectItem>
            <SelectItem value="user_deleted">Utilisateur supprimé</SelectItem>
            <SelectItem value="password_reset">Mot de passe réinitialisé</SelectItem>
            <SelectItem value="data_deleted">Données supprimées</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground">
        {sortedLogs.length} activité(s) enregistrée(s)
      </div>

      {sortedLogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucune activité enregistrée
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedLogs.map((log) => (
            <Card key={log.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getActionIcon(log.action)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Badge variant={getActionColor(log.action)}>
                          {getActionLabel(log.action)}
                        </Badge>
                        <span className="text-sm font-medium">{log.actor}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {log.target && (
                      <p className="text-sm text-muted-foreground">
                        Cible: <span className="font-medium">{log.target}</span>
                      </p>
                    )}
                    {log.details && (
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
