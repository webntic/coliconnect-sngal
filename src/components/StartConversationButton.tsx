import { useKV } from '@github/spark/hooks'
import { Conversation, User, Package, Route } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ChatCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface StartConversationButtonProps {
  currentUser: User
  otherUserId: string
  otherUserName: string
  otherUserRole: 'sender' | 'transporter'
  packageId?: string
  routeId?: string
  onConversationCreated?: (conversationId: string) => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children?: React.ReactNode
}

export function StartConversationButton({
  currentUser,
  otherUserId,
  otherUserName,
  otherUserRole,
  packageId,
  routeId,
  onConversationCreated,
  variant = 'outline',
  size = 'default',
  children
}: StartConversationButtonProps) {
  const [conversations, setConversations] = useKV<Conversation[]>('conversations', [])

  const handleStartConversation = () => {
    if (otherUserId === currentUser.id) {
      toast.error('Vous ne pouvez pas discuter avec vous-même')
      return
    }

    const existingConversation = (conversations || []).find(
      conv =>
        (conv.participant1Id === currentUser.id && conv.participant2Id === otherUserId) ||
        (conv.participant1Id === otherUserId && conv.participant2Id === currentUser.id)
    )

    if (existingConversation) {
      onConversationCreated?.(existingConversation.id)
      return
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
    toast.success('Conversation créée')
    onConversationCreated?.(newConversation.id)
  }

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleStartConversation}
    >
      {children || (
        <>
          <ChatCircle className="h-4 w-4 mr-2" />
          Contacter
        </>
      )}
    </Button>
  )
}
