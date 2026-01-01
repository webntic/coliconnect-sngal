# Codes d'Accès MBS Transport

## 🔐 Accès Administrateur

**Identifiant:** `admin@mbstransport`  
**Mot de passe:** `MBS2024Admin!`

L'administrateur a accès à :
- Gestion de tous les utilisateurs (expéditeurs et transporteurs)
- Surveillance de tous les colis et itinéraires
- Consultation de toutes les conversations
- Statistiques globales de la plateforme
- Gestion des avis et évaluations

---

## 👤 Accès Utilisateurs (Expéditeurs et Transporteurs)

Les utilisateurs doivent créer un compte avec :
- **Email** : Adresse email valide
- **Mot de passe** : Minimum 6 caractères
- **Nom complet**
- **Numéro de téléphone**
- **Type de compte** : Expéditeur ou Transporteur

### Exemple de compte test :

**Email:** `test@example.com`  
**Mot de passe:** `test123`

---

## 🔄 Modifier les identifiants administrateur

Les identifiants administrateur peuvent être modifiés via la fonction `updateAdminCredentials()` dans le fichier `src/lib/auth.ts`.

```typescript
import { updateAdminCredentials } from '@/lib/auth'

await updateAdminCredentials('nouvel_identifiant', 'nouveau_mot_de_passe')
```

---

## 📝 Notes de sécurité

⚠️ **Important** : Pour un déploiement en production, il est fortement recommandé de :

1. Changer immédiatement les identifiants par défaut
2. Utiliser des mots de passe complexes (minimum 12 caractères avec majuscules, minuscules, chiffres et symboles)
3. Implémenter un système de hachage de mot de passe (bcrypt, argon2)
4. Ajouter l'authentification à deux facteurs (2FA)
5. Mettre en place une limitation des tentatives de connexion
6. Logger les accès administrateur pour audit

---

## 🎯 Fonctionnalités par rôle

### Admin
- ✅ Tableau de bord complet
- ✅ Gestion des utilisateurs
- ✅ Surveillance des colis
- ✅ Surveillance des itinéraires
- ✅ Lecture de tous les messages
- ✅ Statistiques globales

### Expéditeur (Sender)
- ✅ Créer des demandes de colis
- ✅ Rechercher des transporteurs
- ✅ Suivre ses colis
- ✅ Messagerie avec transporteurs
- ✅ Évaluer les transporteurs

### Transporteur (Transporter)
- ✅ Créer des itinéraires
- ✅ Voir les colis disponibles
- ✅ Accepter des colis
- ✅ Messagerie avec expéditeurs
- ✅ Recevoir des évaluations
