import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Package, Route, Message, Conversation } from '@/lib/types'
import { Trash, Warning } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function SuperAdminDataManager() {
  const [packages] = useKV<Package[]>('packages', [])
  const [routes] = useKV<Route[]>('routes', [])
  const [messages] = useKV<Message[]>('messages', [])
  const [conversations] = useKV<Conversation[]>('conversations', [])
  const [departures] = useKV<any[]>('departures', [])

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAllPackages = async () => {
    if (!confirm('⚠️ ATTENTION : Ceci supprimera TOUS les colis de la plateforme. Cette action est irréversible. Continuer ?')) {
      return
    }

    setIsDeleting(true)
    try {
      await window.spark.kv.set('packages', [])
      toast.success('Tous les colis ont été supprimés')
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteAllRoutes = async () => {
    if (!confirm('⚠️ ATTENTION : Ceci supprimera TOUTES les routes de la plateforme. Cette action est irréversible. Continuer ?')) {
      return
    }

    setIsDeleting(true)
    try {
      await window.spark.kv.set('routes', [])
      toast.success('Toutes les routes ont été supprimées')
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteAllMessages = async () => {
    if (!confirm('⚠️ ATTENTION : Ceci supprimera TOUS les messages de la plateforme. Cette action est irréversible. Continuer ?')) {
      return
    }

    setIsDeleting(true)
    try {
      await window.spark.kv.set('messages', [])
      await window.spark.kv.set('conversations', [])
      toast.success('Tous les messages ont été supprimés')
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteAllDepartures = async () => {
    if (!confirm('⚠️ ATTENTION : Ceci supprimera TOUS les départs du planning. Cette action est irréversible. Continuer ?')) {
      return
    }

    setIsDeleting(true)
    try {
      await window.spark.kv.set('departures', [])
      toast.success('Tous les départs ont été supprimés')
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteEverything = async () => {
    if (!confirm('🚨 DANGER : Ceci supprimera TOUTES LES DONNÉES (colis, routes, messages, départs). Cette action est IRRÉVERSIBLE. Êtes-vous ABSOLUMENT sûr ?')) {
      return
    }

    const confirmation = prompt('Tapez "SUPPRIMER TOUT" pour confirmer :')
    if (confirmation !== 'SUPPRIMER TOUT') {
      toast.error('Suppression annulée')
      return
    }

    setIsDeleting(true)
    try {
      await window.spark.kv.set('packages', [])
      await window.spark.kv.set('routes', [])
      await window.spark.kv.set('messages', [])
      await window.spark.kv.set('conversations', [])
      await window.spark.kv.set('departures', [])
      toast.success('Toutes les données ont été supprimées')
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <Warning className="h-5 w-5" />
        <AlertDescription>
          Les suppressions effectuées depuis cette page sont irréversibles. Utilisez ces fonctionnalités avec une extrême prudence.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Colis</CardTitle>
            <CardDescription>
              {(packages || []).length} colis dans le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleDeleteAllPackages}
              disabled={isDeleting || (packages || []).length === 0}
              className="w-full gap-2"
            >
              <Trash size={18} />
              Supprimer tous les colis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Routes</CardTitle>
            <CardDescription>
              {(routes || []).length} routes dans le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleDeleteAllRoutes}
              disabled={isDeleting || (routes || []).length === 0}
              className="w-full gap-2"
            >
              <Trash size={18} />
              Supprimer toutes les routes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              {(messages || []).length} messages • {(conversations || []).length} conversations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleDeleteAllMessages}
              disabled={isDeleting || (messages || []).length === 0}
              className="w-full gap-2"
            >
              <Trash size={18} />
              Supprimer tous les messages
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Départs</CardTitle>
            <CardDescription>
              {(departures || []).length} départs dans le planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleDeleteAllDepartures}
              disabled={isDeleting || (departures || []).length === 0}
              className="w-full gap-2"
            >
              <Trash size={18} />
              Supprimer tous les départs
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Zone de Danger</CardTitle>
          <CardDescription>
            Supprimer toutes les données de la plateforme en une seule action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={handleDeleteEverything}
            disabled={isDeleting}
            className="w-full gap-2"
          >
            <Trash size={18} />
            Supprimer TOUTES les données
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
