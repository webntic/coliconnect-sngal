import { useState, useRef } from 'react'
import { User } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, Star, CheckCircle, User as UserIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface TransporterProfileProps {
  user: User
  onUpdateProfile: (updates: Partial<User>) => void
}

export function TransporterProfile({ user, onUpdateProfile }: TransporterProfileProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La taille de l\'image ne doit pas dépasser 5 MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image valide')
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onUpdateProfile({ avatar: result })
      setIsUploading(false)
      toast.success('Photo de profil mise à jour avec succès')
    }
    reader.onerror = () => {
      toast.error('Erreur lors du chargement de l\'image')
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mon Profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={handleImageClick}
              disabled={isUploading}
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
            >
              <Camera size={32} weight="fill" className="text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profile-photo-upload"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Cliquez sur la photo pour la modifier
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Format JPG, PNG ou WEBP (Max 5 MB)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom Complet</Label>
            <Input
              id="name"
              value={user.name}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={user.phone}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star size={20} weight="fill" className="text-amber-500" />
                <span className="font-semibold text-lg">{user.rating.toFixed(1)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {user.totalTransactions} transaction{user.totalTransactions !== 1 ? 's' : ''}
              </div>
            </div>
            {user.verified && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={20} weight="fill" />
                <span className="text-sm font-medium">Vérifié</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
