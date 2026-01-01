import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignOut, Users, ShieldCheck, Trash, UserPlus } from '@phosphor-icons/react'
import { SuperAdminUsersManager } from '@/components/SuperAdminUsersManager'
import { SuperAdminAdminsManager } from '@/components/SuperAdminAdminsManager'
import { SuperAdminTransportersManager } from '@/components/SuperAdminTransportersManager'
import { SuperAdminDataManager } from '@/components/SuperAdminDataManager'
import logoImg from '@/assets/images/logo.png'

export function SuperAdminDashboard() {
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState('admins')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-24 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logoImg} alt="MBS Transport" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="text-destructive" weight="fill" size={28} />
                  Super Administrateur
                </h1>
                <p className="text-sm text-muted-foreground">Gestion complète de la plateforme</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" className="gap-2">
              <SignOut size={20} />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="admins" className="gap-2">
              <ShieldCheck size={18} />
              Administrateurs
            </TabsTrigger>
            <TabsTrigger value="transporters" className="gap-2">
              <UserPlus size={18} />
              Transporteurs
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users size={18} />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Trash size={18} />
              Données
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Administrateurs</CardTitle>
                <CardDescription>
                  Créer, modifier et supprimer les comptes administrateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SuperAdminAdminsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transporters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Transporteurs</CardTitle>
                <CardDescription>
                  Créer des transporteurs avec identifiants et mots de passe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SuperAdminTransportersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <CardDescription>
                  Voir et gérer tous les utilisateurs de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SuperAdminUsersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Données</CardTitle>
                <CardDescription>
                  Supprimer les colis, routes, messages et autres données
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SuperAdminDataManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
