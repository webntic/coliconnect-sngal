# 🔐 Codes d'Accès - MBS Transport

## 📋 Informations Importantes

L'application MBS Transport utilise un système d'authentification basé sur les formulaires. Pour accéder aux différents espaces utilisateurs, vous devez créer un compte en remplissant le formulaire d'inscription.

## 👤 Types de Comptes Disponibles

### 1. Compte Client/Expéditeur
**Rôle**: Envoyer des colis
**Accès**: Tableau de bord expéditeur

**Pour créer un compte expéditeur de test:**
```
Nom Complet: Amadou Diallo
Email: amadou.diallo@example.com
Téléphone: +221 77 123 45 67
Rôle: Envoyer Colis (onglet avec icône Package)
```

### 2. Compte Transporteur
**Rôle**: Transporter des colis
**Accès**: Tableau de bord transporteur

**Pour créer un compte transporteur de test:**
```
Nom Complet: Fatou Ndiaye
Email: fatou.ndiaye@transport.com
Téléphone: +221 78 234 56 78
Rôle: Transporter (onglet avec icône Truck)
```

### 3. Compte Administrateur 🔐
**Rôle**: Superviser et gérer la plateforme
**Accès**: Tableau de bord administrateur complet

**Pour accéder au compte administrateur:**
```
Code d'accès: MBS2024ADMIN
Nom Complet: Admin MBS
Email: admin@mbs-transport.sn
Téléphone: +221 77 306 15 15
Rôle: Cliquer sur "Accès administrateur" puis entrer le code
```

**Fonctionnalités du tableau de bord administrateur:**
- ✅ Vue d'ensemble avec statistiques complètes
- ✅ Gestion des utilisateurs (expéditeurs et transporteurs)
- ✅ Surveillance de tous les colis (statuts, prix, détails)
- ✅ Gestion des itinéraires (vérification, tarifs)
- ✅ Moniteur de messages entre utilisateurs
- ✅ Système d'évaluation et avis
- ✅ Filtres avancés et recherche globale
- ✅ Statistiques de revenus et transactions

## 🎯 Comment Accéder aux Tableaux de Bord

### Étape 1: Accéder à la Page de Connexion
1. Depuis la page d'accueil, cliquez sur **"Espace Client"** dans la navigation
2. OU cliquez sur le bouton **"Commencer"** dans la section héro
3. OU naviguez directement en changeant `showLanding` à `false`

### Étape 2: Créer votre Compte
1. Sélectionnez votre rôle (Envoyer Colis ou Transporter)
   - Pour l'accès admin: cliquez sur **"Accès administrateur"**
2. Remplissez le formulaire avec vos informations:
   - Code administrateur (si admin): **MBS2024ADMIN**
   - Nom Complet
   - Email (format valide requis)
   - Numéro de Téléphone
3. Cliquez sur **"Commencer"**

### Étape 3: Accéder à votre Tableau de Bord
- **Expéditeur**: Vous serez redirigé vers le tableau de bord expéditeur avec:
  - Vue d'ensemble des statistiques
  - Carte interactive des itinéraires
  - Gestion de vos envois
  - Recherche de transporteurs
  - Système de messagerie

- **Transporteur**: Vous serez redirigé vers le tableau de bord transporteur avec:
  - Vue d'ensemble des revenus
  - Carte interactive des itinéraires
  - Gestion de vos routes
  - Recherche de colis à transporter
  - Définition de tarifs GP (prix au kg)
  - Système de messagerie

- **Administrateur**: Vous serez redirigé vers le tableau de bord administrateur avec:
  - Vue d'ensemble globale avec KPIs
  - Gestion complète des utilisateurs
  - Surveillance des colis et itinéraires
  - Moniteur de communications
  - Système de reviews
  - Filtres et recherche avancée

## 🔄 Persistance des Données

Les comptes créés sont sauvegardés localement dans votre navigateur grâce au système `useKV` de Spark. Cela signifie que:
- ✅ Vos données persistent entre les sessions
- ✅ Pas besoin de se reconnecter à chaque visite
- ⚠️ Les données sont stockées localement (pas de serveur backend)
- ⚠️ Effacer le cache du navigateur supprimera vos données

## 🧪 Comptes de Test Recommandés

### Compte Administrateur (Accès Complet)
```
Code: MBS2024ADMIN
Nom: Admin MBS Transport
Email: admin@mbs-transport.sn
Téléphone: +221 77 306 15 15
Rôle: Accès administrateur (cliquer sur le lien puis entrer le code)
```

### Compte Admin Expéditeur
```
Nom: Admin Expéditeur MBS
Email: admin.expediteur@mbs-transport.sn
Téléphone: +221 77 306 15 15
Rôle: Envoyer Colis
```

### Compte Admin Transporteur
```
Nom: Admin Transporteur MBS
Email: admin.transporteur@mbs-transport.sn
Téléphone: +221 77 306 15 15
Rôle: Transporter
```

### Compte Client Standard
```
Nom: Moussa Ba
Email: moussa.ba@gmail.com
Téléphone: +221 76 543 21 09
Rôle: Envoyer Colis
```

### Compte Transporteur Standard
```
Nom: Ibrahima Sarr
Email: ibrahima.sarr@transport.sn
Téléphone: +221 78 987 65 43
Rôle: Transporter
```

## 📞 Coordonnées MBS Transport

### Sénégal
- **Téléphone**: +221 77 306 15 15
- **Adresse**: Ouest Foire, en face de l'hôpital Philippe Senghor, à côté de la pharmacie Ibrahima Diallo, Dakar

### France
- **Téléphone**: +33 7 53 34 35 39
- **Adresse**: 4 rue Claude Debussy, 92220 Bagneux

## 🛠️ Support Technique

Pour toute question technique ou problème d'accès:
1. Vérifiez que JavaScript est activé dans votre navigateur
2. Videz le cache et réessayez
3. Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)
4. Contactez le support WhatsApp via le bouton en bas à droite

## 🔒 Sécurité

⚠️ **Note de Sécurité**: Cette application est un prototype/démo. Pour une utilisation en production:
- Implémentez un système d'authentification backend sécurisé
- Ajoutez la validation par SMS/Email
- Utilisez HTTPS pour toutes les communications
- Implémentez des mesures de sécurité supplémentaires (2FA, etc.)

## 📝 Notes pour les Développeurs

Le système d'authentification est géré par:
- **Hook**: `src/hooks/use-auth.ts`
- **Composant**: `src/components/AuthScreen.tsx`
- **Types**: `src/lib/types.ts`
- **Persistance**: `useKV` de `@github/spark/hooks`

Pour modifier ou étendre le système d'authentification, consultez ces fichiers.
