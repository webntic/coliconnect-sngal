import { UserRole } from './types'

export enum Permission {
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
  CHANGE_USER_ROLES = 'change_user_roles',
  
  VIEW_PACKAGES = 'view_packages',
  CREATE_PACKAGES = 'create_packages',
  EDIT_PACKAGES = 'edit_packages',
  DELETE_PACKAGES = 'delete_packages',
  
  VIEW_ROUTES = 'view_routes',
  CREATE_ROUTES = 'create_routes',
  EDIT_ROUTES = 'edit_routes',
  DELETE_ROUTES = 'delete_routes',
  VERIFY_ROUTES = 'verify_routes',
  
  VIEW_MESSAGES = 'view_messages',
  DELETE_MESSAGES = 'delete_messages',
  
  VIEW_REVIEWS = 'view_reviews',
  DELETE_REVIEWS = 'delete_reviews',
  
  VIEW_STATISTICS = 'view_statistics',
  VIEW_REVENUE = 'view_revenue',
  
  MANAGE_LOGO = 'manage_logo',
  MANAGE_SETTINGS = 'manage_settings',
  
  MANAGE_ADMINS = 'manage_admins',
  MANAGE_TRANSPORTERS = 'manage_transporters',
  VIEW_ACTIVITY_LOG = 'view_activity_log',
  MANAGE_DATA = 'manage_data',
  SYSTEM_SETTINGS = 'system_settings',
  
  VIEW_TRAVELERS = 'view_travelers',
  MANAGE_TRAVELERS = 'manage_travelers',
}

const rolePermissions: Record<UserRole, Permission[]> = {
  sender: [],
  
  transporter: [],
  
  admin: [
    Permission.VIEW_USERS,
    Permission.EDIT_USERS,
    Permission.CHANGE_USER_ROLES,
    
    Permission.VIEW_PACKAGES,
    Permission.EDIT_PACKAGES,
    Permission.DELETE_PACKAGES,
    
    Permission.VIEW_ROUTES,
    Permission.EDIT_ROUTES,
    Permission.DELETE_ROUTES,
    Permission.VERIFY_ROUTES,
    
    Permission.VIEW_MESSAGES,
    Permission.DELETE_MESSAGES,
    
    Permission.VIEW_REVIEWS,
    Permission.DELETE_REVIEWS,
    
    Permission.VIEW_STATISTICS,
    
    Permission.MANAGE_LOGO,
    Permission.MANAGE_SETTINGS,
    
    Permission.VIEW_TRAVELERS,
  ],
  
  superadmin: [
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.EDIT_USERS,
    Permission.DELETE_USERS,
    Permission.CHANGE_USER_ROLES,
    
    Permission.VIEW_PACKAGES,
    Permission.CREATE_PACKAGES,
    Permission.EDIT_PACKAGES,
    Permission.DELETE_PACKAGES,
    
    Permission.VIEW_ROUTES,
    Permission.CREATE_ROUTES,
    Permission.EDIT_ROUTES,
    Permission.DELETE_ROUTES,
    Permission.VERIFY_ROUTES,
    
    Permission.VIEW_MESSAGES,
    Permission.DELETE_MESSAGES,
    
    Permission.VIEW_REVIEWS,
    Permission.DELETE_REVIEWS,
    
    Permission.VIEW_STATISTICS,
    Permission.VIEW_REVENUE,
    
    Permission.MANAGE_LOGO,
    Permission.MANAGE_SETTINGS,
    
    Permission.MANAGE_ADMINS,
    Permission.MANAGE_TRANSPORTERS,
    Permission.VIEW_ACTIVITY_LOG,
    Permission.MANAGE_DATA,
    Permission.SYSTEM_SETTINGS,
    
    Permission.VIEW_TRAVELERS,
    Permission.MANAGE_TRAVELERS,
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = rolePermissions[role] || []
  return permissions.includes(permission)
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission))
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission))
}

export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || []
}

export function canManageUser(currentUserRole: UserRole, targetUserRole: UserRole): boolean {
  if (currentUserRole === 'superadmin') {
    return true
  }
  
  if (currentUserRole === 'admin') {
    return targetUserRole === 'sender' || targetUserRole === 'transporter'
  }
  
  return false
}

export function getEditableRoles(currentUserRole: UserRole): UserRole[] {
  if (currentUserRole === 'superadmin') {
    return ['sender', 'transporter', 'admin']
  }
  
  if (currentUserRole === 'admin') {
    return ['sender', 'transporter']
  }
  
  return []
}

export const permissionLabels: Record<Permission, string> = {
  [Permission.VIEW_USERS]: 'Voir les utilisateurs',
  [Permission.CREATE_USERS]: 'Créer des utilisateurs',
  [Permission.EDIT_USERS]: 'Modifier les utilisateurs',
  [Permission.DELETE_USERS]: 'Supprimer les utilisateurs',
  [Permission.CHANGE_USER_ROLES]: 'Changer les rôles',
  
  [Permission.VIEW_PACKAGES]: 'Voir les colis',
  [Permission.CREATE_PACKAGES]: 'Créer des colis',
  [Permission.EDIT_PACKAGES]: 'Modifier les colis',
  [Permission.DELETE_PACKAGES]: 'Supprimer les colis',
  
  [Permission.VIEW_ROUTES]: 'Voir les itinéraires',
  [Permission.CREATE_ROUTES]: 'Créer des itinéraires',
  [Permission.EDIT_ROUTES]: 'Modifier les itinéraires',
  [Permission.DELETE_ROUTES]: 'Supprimer les itinéraires',
  [Permission.VERIFY_ROUTES]: 'Vérifier les itinéraires',
  
  [Permission.VIEW_MESSAGES]: 'Voir les messages',
  [Permission.DELETE_MESSAGES]: 'Supprimer les messages',
  
  [Permission.VIEW_REVIEWS]: 'Voir les avis',
  [Permission.DELETE_REVIEWS]: 'Supprimer les avis',
  
  [Permission.VIEW_STATISTICS]: 'Voir les statistiques',
  [Permission.VIEW_REVENUE]: 'Voir les revenus',
  
  [Permission.MANAGE_LOGO]: 'Gérer le logo',
  [Permission.MANAGE_SETTINGS]: 'Gérer les paramètres',
  
  [Permission.MANAGE_ADMINS]: 'Gérer les administrateurs',
  [Permission.MANAGE_TRANSPORTERS]: 'Gérer les transporteurs',
  [Permission.VIEW_ACTIVITY_LOG]: 'Voir le journal d\'activité',
  [Permission.MANAGE_DATA]: 'Gérer les données',
  [Permission.SYSTEM_SETTINGS]: 'Paramètres système',
  
  [Permission.VIEW_TRAVELERS]: 'Voir les voyageurs',
  [Permission.MANAGE_TRAVELERS]: 'Gérer les voyageurs',
}
