import { useKV } from '@github/spark/hooks'
import { Conversation, Message, User } from '@/lib/types'

export function useMessaging(currentUser: User | null) {
  const [conversations, setConversations] = useKV<Conversation[]>('conversations', [])
  const [messages, setMessages] = useKV<Message[]>('messages', [])

  const getUnreadCount = () => {
    if (!currentUser) return 0
    
    return (conversations || [])
      .filter(conv => 
        conv.participant1Id === currentUser.id || 
        conv.participant2Id === currentUser.id
      )
      .reduce((sum, conv) => sum + conv.unreadCount, 0)
  }

  const createConversation = (
    otherUserId: string,
    otherUserName: string,
    otherUserRole: 'sender' | 'transporter',
    packageId?: string,
    routeId?: string
  ): Conversation | null => {
    if (!currentUser) return null

    const existingConversation = (conversations || []).find(
      conv =>
        (conv.participant1Id === currentUser.id && conv.participant2Id === otherUserId) ||
        (conv.participant1Id === otherUserId && conv.participant2Id === currentUser.id)
    )

    if (existingConversation) {
      return existingConversation
    }

    const newConversation: Conversation = {
      id: Date.now().toString(),
      participant1Id: currentUser.id,
      participant1Name: currentUser.name,
      participant1Role: currentUser.role,
      participant2Id: otherUserId,
      participant2Name: otherUserName,
      participant2Role: otherUserRole,
      unreadCount: 0,
      packageId,
      routeId,
      createdAt: new Date().toISOString()
    }

    setConversations((current) => [...(current || []), newConversation])
    return newConversation
  }

  return {
    conversations: conversations || [],
    messages: messages || [],
    getUnreadCount,
    createConversation,
    setConversations,
    setMessages
  }
}
