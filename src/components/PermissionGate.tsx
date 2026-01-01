import { ReactNode } from 'react'
import { usePermissions } from '@/hooks/use-permissions'
import { Permission } from '@/lib/permissions'

interface PermissionGateProps {
  permission?: Permission
  permissions?: Permission[]
  requireAll?: boolean
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGate({
  permission,
  permissions,
  requireAll = false,
  children,
  fallback = null
}: PermissionGateProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions()
  
  let hasAccess = false
  
  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (permissions && permissions.length > 0) {
    if (requireAll) {
      hasAccess = hasAllPermissions(permissions)
    } else {
      hasAccess = hasAnyPermission(permissions)
    }
  }
  
  return hasAccess ? <>{children}</> : <>{fallback}</>
}
