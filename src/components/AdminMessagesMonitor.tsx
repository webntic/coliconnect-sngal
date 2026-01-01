import { useMemo, useState } from 'react'
import { Conversation, Message, User } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChatCircle, UserCircle, Truck, Calendar, Package as PackageIcon, MapPin } from '@phosphor-icons/react'

interface AdminMessagesMonitorProps {
  conversations: Conversation[]
  messages: Message[]
  users: User[]
  searchQuery: string
}

export function AdminMessagesMonitor({ conversations, messages, users, searchQuery }: AdminMessagesMonitorProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'messages' | 'unread'>('recent')

  const filteredAndSortedConversations = useMemo(() => {
    let filtered = conversations

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(conv =>
        conv.participant1Name.toLowerCase().includes(query) ||
        conv.participant2Name.toLowerCase().includes(query) ||
        conv.lastMessage?.toLowerCase().includes(query) ||
        conv.id.includes(query)
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'messages':
          const aMessages = messages.filter(m => m.conversationId === a.id).length
          const bMessages = messages.filter(m => m.conversationId === b.id).length
          return bMessages - aMessages
        case 'unread':
          return b.unreadCount - a.unreadCount
        case 'recent':
        default:
          if (!a.lastMessageTime) return 1
          if (!b.lastMessageTime) return -1
          return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
      }
    })

    return filtered
  }, [conversations, messages, searchQuery, sortBy])

  const getConversationMessageCount = (conversationId: string) => {
    return messages.filter(m => m.conversationId === conversationId).length
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ChatCircle size={24} />
              Moniteur de Messages
            </CardTitle>
            <CardDescription>
              {filteredAndSortedConversations.length} conversation{filteredAndSortedConversations.length > 1 ? 's' : ''} active{filteredAndSortedConversations.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Message le plus récent</SelectItem>
                <SelectItem value="messages">Nombre de messages</SelectItem>
                <SelectItem value="unread">Messages non lus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participants</TableHead>
                <TableHead>Dernier message</TableHead>
                <TableHead>Total messages</TableHead>
                <TableHead>Non lus</TableHead>
                <TableHead>Contexte</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedConversations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucune conversation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedConversations.map(conv => (
                  <TableRow key={conv.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {conv.participant1Role === 'sender' ? (
                              <UserCircle className="text-primary" size={18} />
                            ) : (
                              <Truck className="text-primary" size={18} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{conv.participant1Name}</p>
                            <Badge variant="outline" className="text-xs">
                              {conv.participant1Role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            {conv.participant2Role === 'sender' ? (
                              <UserCircle className="text-accent" size={18} />
                            ) : (
                              <Truck className="text-accent" size={18} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{conv.participant2Name}</p>
                            <Badge variant="outline" className="text-xs">
                              {conv.participant2Role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                        {conv.lastMessage || 'Aucun message'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <ChatCircle size={16} className="text-muted-foreground" />
                        <span className="font-medium">{getConversationMessageCount(conv.id)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {conv.unreadCount > 0 ? (
                        <Badge variant="destructive">
                          {conv.unreadCount}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {conv.packageId && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <PackageIcon size={12} />
                            <span>Colis: {conv.packageId.slice(0, 8)}</span>
                          </div>
                        )}
                        {conv.routeId && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin size={12} />
                            <span>Route: {conv.routeId.slice(0, 8)}</span>
                          </div>
                        )}
                        {!conv.packageId && !conv.routeId && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {conv.lastMessageTime ? (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span>
                            {new Date(conv.lastMessageTime).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
