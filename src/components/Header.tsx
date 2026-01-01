import { useState } from 'react'
import { User } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ChatCircle, Bell, SignOut, WhatsappLogo, Phone, List, X } from '@phosphor-icons/react'

interface HeaderProps {
  user: User
  onLogout: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const [logoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-gradient-to-r from-card via-card to-muted/30 backdrop-blur-xl supports-[backdrop-filter]:bg-card/90 shadow-sm">
      <div className="container flex h-[100px] md:h-[100px] sm:h-[80px] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <div className="h-14 md:h-20 w-auto flex items-center p-1 md:p-2 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex-shrink-0">
            <img 
              src={logoUrl} 
              alt="MBS Transport Logo" 
              className="h-full w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png'
              }}
            />
          </div>
          <div className="hidden lg:flex items-center gap-3 border-l border-border pl-4">
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
              <WhatsappLogo size={24} weight="fill" className="text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Service Client</p>
                <a 
                  href="https://wa.me/221773068652" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Phone size={14} weight="bold" />
                  +221 77 306 86 52
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
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
            <div className="hidden lg:block">
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

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <List size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Avatar className="h-14 w-14 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold leading-none text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="text-accent">⭐ {user.rating.toFixed(1)}</span> • {user.totalTransactions} trips
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-green-500/10 px-4 py-3 rounded-xl border border-green-500/20">
                <WhatsappLogo size={28} weight="fill" className="text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Service Client</p>
                  <a 
                    href="https://wa.me/221773068652" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Phone size={14} weight="bold" />
                    +221 77 306 86 52
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => setIsMobileMenuOpen(false)}>
                  <Bell size={20} />
                  <span>Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => setIsMobileMenuOpen(false)}>
                  <ChatCircle size={20} />
                  <span>Messages</span>
                </Button>

                <Button 
                  variant="destructive" 
                  className="w-full justify-start gap-3 h-12 mt-4" 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onLogout()
                  }}
                >
                  <SignOut size={20} />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
