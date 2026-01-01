import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { usePermissions } from '@/hooks/use-permissions'
import { getRolePermissions, permissionLabels, Permission } from '@/lib/permissions'
import { ShieldCheck, CheckCircle, Crown } from '@phosphor-icons/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function PermissionsDisplay() {
  const { currentUser } = useAuth()
  const { isSuperAdmin, isAdmin } = usePermissions()
  
  if (!currentUser) return null
  
  const userPermissions = getRolePermissions(currentUser.role)
  
  const permissionGroups = {
    'Utilisateurs': [
      Permission.VIEW_USERS,
      Permission.CREATE_USERS,
      Permission.EDIT_USERS,
      Permission.DELETE_USERS,
      Permission.CHANGE_USER_ROLES,
    ],
    'Colis': [
      Permission.VIEW_PACKAGES,
      Permission.CREATE_PACKAGES,
      Permission.EDIT_PACKAGES,
      Permission.DELETE_PACKAGES,
    ],
    'Itinéraires': [
      Permission.VIEW_ROUTES,
      Permission.CREATE_ROUTES,
      Permission.EDIT_ROUTES,
      Permission.DELETE_ROUTES,
      Permission.VERIFY_ROUTES,
    ],
    'Communication': [
      Permission.VIEW_MESSAGES,
      Permission.DELETE_MESSAGES,
      Permission.VIEW_REVIEWS,
      Permission.DELETE_REVIEWS,
    ],
    'Statistiques': [
      Permission.VIEW_STATISTICS,
      Permission.VIEW_REVENUE,
    ],
    'Configuration': [
      Permission.MANAGE_LOGO,
      Permission.MANAGE_SETTINGS,
    ],
    'Voyageurs': [
      Permission.VIEW_TRAVELERS,
      Permission.MANAGE_TRAVELERS,
    ],
    'Administration (Super Admin uniquement)': [
      Permission.MANAGE_ADMINS,
      Permission.MANAGE_TRANSPORTERS,
      Permission.VIEW_ACTIVITY_LOG,
      Permission.MANAGE_DATA,
      Permission.SYSTEM_SETTINGS,
    ],
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {isSuperAdmin ? (
                <Crown className="text-yellow-600" weight="fill" />
              ) : (
                <ShieldCheck className="text-purple-600" weight="fill" />
              )}
              Permissions du Rôle
            </CardTitle>
            <CardDescription>
              Permissions accordées au rôle{' '}
              <Badge variant={isSuperAdmin ? 'default' : 'destructive'} className="ml-1">
                {isSuperAdmin ? 'Super Administrateur' : 'Administrateur'}
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {isSuperAdmin && (
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <Crown className="h-5 w-5 text-yellow-600" weight="fill" />
            <AlertTitle className="text-yellow-800 dark:text-yellow-200">Accès Total</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-300">
              En tant que Super Administrateur, vous avez accès complet à toutes les fonctionnalités de la plateforme, y compris la gestion des autres administrateurs.
            </AlertDescription>
          </Alert>
        )}
        
        {!isSuperAdmin && isAdmin && (
          <Alert className="border-purple-500/50 bg-purple-500/10">
            <ShieldCheck className="h-5 w-5 text-purple-600" weight="fill" />
            <AlertTitle className="text-purple-800 dark:text-purple-200">Administrateur Standard</AlertTitle>
            <AlertDescription className="text-purple-700 dark:text-purple-300">
              Vous avez accès à la plupart des fonctionnalités de gestion, à l'exception de la gestion des autres administrateurs.
            </AlertDescription>
          </Alert>
        )}
        
        {Object.entries(permissionGroups).map(([groupName, permissions]) => {
          const hasAnyInGroup = permissions.some(p => userPermissions.includes(p))
          
          if (!hasAnyInGroup) return null
          
          return (
            <div key={groupName} className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                {groupName}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {permissions.map(permission => {
                  const hasPermission = userPermissions.includes(permission)
                  
                  if (!hasPermission) return null
                  
                  return (
                    <div
                      key={permission}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <CheckCircle 
                        size={18} 
                        weight="fill" 
                        className="text-green-600 flex-shrink-0" 
                      />
                      <span className="text-sm font-medium">
                        {permissionLabels[permission]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            <strong>Total des permissions :</strong> {userPermissions.length} permission{userPermissions.length > 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
