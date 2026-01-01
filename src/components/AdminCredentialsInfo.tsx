import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Key, User, Shield, Info } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function AdminCredentialsInfo() {
  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={24} weight="fill" className="text-primary" />
            <CardTitle>Identifiants Administrateur</CardTitle>
          </div>
          <CardDescription>
            Utilisez ces identifiants pour accéder à l'espace administrateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
              <User size={20} className="text-primary mt-0.5" weight="fill" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Identifiant</p>
                <p className="text-base font-mono font-semibold">admin@mbstransport</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
              <Key size={20} className="text-primary mt-0.5" weight="fill" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Mot de passe</p>
                <p className="text-base font-mono font-semibold">MBS2024Admin!</p>
              </div>
            </div>
          </div>

          <Alert>
            <Info size={16} weight="fill" />
            <AlertDescription className="text-xs">
              <strong>Important :</strong> Pour des raisons de sécurité, changez ces identifiants par défaut 
              dès que possible en production. Les utilisateurs (expéditeurs et transporteurs) doivent créer 
              leurs propres comptes avec email et mot de passe.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comptes Utilisateurs</CardTitle>
          <CardDescription>
            Les expéditeurs et transporteurs créent leurs comptes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span><strong>Email</strong> : Adresse email valide</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span><strong>Mot de passe</strong> : Minimum 6 caractères</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span><strong>Informations</strong> : Nom, téléphone, type de compte</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
