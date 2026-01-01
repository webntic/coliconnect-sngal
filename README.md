# MBS Transport - Plateforme de Transport de Colis

MBS Transport (Mondial Bagage Services) est une plateforme innovante qui connecte des expéditeurs et des transporteurs pour faciliter l'envoi de colis au Sénégal et dans le monde entier.

## 🚀 Fonctionnalités Principales

### Pour les Expéditeurs
- ✅ Créer des demandes d'envoi de colis
- ✅ Calculer automatiquement les devis
- ✅ Rechercher des transporteurs disponibles
- ✅ Suivre les colis en temps réel
- ✅ Messagerie intégrée avec les transporteurs
- ✅ Évaluer les transporteurs

### Pour les Transporteurs
- ✅ Créer des itinéraires de transport
- ✅ Définir les tarifs au kg
- ✅ Voir les colis disponibles
- ✅ Accepter des missions
- ✅ Messagerie avec les expéditeurs
- ✅ Recevoir des évaluations

### Pour les Administrateurs
- ✅ Dashboard complet de surveillance
- ✅ Gestion de tous les utilisateurs
- ✅ Suivi de tous les colis et itinéraires
- ✅ Consultation de toutes les conversations
- ✅ Statistiques globales de la plateforme
- ✅ Gestion des avis et évaluations

## 🔐 Connexion et Authentification

### Accès Administrateur

**Identifiant:** `admin@mbstransport`  
**Mot de passe:** `MBS2024Admin!`

L'administrateur peut accéder au tableau de bord complet pour gérer toute la plateforme.

### Création de Compte Utilisateur

Les expéditeurs et transporteurs doivent créer un compte avec :
- Email valide
- Mot de passe (minimum 6 caractères)
- Nom complet
- Numéro de téléphone
- Type de compte (Expéditeur ou Transporteur)

**Consultez le fichier [CODES_ACCES.md](./CODES_ACCES.md) pour plus de détails sur les identifiants.**

## 📞 Contact

### Sénégal
- **Téléphone**: +221 77 306 15 15
- **Adresse**: Ouest Foire, en face l'hôpital Philippe Senghor, à côté de la pharmacie Ibrahima Diallo, Dakar

### France
- **Téléphone**: +33 7 53 34 35 39
- **Adresse**: 4 rue Claude Debussy, 92220 Bagneux

### Support WhatsApp
Un bouton WhatsApp est intégré sur toutes les pages pour un support client instantané.

## 🛠️ Technologies Utilisées

- **Frontend**: React 19 + TypeScript
- **UI Components**: Shadcn/ui v4
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons
- **State Management**: React Hooks + Spark KV Storage
- **Maps**: Intégration de cartes interactives
- **Notifications**: Sonner
- **Animations**: Framer Motion

## 📦 Services Proposés

- Fret Maritime et Aérien
- Envoi Express DHL
- Envoi dans la sous-région du Sénégal
- Transport GP (Groupage de Palettes)
- Devis en ligne avec calcul automatique

## 🎨 Design

L'interface utilise :
- **Polices**: Poppins (titres) et Inter (corps de texte)
- **Palette de couleurs**: Tons de bleu profond avec accents orange
- **Design responsive**: Optimisé pour mobile, tablette et desktop

## 🔒 Sécurité

Le système d'authentification inclut :
- Authentification par email et mot de passe
- Stockage sécurisé des identifiants
- Séparation des rôles (Admin, Expéditeur, Transporteur)
- Validation des mots de passe

**⚠️ Important pour la production :**
- Changez immédiatement les identifiants administrateur par défaut
- Implémentez le hachage des mots de passe (bcrypt, argon2)
- Ajoutez l'authentification à deux facteurs (2FA)
- Mettez en place une limitation des tentatives de connexion

## 📄 Documentation Complémentaire

- [PRD.md](./PRD.md) - Product Requirements Document complet
- [CODES_ACCES.md](./CODES_ACCES.md) - Tous les codes d'accès
- [BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md) - Documentation backend
- [SECURITY.md](./SECURITY.md) - Guide de sécurité

## 🚀 Démarrage Rapide

1. Les dépendances sont déjà installées
2. Le serveur de développement est lancé automatiquement
3. Accédez à l'application via l'URL fournie par Spark
4. Utilisez les identifiants administrateur pour accéder au dashboard complet

## 📝 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants UI (Shadcn)
│   ├── AuthScreen.tsx  # Écran de connexion/inscription
│   ├── AdminDashboard.tsx
│   ├── SenderDashboard.tsx
│   ├── TransporterDashboard.tsx
│   └── ...
├── hooks/              # Hooks personnalisés
│   ├── use-auth.ts    # Hook d'authentification
│   ├── use-messaging.ts
│   └── ...
├── lib/                # Utilitaires et types
│   ├── auth.ts        # Logique d'authentification
│   ├── types.ts       # Types TypeScript
│   └── utils.ts
├── App.tsx            # Composant principal
└── index.css          # Styles globaux
```

## 🌍 Deployment

Cette application utilise Spark KV pour la persistance des données. Toutes les données (utilisateurs, colis, itinéraires, messages) sont stockées localement et persistent entre les sessions.

## 📧 Support

Pour toute question ou problème, contactez-nous via :
- WhatsApp (bouton intégré)
- Email via le formulaire de contact
- Téléphone (numéros ci-dessus)

---

**MBS Transport** - *Connectez, expédiez et livrez des colis dans le monde entier*
