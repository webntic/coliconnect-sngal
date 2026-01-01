import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Key, User, Shield, Info, Package, Truck } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function AdminCredentialsInfo() {
  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={24} weight="fill" className="text-primary" />
            <CardTitle>Comptes de Démonstration</CardTitle>
          </div>
          <CardDescription>
            Utilisez ces identifiants pour tester la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-background rounded-lg border-2 border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={20} className="text-primary" weight="fill" />
                <p className="font-semibold text-sm">Administrateur</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <User size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Identifiant</p>
                    <p className="text-sm font-mono font-semibold">admin@mbstransport.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Key size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mot de passe</p>
                    <p className="text-sm font-mono font-semibold">MBS2024Admin!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Package size={20} className="text-primary" weight="fill" />
                <p className="font-semibold text-sm">Client (Expéditeur)</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-mono">📧 client@mbstransport.com</p>
                <p className="text-muted-foreground">👤 Amadou Diallo</p>
                <p className="text-muted-foreground">📱 +221 77 123 45 67</p>
              </div>
            </div>

            <div className="p-4 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={20} className="text-primary" weight="fill" />
                <p className="font-semibold text-sm">Transporteur</p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-mono">📧 transporteur@mbstransport.com</p>
                <p className="text-muted-foreground">👤 Moussa Sarr</p>
                <p className="text-muted-foreground">📱 +221 77 987 65 43</p>
              </div>
            </div>
          </div>

          <Alert>
            <Info size={16} weight="fill" />
            <AlertDescription className="text-xs">
              <strong>Astuce :</strong> Utilisez les boutons "Accès Rapide" sur la page d'accueil 
              pour une connexion instantanée sans saisir les identifiants.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Création de Nouveaux Comptes</CardTitle>
          <CardDescription>
            Les utilisateurs peuvent créer leurs propres comptes
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

          <Alert className="mt-4">
            <Info size={16} weight="fill" />
            <AlertDescription className="text-xs">
              <strong>Sécurité :</strong> En production, changez les identifiants par défaut et 
              implémentez un système de hachage de mot de passe robuste (bcrypt, argon2).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
