import { useAuth } from './use-auth'
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions, canManageUser, getEditableRoles } from '@/lib/permissions'
import { UserRole } from '@/lib/types'

export function usePermissions() {
  const { currentUser } = useAuth()
  
  const checkPermission = (permission: Permission): boolean => {
    if (!currentUser) return false
    return hasPermission(currentUser.role, permission)
  }
  
  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!currentUser) return false
    return hasAnyPermission(currentUser.role, permissions)
  }
  
  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!currentUser) return false
    return hasAllPermissions(currentUser.role, permissions)
  }
  
  const checkCanManageUser = (targetUserRole: UserRole): boolean => {
    if (!currentUser) return false
    return canManageUser(currentUser.role, targetUserRole)
  }
  
  const getAvailableRoles = (): UserRole[] => {
    if (!currentUser) return []
    return getEditableRoles(currentUser.role)
  }
  
  return {
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    canManageUser: checkCanManageUser,
    getEditableRoles: getAvailableRoles,
    isSuperAdmin: currentUser?.role === 'superadmin',
    isAdmin: currentUser?.role === 'admin',
    currentRole: currentUser?.role
  }
}
