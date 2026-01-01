import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldCheck, Copy, Key } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function SuperAdminCredentialsInfo() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copié dans le presse-papier`)
  }

  return (
    <Card className="border-destructive bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <ShieldCheck size={24} weight="fill" />
          Identifiants Super Administrateur
        </CardTitle>
        <CardDescription>
          Accès complet à la plateforme avec privilèges de gestion des admins et transporteurs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Key className="h-4 w-4" />
          <AlertDescription>
            Le Super Admin peut créer/supprimer des administrateurs, des transporteurs avec leurs identifiants, et supprimer toutes les données du site.
          </AlertDescription>
        </Alert>

        <div className="space-y-3 bg-card p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email (Identifiant)</p>
              <p className="text-lg font-mono font-semibold">superadmin@mbstransport.com</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard('superadmin@mbstransport.com', 'Identifiant')}
            >
              <Copy size={16} />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mot de passe</p>
              <p className="text-lg font-mono font-semibold">SuperMBS2024!</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard('SuperMBS2024!', 'Mot de passe')}
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>

        <Alert variant="destructive">
          <AlertDescription className="text-sm">
            ⚠️ Conservez ces identifiants en sécurité. Le Super Admin a un accès total à tous les comptes et données.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
