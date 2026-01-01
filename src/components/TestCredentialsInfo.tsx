import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Package, Truck, Info } from '@phosphor-icons/react'

export function TestCredentialsInfo() {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info size={24} weight="fill" className="text-primary" />
          <CardTitle className="text-lg">Comptes de Démonstration</CardTitle>
        </div>
        <CardDescription>
          Utilisez ces identifiants pour tester la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield size={20} weight="fill" className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1">Administrateur</div>
              <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                <div>📧 admin@mbstransport.com</div>
                <div>🔑 MBS2024Admin!</div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package size={20} weight="fill" className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1">Client (Expéditeur)</div>
              <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                <div>📧 client@mbstransport.com</div>
                <div>👤 Amadou Diallo</div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck size={20} weight="fill" className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1">Transporteur</div>
              <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                <div>📧 transporteur@mbstransport.com</div>
                <div>👤 Moussa Sarr</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t text-xs text-muted-foreground">
          💡 <strong>Astuce:</strong> Utilisez les boutons "Accès Rapide" pour une connexion instantanée sans saisir les identifiants
        </div>
      </CardContent>
    </Card>
  )
}
