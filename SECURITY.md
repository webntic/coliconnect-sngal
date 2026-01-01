# 🔒 Guide de Sécurité - MBS Transport

Ce document décrit les meilleures pratiques de sécurité pour l'application MBS Transport et les recommandations pour un déploiement en production.

## ⚠️ Identifiants par Défaut

### État Actuel (Développement)

L'application utilise actuellement des identifiants en clair pour faciliter le développement :

**Administrateur:**
- Identifiant: `admin@mbstransport`
- Mot de passe: `MBS2024Admin!`

**Stockage:** Les identifiants sont stockés dans Spark KV sans hachage.

### ⚡ Actions Requises pour la Production

#### 1. Changement Immédiat des Identifiants

```typescript
import { updateAdminCredentials } from '@/lib/auth'

// Changez immédiatement les identifiants par défaut
await updateAdminCredentials(
  'votre_nouvel_identifiant',
  'VotreMotDePasseComplexe123!@#'
)
```

**Recommandations pour les mots de passe:**
- Minimum 12 caractères
- Majuscules et minuscules
- Chiffres et caractères spéciaux
- Éviter les mots du dictionnaire
- Utiliser un gestionnaire de mots de passe

#### 2. Implémenter le Hachage des Mots de Passe

Actuellement, les mots de passe sont stockés en clair. Pour la production, vous **devez** implémenter un système de hachage.

**Option recommandée - Utiliser Web Crypto API (déjà disponible dans le navigateur):**

```typescript
// src/lib/auth.ts - Mise à jour recommandée

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}
```

**Pour une sécurité renforcée, utilisez une bibliothèque comme bcryptjs:**

```typescript
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
```

#### 3. Politique de Mots de Passe Renforcée

Mettez à jour la fonction de validation dans `src/lib/auth.ts`:

```typescript
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 12) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 12 caractères' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une majuscule' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une minuscule' }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre' }
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial' }
  }
  
  return { valid: true }
}
```

#### 4. Limitation des Tentatives de Connexion

Implémentez un système pour limiter les tentatives de connexion:

```typescript
// src/lib/auth.ts

interface LoginAttempt {
  email: string
  attempts: number
  lastAttempt: number
  lockedUntil?: number
}

const MAX_ATTEMPTS = 5
const LOCK_DURATION = 15 * 60 * 1000 // 15 minutes

export async function checkLoginAttempts(email: string): Promise<boolean> {
  const attempts = await spark.kv.get<LoginAttempt[]>('login-attempts') || []
  const userAttempt = attempts.find(a => a.email === email)
  
  if (!userAttempt) return true
  
  if (userAttempt.lockedUntil && userAttempt.lockedUntil > Date.now()) {
    return false
  }
  
  return userAttempt.attempts < MAX_ATTEMPTS
}

export async function recordLoginAttempt(email: string, success: boolean): Promise<void> {
  const attempts = await spark.kv.get<LoginAttempt[]>('login-attempts') || []
  const index = attempts.findIndex(a => a.email === email)
  
  if (success) {
    if (index >= 0) {
      attempts.splice(index, 1)
    }
  } else {
    const now = Date.now()
    if (index >= 0) {
      attempts[index].attempts++
      attempts[index].lastAttempt = now
      if (attempts[index].attempts >= MAX_ATTEMPTS) {
        attempts[index].lockedUntil = now + LOCK_DURATION
      }
    } else {
      attempts.push({
        email,
        attempts: 1,
        lastAttempt: now
      })
    }
  }
  
  await spark.kv.set('login-attempts', attempts)
}
```

#### 5. Authentification à Deux Facteurs (2FA)

Pour une sécurité maximale, implémentez la 2FA:

```typescript
// Exemple d'intégration avec TOTP (Time-based One-Time Password)

export async function generateTOTPSecret(userId: string): Promise<string> {
  const secret = generateRandomSecret() // Implémentation à ajouter
  await spark.kv.set(`totp-secret-${userId}`, secret)
  return secret
}

export async function verifyTOTPCode(userId: string, code: string): Promise<boolean> {
  const secret = await spark.kv.get<string>(`totp-secret-${userId}`)
  if (!secret) return false
  
  // Vérifier le code TOTP (utilisez une bibliothèque comme otpauth)
  return verifyTOTP(secret, code)
}
```

#### 6. Logging et Audit

Implémentez un système de logging pour les actions sensibles:

```typescript
interface AuditLog {
  id: string
  userId: string
  action: string
  timestamp: number
  ipAddress?: string
  userAgent?: string
  success: boolean
}

export async function logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void> {
  const logs = await spark.kv.get<AuditLog[]>('audit-logs') || []
  
  logs.push({
    ...event,
    id: Date.now().toString(),
    timestamp: Date.now()
  })
  
  // Garder seulement les 1000 derniers logs
  if (logs.length > 1000) {
    logs.splice(0, logs.length - 1000)
  }
  
  await spark.kv.set('audit-logs', logs)
}
```

#### 7. Session Management

Implémentez une expiration de session:

```typescript
interface Session {
  userId: string
  createdAt: number
  expiresAt: number
  lastActivity: number
}

const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 heures
const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes

export async function validateSession(sessionId: string): Promise<boolean> {
  const session = await spark.kv.get<Session>(`session-${sessionId}`)
  
  if (!session) return false
  
  const now = Date.now()
  
  if (now > session.expiresAt) {
    await spark.kv.delete(`session-${sessionId}`)
    return false
  }
  
  if (now - session.lastActivity > INACTIVITY_TIMEOUT) {
    await spark.kv.delete(`session-${sessionId}`)
    return false
  }
  
  // Mettre à jour l'activité
  session.lastActivity = now
  await spark.kv.set(`session-${sessionId}`, session)
  
  return true
}
```

## 🛡️ Autres Recommandations de Sécurité

### Protection CSRF

Implémentez des tokens CSRF pour les opérations sensibles.

### Validation des Entrées

- Validez toutes les entrées côté client ET serveur
- Échappez les données avant affichage (protection XSS)
- Utilisez des requêtes paramétrées

### HTTPS Obligatoire

- Utilisez uniquement HTTPS en production
- Configurez HSTS (HTTP Strict Transport Security)
- Utilisez des certificats SSL/TLS valides

### Gestion des Données Sensibles

- Ne loggez jamais les mots de passe
- Masquez les données sensibles dans l'UI
- Chiffrez les données sensibles au repos

### Mises à Jour

- Maintenez toutes les dépendances à jour
- Surveillez les vulnérabilités avec npm audit
- Appliquez les patches de sécurité rapidement

### Rate Limiting

Implémentez une limitation du nombre de requêtes par utilisateur/IP.

### Backup

- Sauvegardez régulièrement les données
- Testez les procédures de restauration
- Chiffrez les backups

## 📋 Checklist de Sécurité pour la Production

- [ ] Changer tous les identifiants par défaut
- [ ] Implémenter le hachage des mots de passe
- [ ] Activer la validation de mot de passe renforcée
- [ ] Mettre en place la limitation des tentatives de connexion
- [ ] Implémenter l'authentification à deux facteurs
- [ ] Configurer le logging et l'audit
- [ ] Implémenter la gestion de session avec expiration
- [ ] Activer HTTPS uniquement
- [ ] Valider toutes les entrées utilisateur
- [ ] Mettre en place le rate limiting
- [ ] Configurer les sauvegardes automatiques
- [ ] Tester les procédures de récupération
- [ ] Former les administrateurs sur les bonnes pratiques
- [ ] Établir un plan de réponse aux incidents

## 📞 Signalement de Vulnérabilités

Si vous découvrez une vulnérabilité de sécurité, veuillez nous contacter immédiatement :

- **Email**: security@mbstransport.com (à configurer)
- **WhatsApp**: +221 77 306 15 15

**Ne publiez pas les vulnérabilités publiquement avant qu'elles ne soient corrigées.**

---

**Date de dernière mise à jour**: 2024
**Version du document**: 1.0
