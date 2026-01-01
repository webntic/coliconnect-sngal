# Système de Permissions MBS Transport

## Vue d'ensemble

Le système de permissions permet un contrôle d'accès basé sur les rôles (RBAC - Role-Based Access Control) pour gérer les fonctionnalités disponibles selon le niveau d'administration.

## Rôles Disponibles

### 1. Super Administrateur (superadmin)
**Accès complet** - Toutes les permissions

#### Permissions exclusives :
- Gérer les administrateurs (création, modification, suppression)
- Gérer les transporteurs avec assignation d'identifiants
- Voir le journal d'activité du système
- Gérer toutes les données de la plateforme
- Paramètres système avancés
- Voir les revenus détaillés

#### Identifiants de connexion :
- Email: `superadmin@mbstransport.com`
- Mot de passe: `SuperMBS2024!`

### 2. Administrateur (admin)
**Accès de gestion standard** - Permissions de gestion courantes

#### Peut :
- Voir et modifier les utilisateurs (expéditeurs et transporteurs uniquement)
- Changer les rôles des utilisateurs (vers expéditeur ou transporteur)
- Gérer les colis (voir, modifier, supprimer)
- Gérer les itinéraires (voir, modifier, supprimer, vérifier)
- Voir et gérer les messages
- Voir et gérer les avis
- Voir les statistiques
- Gérer le logo de l'entreprise
- Gérer les paramètres généraux
- Voir les voyageurs

#### Ne peut pas :
- Créer ou supprimer des utilisateurs
- Gérer d'autres administrateurs
- Voir les informations de revenus détaillées
- Accéder aux paramètres système avancés
- Voir le journal d'activité

#### Identifiants de connexion :
- Email: `admin@mbstransport.com`
- Mot de passe: `MBS2024Admin!`

### 3. Transporteur (transporter)
Accès limité à son propre profil et itinéraires.

### 4. Expéditeur (sender)
Accès limité à son propre profil et colis.

## Catégories de Permissions

### Gestion des Utilisateurs
- `VIEW_USERS` - Voir les utilisateurs
- `CREATE_USERS` - Créer des utilisateurs (superadmin uniquement)
- `EDIT_USERS` - Modifier les utilisateurs
- `DELETE_USERS` - Supprimer les utilisateurs (superadmin uniquement)
- `CHANGE_USER_ROLES` - Modifier les rôles des utilisateurs

### Gestion des Colis
- `VIEW_PACKAGES` - Voir les colis
- `CREATE_PACKAGES` - Créer des colis
- `EDIT_PACKAGES` - Modifier les colis
- `DELETE_PACKAGES` - Supprimer les colis

### Gestion des Itinéraires
- `VIEW_ROUTES` - Voir les itinéraires
- `CREATE_ROUTES` - Créer des itinéraires
- `EDIT_ROUTES` - Modifier les itinéraires
- `DELETE_ROUTES` - Supprimer les itinéraires
- `VERIFY_ROUTES` - Vérifier les itinéraires

### Communication
- `VIEW_MESSAGES` - Voir les messages
- `DELETE_MESSAGES` - Supprimer les messages
- `VIEW_REVIEWS` - Voir les avis
- `DELETE_REVIEWS` - Supprimer les avis

### Statistiques
- `VIEW_STATISTICS` - Voir les statistiques générales
- `VIEW_REVENUE` - Voir les revenus (superadmin uniquement)

### Configuration
- `MANAGE_LOGO` - Gérer le logo
- `MANAGE_SETTINGS` - Gérer les paramètres

### Voyageurs
- `VIEW_TRAVELERS` - Voir les voyageurs
- `MANAGE_TRAVELERS` - Gérer les voyageurs (superadmin uniquement)

### Administration Avancée (Super Admin uniquement)
- `MANAGE_ADMINS` - Gérer les administrateurs
- `MANAGE_TRANSPORTERS` - Gérer les transporteurs (création avec identifiants)
- `VIEW_ACTIVITY_LOG` - Voir le journal d'activité
- `MANAGE_DATA` - Gérer toutes les données
- `SYSTEM_SETTINGS` - Paramètres système

## Utilisation dans le Code

### Hook usePermissions

```typescript
import { usePermissions } from '@/hooks/use-permissions'
import { Permission } from '@/lib/permissions'

function MyComponent() {
  const { 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions,
    canManageUser,
    getEditableRoles,
    isSuperAdmin,
    isAdmin 
  } = usePermissions()
  
  // Vérifier une permission
  if (hasPermission(Permission.DELETE_USERS)) {
    // Afficher le bouton de suppression
  }
  
  // Vérifier si peut gérer un utilisateur spécifique
  if (canManageUser(targetUser.role)) {
    // Permettre la modification
  }
  
  // Obtenir les rôles modifiables
  const editableRoles = getEditableRoles() // ['sender', 'transporter'] pour admin
}
```

### Composant PermissionGate

```typescript
import { PermissionGate } from '@/components/PermissionGate'
import { Permission } from '@/lib/permissions'

function MyComponent() {
  return (
    <PermissionGate permission={Permission.DELETE_USERS}>
      <Button>Supprimer l'utilisateur</Button>
    </PermissionGate>
  )
}

// Avec plusieurs permissions
<PermissionGate 
  permissions={[Permission.EDIT_USERS, Permission.DELETE_USERS]}
  requireAll={false} // true si toutes les permissions sont requises
>
  <div>Contenu protégé</div>
</PermissionGate>
```

### Fonctions utilitaires

```typescript
import { 
  hasPermission, 
  canManageUser, 
  getEditableRoles,
  getRolePermissions 
} from '@/lib/permissions'

// Vérifier une permission pour un rôle
const canDelete = hasPermission('admin', Permission.DELETE_USERS) // false

// Vérifier si un rôle peut gérer un autre rôle
const canManage = canManageUser('admin', 'sender') // true
const canManageAdmin = canManageUser('admin', 'admin') // false

// Obtenir les rôles modifiables
const roles = getEditableRoles('admin') // ['sender', 'transporter']

// Obtenir toutes les permissions d'un rôle
const permissions = getRolePermissions('superadmin')
```

## Composants Visuels

### RoleBadge
Affiche un badge avec le rôle actuel de l'utilisateur.

```typescript
import { RoleBadge } from '@/components/RoleBadge'

<RoleBadge showIcon={true} size="default" />
```

### PermissionsDisplay
Affiche toutes les permissions du rôle actuel dans les paramètres.

```typescript
import { PermissionsDisplay } from '@/components/PermissionsDisplay'

<PermissionsDisplay />
```

## Flux de Travail

### Scénarios Courants

#### 1. Admin veut changer le rôle d'un expéditeur en transporteur
✅ **Autorisé** - L'admin peut modifier les rôles vers expéditeur ou transporteur

#### 2. Admin veut créer un nouvel administrateur
❌ **Refusé** - Seul le super admin peut gérer les administrateurs

#### 3. Admin veut supprimer un transporteur
❌ **Refusé** - L'admin ne peut pas supprimer d'utilisateurs (peut uniquement modifier)

#### 4. Super Admin veut tout faire
✅ **Autorisé** - Le super admin a toutes les permissions

## Sécurité

### Principes
- Les permissions sont vérifiées côté client pour l'interface
- Toutes les actions critiques doivent aussi être vérifiées côté serveur
- Les rôles sont hiérarchiques : superadmin > admin > transporter/sender
- Un admin ne peut jamais élever son propre rôle

### Bonnes Pratiques
1. Toujours utiliser `PermissionGate` pour le rendu conditionnel
2. Vérifier les permissions avant toute action destructive
3. Utiliser `canManageUser` avant de modifier les données d'un utilisateur
4. Afficher des messages d'erreur clairs en cas de refus de permission

## Extension du Système

Pour ajouter une nouvelle permission :

1. Ajouter l'entrée dans l'enum `Permission` (`src/lib/permissions.ts`)
2. Ajouter la permission aux rôles appropriés dans `rolePermissions`
3. Ajouter le label dans `permissionLabels`
4. Utiliser la permission dans les composants avec `usePermissions` ou `PermissionGate`

```typescript
// 1. Ajouter dans l'enum
export enum Permission {
  // ... autres permissions
  NEW_FEATURE = 'new_feature',
}

// 2. Ajouter aux rôles
const rolePermissions: Record<UserRole, Permission[]> = {
  superadmin: [
    // ... autres permissions
    Permission.NEW_FEATURE,
  ],
  admin: [
    // ... autres permissions (sans NEW_FEATURE)
  ],
}

// 3. Ajouter le label
export const permissionLabels: Record<Permission, string> = {
  // ... autres labels
  [Permission.NEW_FEATURE]: 'Nouvelle fonctionnalité',
}

// 4. Utiliser dans un composant
<PermissionGate permission={Permission.NEW_FEATURE}>
  <NewFeatureButton />
</PermissionGate>
```

## Résolution de Problèmes

### L'utilisateur ne voit pas certains onglets
- Vérifier que l'utilisateur a le bon rôle
- Vérifier que les permissions sont correctement définies
- Consulter la page Paramètres > Permissions pour voir les permissions actuelles

### Les modifications ne sont pas autorisées
- Vérifier `canManageUser` pour les modifications d'utilisateurs
- Consulter la matrice de permissions ci-dessus
- Vérifier les messages d'erreur dans les toasts

### Comment donner plus de permissions à un admin
- Seul le super admin peut modifier le fichier `src/lib/permissions.ts`
- Ajouter les permissions souhaitées dans le tableau `rolePermissions.admin`
