import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Message, Conversation, User } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  PaperPlaneRight, 
  X, 
  User as UserIcon,
  Package as PackageIcon,
  MapPin
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface MessagingSystemProps {
  currentUser: User
  onClose?: () => void
}

export function MessagingSystem({ currentUser, onClose }: MessagingSystemProps) {
  const [conversations, setConversations] = useKV<Conversation[]>('conversations', [])
  const [messages, setMessages] = useKV<Message[]>('messages', [])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const userConversations = (conversations || []).filter(
    conv => conv.participant1Id === currentUser.id || conv.participant2Id === currentUser.id
  ).sort((a, b) => {
    const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0
    const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0
    return timeB - timeA
  })

  const selectedMessages = selectedConversation 
    ? (messages || [])
        .filter(msg => msg.conversationId === selectedConversation.id)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : []

  useEffect(() => {
    if (selectedConversation && selectedMessages.length > 0) {
      const unreadMessages = selectedMessages.filter(
        msg => msg.receiverId === currentUser.id && !msg.read
      )
      
      if (unreadMessages.length > 0) {
        setMessages((current) =>
          (current || []).map(msg =>
            msg.conversationId === selectedConversation.id && 
            msg.receiverId === currentUser.id && 
            !msg.read
              ? { ...msg, read: true }
              : msg
          )
        )

        setConversations((current) =>
          (current || []).map(conv =>
            conv.id === selectedConversation.id
              ? { ...conv, unreadCount: 0 }
              : conv
          )
        )
      }
    }
  }, [selectedConversation, selectedMessages.length, currentUser.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedMessages])

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    const otherParticipant = selectedConversation.participant1Id === currentUser.id
      ? {
          id: selectedConversation.participant2Id,
          name: selectedConversation.participant2Name,
          role: selectedConversation.participant2Role
        }
      : {
          id: selectedConversation.participant1Id,
          name: selectedConversation.participant1Name,
          role: selectedConversation.participant1Role
        }

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      receiverId: otherParticipant.id,
      content: messageText.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      packageId: selectedConversation.packageId,
      routeId: selectedConversation.routeId
    }

    setMessages((current) => [...(current || []), newMessage])

    setConversations((current) =>
      (current || []).map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: messageText.trim(),
              lastMessageTime: newMessage.timestamp,
              unreadCount: conv.participant1Id === currentUser.id 
                ? conv.unreadCount 
                : conv.unreadCount + 1
            }
          : conv
      )
    )

    setMessageText('')
  }

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participant1Id === currentUser.id
      ? {
          id: conversation.participant2Id,
          name: conversation.participant2Name,
          role: conversation.participant2Role
        }
      : {
          id: conversation.participant1Id,
          name: conversation.participant1Name,
          role: conversation.participant1Role
        }
  }

  const totalUnread = userConversations.reduce((sum, conv) => {
    if (conv.participant1Id === currentUser.id || conv.participant2Id === currentUser.id) {
      return sum + conv.unreadCount
    }
    return sum
  }, 0)

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      <Card className="w-full md:w-80 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Messages</CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {totalUnread > 0 && (
            <Badge variant="default" className="w-fit">
              {totalUnread} non lu{totalUnread > 1 ? 's' : ''}
            </Badge>
          )}
        </CardHeader>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {userConversations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucune conversation
              </p>
            ) : (
              userConversations.map((conv) => {
                const other = getOtherParticipant(conv)
                const isSelected = selectedConversation?.id === conv.id
                
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors hover:bg-accent",
                      isSelected && "bg-accent"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className={cn(
                          other.role === 'transporter' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-accent/50 text-accent-foreground'
                        )}>
                          {other.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-medium text-sm truncate">
                            {other.name}
                          </p>
                          {conv.unreadCount > 0 && (
                            <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className="mb-1 text-xs"
                        >
                          {other.role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                        </Badge>
                        {conv.lastMessage && (
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                        )}
                        {conv.lastMessageTime && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(conv.lastMessageTime), 'dd/MM/yyyy HH:mm')}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={cn(
                    getOtherParticipant(selectedConversation).role === 'transporter'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-accent/50 text-accent-foreground'
                  )}>
                    {getOtherParticipant(selectedConversation).name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {getOtherParticipant(selectedConversation).name}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {getOtherParticipant(selectedConversation).role === 'sender' 
                      ? 'Expéditeur' 
                      : 'Transporteur'}
                  </Badge>
                </div>
              </div>
              {(selectedConversation.packageId || selectedConversation.routeId) && (
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  {selectedConversation.packageId && (
                    <div className="flex items-center gap-1">
                      <PackageIcon className="h-3 w-3" />
                      <span>Colis #{selectedConversation.packageId.slice(-4)}</span>
                    </div>
                  )}
                  {selectedConversation.routeId && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>Itinéraire #{selectedConversation.routeId.slice(-4)}</span>
                    </div>
                  )}
                </div>
              )}
            </CardHeader>
            <Separator />
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucun message. Commencez la conversation !
                  </p>
                ) : (
                  selectedMessages.map((msg) => {
                    const isOwnMessage = msg.senderId === currentUser.id
                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-2",
                          isOwnMessage ? "justify-end" : "justify-start"
                        )}
                      >
                        {!isOwnMessage && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="text-xs bg-accent/50">
                              {msg.senderName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "max-w-[70%] rounded-lg p-3 space-y-1",
                            isOwnMessage
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                          <p
                            className={cn(
                              "text-xs",
                              isOwnMessage
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {format(new Date(msg.timestamp), 'HH:mm')}
                          </p>
                        </div>
                        {isOwnMessage && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {currentUser.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <Separator />
            <CardContent className="p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex gap-2"
              >
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={!messageText.trim()}
                  size="icon"
                >
                  <PaperPlaneRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <UserIcon className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-sm">Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </Card>
    </div>
  )
}
