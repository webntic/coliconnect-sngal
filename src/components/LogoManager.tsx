import { useState, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Image, Upload, X, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function LogoManager() {
  const [logoUrl, setLogoUrl, deleteLogoUrl] = useKV<string>('company-logo', 'https://i.postimg.cc/15Sf1d1n/mbs-logo.png')
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La taille du fichier ne doit pas dépasser 5 MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveLogo = () => {
    if (!previewUrl) {
      toast.error('Aucune image sélectionnée')
      return
    }

    setIsUploading(true)
    setTimeout(() => {
      setLogoUrl(previewUrl)
      setPreviewUrl('')
      setIsUploading(false)
      toast.success('Logo mis à jour avec succès!')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 500)
  }

  const handleCancelPreview = () => {
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleResetLogo = () => {
    setLogoUrl('https://i.postimg.cc/15Sf1d1n/mbs-logo.png')
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.success('Logo réinitialisé à la valeur par défaut')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image size={24} />
          Gestion du Logo
        </CardTitle>
        <CardDescription>
          Importez et modifiez le logo de l'entreprise (PNG, JPG, SVG - Max 5 MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="logo-upload" className="text-sm font-medium">
              Logo Actuel
            </Label>
            <div className="mt-2 p-6 border-2 border-dashed rounded-lg bg-muted/30 flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Logo MBS Transport"
                className="max-h-32 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/200x80/e0e0e0/666666?text=Logo'
                }}
              />
            </div>
          </div>

          {previewUrl && (
            <div>
              <Label className="text-sm font-medium">
                Aperçu du Nouveau Logo
              </Label>
              <div className="mt-2 p-6 border-2 border-primary rounded-lg bg-primary/5 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Aperçu du logo"
                  className="max-h-32 w-auto object-contain"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="logo-upload" className="text-sm font-medium">
              Importer un Nouveau Logo
            </Label>
            <div className="flex gap-2">
              <Input
                id="logo-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={18} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Formats acceptés: PNG, JPG, SVG • Taille maximale: 5 MB
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          {previewUrl ? (
            <>
              <Button
                onClick={handleSaveLogo}
                disabled={isUploading}
                className="flex-1"
              >
                <Check size={18} />
                {isUploading ? 'Enregistrement...' : 'Enregistrer le Logo'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelPreview}
                disabled={isUploading}
              >
                <X size={18} />
                Annuler
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={handleResetLogo}
              className="w-full"
            >
              Réinitialiser au Logo par Défaut
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
