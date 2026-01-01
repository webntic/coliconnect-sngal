import { User } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Package, Truck, ChatCircle, Bell, SignOut } from '@phosphor-icons/react'

interface HeaderProps {
  user: User
  onLogout: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')
  
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-[100px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-20 w-auto flex items-center">
            <img 
              src={logoUrl} 
              alt="MBS Transport Logo" 
              className="h-full w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png'
              }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">MBS Transport</h1>
            <p className="text-xs text-muted-foreground capitalize">{user.role} Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <ChatCircle size={20} />
          </Button>

          <div className="flex items-center gap-3 ml-2 pl-3 border-l">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                ⭐ {user.rating.toFixed(1)} • {user.totalTransactions} trips
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onLogout} className="ml-1">
            <SignOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}
