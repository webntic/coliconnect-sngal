import { User } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Package, Truck, ChatCircle, Bell, SignOut, WhatsappLogo, Phone } from '@phosphor-icons/react'

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
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-gradient-to-r from-card via-card to-muted/30 backdrop-blur-xl supports-[backdrop-filter]:bg-card/90 shadow-sm">
      <div className="container flex h-[100px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-auto flex items-center p-2 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
            <img 
              src={logoUrl} 
              alt="MBS Transport Logo" 
              className="h-full w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png'
              }}
            />
          </div>
          <div className="flex items-center gap-3 border-l border-border pl-4">
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
              <WhatsappLogo size={24} weight="fill" className="text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Service Client</p>
                <a 
                  href="tel:+221730615115" 
                  className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Phone size={14} weight="bold" />
                  +221 73 061 51 15
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
            <ChatCircle size={20} />
          </Button>

          <div className="flex items-center gap-3 ml-2 pl-3 border-l border-border">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold leading-none text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className="text-accent">⭐ {user.rating.toFixed(1)}</span> • {user.totalTransactions} trips
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onLogout} className="ml-1 hover:bg-destructive/10 hover:text-destructive transition-colors">
            <SignOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}
