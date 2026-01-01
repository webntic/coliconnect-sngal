# Codes d'Accès MBS Transport

## 🚀 Connexion Rapide (Démo)

La plateforme dispose maintenant de **boutons de connexion rapide** sur la page d'accueil et l'écran de connexion pour faciliter l'accès aux comptes de démonstration.

### 📍 Où trouver les liens de connexion rapide ?

1. **Page d'accueil (Hero)** : Section "Accès Rapide Démo" avec 3 boutons visuels
2. **Écran de connexion** : Section en bas avec boutons Admin, Client, Transporteur
3. **Écran Admin** : Bouton "Connexion Admin Automatique"

---

## 🔐 Comptes de Démonstration

### Administrateur
- **Email:** `admin@mbstransport.com`
- **Mot de passe:** `MBS2024Admin!`
- **Accès direct:** Cliquez sur le bouton "Administrateur" dans la section démo

### Client (Expéditeur)
- **Email:** `client@mbstransport.com`
- **Nom:** Amadou Diallo
- **Téléphone:** +221 77 123 45 67
- **Accès direct:** Cliquez sur le bouton "Client" dans la section démo

### Transporteur
- **Email:** `transporteur@mbstransport.com`
- **Nom:** Moussa Sarr
- **Téléphone:** +221 77 987 65 43
- **Accès direct:** Cliquez sur le bouton "Transporteur" dans la section démo

---

## 🔐 Accès Administrateur (Détails)

**Identifiant:** `admin@mbstransport.com`  
**Mot de passe:** `MBS2024Admin!`

L'administrateur a accès à :
- Gestion de tous les utilisateurs (expéditeurs et transporteurs)
- Surveillance de tous les colis et itinéraires
- Consultation de toutes les conversations
- Statistiques globales de la plateforme
- Gestion des avis et évaluations

---

## 👤 Création de Nouveaux Comptes

Les utilisateurs peuvent créer un compte avec :
- **Email** : Adresse email valide
- **Mot de passe** : Minimum 6 caractères
- **Nom complet**
- **Numéro de téléphone**
- **Type de compte** : Expéditeur ou Transporteur

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
