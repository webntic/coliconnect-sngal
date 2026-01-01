import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { Crown, ShieldCheck, UserCircle, Truck } from '@phosphor-icons/react'
import { UserRole } from '@/lib/types'

export function RoleBadge({ showIcon = true, size = 'default' }: { showIcon?: boolean; size?: 'sm' | 'default' | 'lg' }) {
  const { currentUser } = useAuth()
  
  if (!currentUser) return null
  
  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'superadmin':
        return {
          label: 'Super Administrateur',
          icon: <Crown size={16} weight="fill" />,
          variant: 'default' as const,
          className: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-700'
        }
      case 'admin':
        return {
          label: 'Administrateur',
          icon: <ShieldCheck size={16} weight="fill" />,
          variant: 'destructive' as const,
          className: ''
        }
      case 'transporter':
        return {
          label: 'Transporteur',
          icon: <Truck size={16} />,
          variant: 'default' as const,
          className: ''
        }
      case 'sender':
      default:
        return {
          label: 'Expéditeur',
          icon: <UserCircle size={16} />,
          variant: 'secondary' as const,
          className: ''
        }
    }
  }
  
  const config = getRoleConfig(currentUser.role)
  
  return (
    <Badge 
      variant={config.variant}
      className={`gap-1.5 ${size === 'sm' ? 'text-xs py-0.5' : size === 'lg' ? 'text-base py-1.5 px-3' : ''} ${config.className}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </Badge>
  )
}
