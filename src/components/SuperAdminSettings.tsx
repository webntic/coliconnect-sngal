import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { FloppyDisk, Warning, Bell, Globe } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface PlatformSettings {
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  defaultKgPrice: number
  platformCommission: number
  supportEmail: string
  supportPhone: string
  maintenanceMessage: string
  maxPackageWeight: number
  minPasswordLength: number
}

export function SuperAdminSettings() {
  const defaultSettings: PlatformSettings = {
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    defaultKgPrice: 5000,
    platformCommission: 10,
    supportEmail: 'support@mbstransport.com',
    supportPhone: '+221 77 306 86 52',
    maintenanceMessage: 'La plateforme est en maintenance. Nous serons de retour bientôt.',
    maxPackageWeight: 100,
    minPasswordLength: 6
  }

  const [settings, setSettings] = useKV<PlatformSettings>('platform-settings', defaultSettings)

  const [localSettings, setLocalSettings] = useState<PlatformSettings>(settings || defaultSettings)

  const handleSave = () => {
    setSettings(localSettings)
    toast.success('Paramètres enregistrés avec succès')
  }

  const handleReset = () => {
    setLocalSettings(settings || defaultSettings)
    toast.info('Modifications annulées')
  }

  return (
    <div className="space-y-6">
      {localSettings.maintenanceMode && (
        <Alert variant="destructive">
          <Warning className="h-5 w-5" />
          <AlertDescription>
            Le mode maintenance est actuellement activé. Les utilisateurs ne peuvent pas accéder à la plateforme.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={20} />
            Statut de la plateforme
          </CardTitle>
          <CardDescription>
            Contrôler l'accessibilité et les fonctionnalités de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance-mode">Mode Maintenance</Label>
              <p className="text-sm text-muted-foreground">
                Désactiver temporairement l'accès à la plateforme
              </p>
            </div>
            <Switch
              id="maintenance-mode"
              checked={localSettings.maintenanceMode}
              onCheckedChange={(checked) => 
                setLocalSettings({ ...localSettings, maintenanceMode: checked })
              }
            />
          </div>

          {localSettings.maintenanceMode && (
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Message de maintenance</Label>
              <Textarea
                id="maintenance-message"
                value={localSettings.maintenanceMessage}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, maintenanceMessage: e.target.value })
                }
                placeholder="Message affiché aux utilisateurs"
                rows={3}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="registration-enabled">Inscriptions ouvertes</Label>
              <p className="text-sm text-muted-foreground">
                Autoriser les nouveaux utilisateurs à s'inscrire
              </p>
            </div>
            <Switch
              id="registration-enabled"
              checked={localSettings.registrationEnabled}
              onCheckedChange={(checked) => 
                setLocalSettings({ ...localSettings, registrationEnabled: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </CardTitle>
          <CardDescription>
            Configurer les notifications système
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Envoyer des emails de confirmation et d'alerte
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={localSettings.emailNotifications}
              onCheckedChange={(checked) => 
                setLocalSettings({ ...localSettings, emailNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">Notifications SMS</Label>
              <p className="text-sm text-muted-foreground">
                Envoyer des SMS pour les événements importants
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={localSettings.smsNotifications}
              onCheckedChange={(checked) => 
                setLocalSettings({ ...localSettings, smsNotifications: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tarification</CardTitle>
          <CardDescription>
            Configurer les prix par défaut et les commissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-kg-price">Prix par kg par défaut (FCFA)</Label>
              <Input
                id="default-kg-price"
                type="number"
                value={localSettings.defaultKgPrice}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, defaultKgPrice: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-commission">Commission plateforme (%)</Label>
              <Input
                id="platform-commission"
                type="number"
                min="0"
                max="100"
                value={localSettings.platformCommission}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, platformCommission: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support Client</CardTitle>
          <CardDescription>
            Coordonnées du support technique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="support-email">Email de support</Label>
              <Input
                id="support-email"
                type="email"
                value={localSettings.supportEmail}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, supportEmail: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-phone">Téléphone de support</Label>
              <Input
                id="support-phone"
                value={localSettings.supportPhone}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, supportPhone: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limites et Restrictions</CardTitle>
          <CardDescription>
            Définir les limites de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="max-package-weight">Poids maximum par colis (kg)</Label>
              <Input
                id="max-package-weight"
                type="number"
                min="1"
                value={localSettings.maxPackageWeight}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, maxPackageWeight: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-password-length">Longueur minimum mot de passe</Label>
              <Input
                id="min-password-length"
                type="number"
                min="6"
                max="20"
                value={localSettings.minPasswordLength}
                onChange={(e) => 
                  setLocalSettings({ ...localSettings, minPasswordLength: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleReset}>
          Annuler
        </Button>
        <Button onClick={handleSave} className="gap-2">
          <FloppyDisk size={18} />
          Enregistrer les paramètres
        </Button>
      </div>
    </div>
  )
}
