# Planning Guide

Une plateforme innovante pour MBS Transport (Mondial Bagage Services) qui connecte des particuliers expéditeurs avec des transporteurs pour expédier des colis entre le Sénégal, la France et l'international. La plateforme combine un site vitrine professionnel avec des tableaux de bord utilisateurs complets pour la gestion des envois et des itinéraires.

**Experience Qualities**:
1. **Professionnel** - Le site doit inspirer confiance et crédibilité avec une présentation claire des services, des coordonnées accessibles et un design soigné
2. **Accueillant** - L'interface doit être chaleureuse et invitante pour refléter l'esprit du service client de qualité
3. **Intuitif** - Les tableaux de bord doivent permettre aux utilisateurs de gérer facilement leurs envois et itinéraires sans friction

**Complexity Level**: Light Application (multiple features with basic state)
Une application combinant un site vitrine avec des espaces utilisateurs authentifiés pour expéditeurs et transporteurs, incluant la gestion complète des envois, itinéraires, et options tarifaires spécialisées comme le GP (Gros Poids).

## Essential Features

### Authentification et Gestion d'Utilisateurs
- **Functionality**: Système d'inscription et connexion permettant aux utilisateurs de choisir leur rôle (expéditeur ou transporteur)
- **Purpose**: Sécuriser l'accès aux tableaux de bord et personnaliser l'expérience utilisateur
- **Trigger**: Clic sur "Espace Client" dans la navigation ou "Commencer" sur la page d'accueil
- **Progression**: Sélection du rôle → Saisie des informations (nom, email, téléphone) → Validation → Redirection vers tableau de bord approprié
- **Success criteria**: L'utilisateur accède à son espace personnalisé avec données persistantes entre sessions


### Tableau de Bord Expéditeur
- **Functionality**: Interface complète pour les expéditeurs permettant de créer, gérer et suivre leurs envois de colis avec visualisation géographique des itinéraires
- **Purpose**: Centraliser toute la gestion des envois en un seul endroit avec visibilité complète et carte interactive
- **Trigger**: Connexion en tant qu'expéditeur
- **Progression**: Vue d'ensemble (statistiques) → Visualisation carte interactive des envois et routes disponibles → Création nouvel envoi → Saisie détails (titre, description, taille incluant GP, poids, origine/destination, dates, prix) → Suivi des envois (en attente, en transit, livrés)
- **Success criteria**: Les expéditeurs peuvent créer des demandes d'envoi avec option GP (Gros Poids >50kg), voir leurs statistiques, visualiser géographiquement leurs envois et les itinéraires disponibles, et suivre l'état de tous leurs colis

### Tableau de Bord Transporteur
- **Functionality**: Interface dédiée pour les transporteurs leur permettant d'ajouter leurs itinéraires, définir leurs tarifs incluant le prix au kg pour GP, et visualiser la demande sur une carte
- **Purpose**: Permettre aux transporteurs de monétiser leurs trajets en transportant des colis et de voir les opportunités géographiquement
- **Trigger**: Connexion en tant que transporteur
- **Progression**: Vue d'ensemble (statistiques, revenus) → Visualisation carte interactive de leurs itinéraires et demandes d'envoi → Ajout itinéraire → Saisie détails (origine, destination, dates, type véhicule, capacité, prix/kg pour GP) → Gestion itinéraires (à venir, passés)
- **Success criteria**: Les transporteurs peuvent créer des itinéraires avec tarification GP personnalisée, voir leurs revenus estimés, visualiser géographiquement leurs routes et les demandes correspondantes, et gérer tous leurs trajets

### Carte Interactive des Itinéraires
- **Functionality**: Visualisation géographique interactive affichant tous les itinéraires de transporteurs et demandes d'envoi sur une carte stylisée avec animations
- **Purpose**: Permettre aux utilisateurs de comprendre rapidement la géographie des routes disponibles et identifier des opportunités de correspondance
- **Trigger**: Affichage automatique sur les tableaux de bord expéditeur et transporteur
- **Progression**: Chargement de la carte → Animation progressive des itinéraires (lignes bleues pour transporteurs, lignes orange pointillées pour envois) → Survol pour mettre en évidence → Clic pour sélectionner et voir détails
- **Success criteria**: Les utilisateurs peuvent visualiser instantanément tous les itinéraires actifs, identifier les villes desservies, voir les correspondances potentielles entre envois et routes, et interagir avec la carte pour obtenir plus d'informations. La carte couvre le Sénégal, l'Afrique de l'Ouest, l'Europe et l'Amérique du Nord avec plus de 40 villes référencées.

### Option GP (Gros Poids) avec Tarification au Kg
- **Functionality**: Catégorie spéciale pour les envois de plus de 50kg avec tarification au kg définie par le transporteur
- **Purpose**: Permettre le transport de gros volumes avec une tarification flexible et transparente
- **Trigger**: Sélection de "GP - Gros Poids (>50kg)" lors de la création d'envoi ou définition du prix/kg lors de la création d'itinéraire
- **Progression**: Expéditeur sélectionne GP → Saisit poids exact → Système calcule coût basé sur prix/kg du transporteur → Validation
- **Success criteria**: Les envois GP sont correctement catégorisés et les prix calculés automatiquement selon le tarif au kg du transporteur

## Essential Features (continued from original)

### Section Héro/Accueil
- **Functionality**: Grande section d'accueil avec le nom de l'entreprise, slogan et visuels attractifs
- **Purpose**: Créer une première impression forte et professionnelle
- **Trigger**: Chargement de la page
- **Progression**: Affichage immédiat → Animation subtile d'entrée → Appel à l'action visible (Nous contacter)
- **Success criteria**: Le visiteur comprend immédiatement le domaine d'activité de l'entreprise

### Présentation des Services
- **Functionality**: Cartes détaillant chaque service offert par MBS Transport
- **Purpose**: Informer clairement sur les différentes prestations disponibles
- **Trigger**: Scroll vers la section services
- **Progression**: Vue d'ensemble → Cartes détaillées (Fret Maritime, Fret Aérien, Envoi Express DHL, Transport Sous-Région)
- **Success criteria**: Les visiteurs comprennent la gamme complète des services

### Système de Devis en Ligne avec Calcul Automatique
- **Functionality**: Calculateur interactif permettant aux utilisateurs d'obtenir instantanément une estimation précise du coût de leur envoi avec sauvegarde des devis
- **Purpose**: Offrir transparence tarifaire et permettre aux clients de budgétiser leurs envois avant de contacter l'entreprise
- **Trigger**: Navigation vers section "Devis" ou clic sur "Calculer un Devis"
- **Progression**: Sélection du service → Saisie destination → Entrée poids/dimensions → Options (assurance) → Calcul instantané → Affichage détaillé du devis → Sauvegarde optionnelle → Action de confirmation
- **Success criteria**: L'utilisateur obtient un devis détaillé en moins de 30 secondes avec décomposition complète des coûts et peut sauvegarder jusqu'à 5 devis pour comparaison
- **Tarification**:
  - Fret Maritime: Base 5000 FCFA + 800 FCFA/kg (15-30 jours)
  - Fret Aérien: Base 15000 FCFA + 2500 FCFA/kg (2-5 jours)
  - Express DHL: Base 25000 FCFA + 4000 FCFA/kg (24-48h)
  - Transport Sous-Région: Base 8000 FCFA + 1200 FCFA/kg (3-7 jours)
- **Calculs avancés**:
  - Poids volumétrique: (L × l × H) / 5000, facturé au poids le plus élevé
  - Assurance: 2% de la valeur déclarée (minimum 2000 FCFA)
  - Frais de douane: 5% du tarif de base (sauf express)
  - Manutention: 500 FCFA (<10kg), 1500 FCFA (10-30kg), 3000 FCFA (>30kg)
  - Multiplicateurs de destination pour tarifs variables
- **Sauvegarde des Devis**:
  - Utilise useKV pour persistance locale des devis
  - Affichage de l'historique des 5 derniers devis
  - Possibilité de ré-afficher un devis sauvegardé en un clic

### Section Informations Tarifaires et FAQ
- **Functionality**: Guide complet avec conseils d'optimisation, comparaison des services et réponses aux questions fréquentes
- **Purpose**: Éduquer les utilisateurs sur la tarification et les aider à faire des choix éclairés
- **Trigger**: Scroll après la section de calcul de devis
- **Progression**: Lecture des conseils → Comparaison des services → Consultation des FAQ → Compréhension approfondie
- **Success criteria**: Les utilisateurs comprennent comment optimiser leurs envois et ont toutes les réponses à leurs questions

### Section À Propos
- **Functionality**: Présentation de l'entreprise, sa mission et ses valeurs
- **Purpose**: Établir la crédibilité et l'histoire de MBS Transport
- **Trigger**: Navigation vers section "À Propos"
- **Progression**: Lecture de la présentation → Découverte des valeurs → Compréhension de l'expertise
- **Success criteria**: Le visiteur a confiance en l'entreprise et comprend son positionnement

### Coordonnées et Contact
- **Functionality**: Affichage clair des numéros de téléphone, adresses des bureaux, et formulaire de contact
- **Purpose**: Faciliter la prise de contact avec l'entreprise
- **Trigger**: Clic sur "Contact" ou scroll vers footer
- **Progression**: Vue des coordonnées → Sélection du moyen de contact → Appel ou envoi de message
- **Success criteria**: Le visiteur peut facilement joindre MBS Transport par téléphone ou formulaire

### Localisation des Bureaux
- **Functionality**: Présentation visuelle des deux bureaux (Dakar et France)
- **Purpose**: Montrer la présence internationale et faciliter les visites
- **Trigger**: Consultation de la section contact/bureaux
- **Progression**: Vue des adresses → Détails de localisation → Option de copier l'adresse
- **Success criteria**: Les visiteurs peuvent localiser et se rendre aux bureaux facilement

### Section Avantages/Pourquoi Nous Choisir
- **Functionality**: Mise en avant des points forts de MBS Transport
- **Purpose**: Convaincre les visiteurs de choisir MBS Transport
- **Trigger**: Navigation sur la page
- **Progression**: Lecture des avantages → Comparaison mentale avec concurrents → Décision de contact
- **Success criteria**: Le visiteur identifie les bénéfices de choisir MBS Transport

## Edge Case Handling

- **Navigation Mobile**: Menu hamburger responsive qui s'adapte aux petits écrans
- **Chargement Lent**: Affichage de squelettes de chargement pour une expérience fluide
- **Formulaire Incomplet**: Validation en temps réel avec messages d'erreur clairs en français
- **Numéros de Téléphone**: Formatage automatique et liens cliquables pour appel direct
- **Copie d'Adresse**: Bouton pour copier facilement les adresses des bureaux
- **Images Non Chargées**: Images de secours avec dégradés de couleurs de marque

## Design Direction

Le design doit évoquer **la fiabilité, le professionnalisme et la chaleur africaine**. Il doit inspirer confiance tout en restant accueillant et accessible. L'interface doit équilibrer le sérieux d'une entreprise de logistique internationale avec la proximité d'un service client personnalisé, utilisant des couleurs confiantes, des mises en page aérées et des éléments visuels qui reflètent la connexion entre l'Afrique et l'Europe.

## Color Selection

Une palette évoquant le ciel et la terre, la mer et le dynamisme, reflétant les connexions internationales et l'ancrage local.

- **Primary Color**: Bleu Profond Maritime `oklch(0.42 0.15 240)` - Évoque la mer, les voyages maritimes et inspire confiance et stabilité
- **Secondary Colors**: 
  - Beige Chaud Sahel `oklch(0.96 0.015 65)` pour les arrière-plans doux et accueillants
  - Gris Anthracite `oklch(0.32 0.01 240)` pour les textes secondaires
- **Accent Color**: Orange Soleil `oklch(0.72 0.19 50)` - Chaleur, énergie et appel à l'action, rappelant le soleil africain
- **Foreground/Background Pairings**:
  - Primary Blue `oklch(0.42 0.15 240)`: White text `oklch(1 0 0)` - Ratio 9.8:1 ✓
  - Accent Orange `oklch(0.72 0.19 50)`: White text `oklch(1 0 0)` - Ratio 6.2:1 ✓
  - Background `oklch(0.96 0.015 65)`: Anthracite text `oklch(0.32 0.01 240)` - Ratio 11.5:1 ✓
  - Card surfaces `oklch(1 0 0)`: Primary text `oklch(0.25 0.01 240)` - Ratio 15.1:1 ✓

## Font Selection

La typographie doit projeter **l'élégance professionnelle avec une touche contemporaine** - essentielle pour un site d'entreprise de transport international.

- **Primary Font**: Poppins pour les titres - Une police moderne, ronde et amicale avec une excellente présence
- **Secondary Font**: Inter pour le corps de texte - Lisibilité exceptionnelle en français

- **Typographic Hierarchy**:
  - H1 (Titre Principal): Poppins Bold/48px/tight leading (-0.02em tracking)
  - H2 (Sections): Poppins Semibold/36px/normal leading
  - H3 (Sous-sections): Poppins Medium/24px/normal leading
  - H4 (Cartes de Services): Poppins Medium/20px/normal leading
  - Body (Contenu Principal): Inter Regular/16px/relaxed leading (1.7)
  - Small (Informations): Inter Regular/14px/normal leading
  - Caption (Détails): Inter Regular/13px/normal leading with muted color

## Animations

Les animations doivent **enrichir l'expérience sans la ralentir**, avec des mouvements doux et élégants. Utilisez des transitions subtiles lors du scroll (apparition en fade-in des sections), des effets de survol sur les cartes de services (légère élévation), et des micro-interactions sur les boutons (scale subtil). Gardez les timings rapides (250-350ms) avec des easings naturels qui évoquent la fluidité et le professionnalisme. Les animations doivent évoquer le mouvement et le voyage. **La carte interactive utilise des animations de tracé de lignes (pathLength) avec framer-motion pour dessiner progressivement les itinéraires, créant un effet de voyage visuel**. Les marqueurs de villes apparaissent avec des animations de scale coordonnées.

## Component Selection

- **Components**:
  - `Card` pour les services, témoignages et informations de contact avec ombres élégantes
  - `Button` avec variants distincts (primary pour CTA, outline pour actions secondaires)
  - `Badge` pour mettre en avant les points forts (Rapide, Sécurisé, International)
  - `Separator` pour diviser les sections de manière élégante
  - `Form` + `Input` + `Label` pour le formulaire de contact avec validation
  - `Textarea` pour les messages dans le formulaire de contact
  - **`RouteMap`** composant personnalisé SVG avec carte interactive affichant itinéraires et envois
  
- **Customizations**:
  - Hero section personnalisée avec gradient et animation subtile
  - Cartes de services avec icônes Phosphor et effets de hover
  - Section de contact avec cartes d'information stylisées
  - Footer complet avec toutes les coordonnées et liens importants
  - Section "Pourquoi nous choisir" avec icônes et descriptions
  - **Carte interactive SVG** avec représentation stylisée des continents (Afrique, Europe, Amérique), courbes de Bézier pour les itinéraires, marqueurs de villes animés, et légende explicative. Couvre 40+ villes incluant Dakar, Paris, capitales de la sous-région et grandes villes internationales
  
- **States**:
  - Buttons: Hover avec scale subtil (1.02) et changement de luminosité, active avec depth
  - Cards: Élévation au hover (translate -2px + shadow), transition smooth
  - Links: Underline animé et changement de couleur au hover
  
- **Icon Selection**:
  - `Airplane` pour le fret aérien
  - `Boat` pour le fret maritime
  - `Package` pour les colis et envois
  - `Lightning` pour les envois express
  - `MapPin` pour les localisations
  - `Phone` pour les contacts téléphoniques
  - `Envelope` pour les emails
  - `CheckCircle` pour les avantages/validations
  - `Globe` pour l'international
  - `Clock` pour la rapidité
  
- **Spacing**:
  - Sections: `py-20` sur desktop, `py-12` sur mobile
  - Card padding: `p-6` à `p-8` selon l'importance
  - Stack spacing: `gap-12` entre sections majeures, `gap-6` pour groupes, `gap-4` pour éléments liés
  - Container: `max-w-7xl mx-auto px-6`
  
- **Mobile**:
  - Navigation sticky avec menu hamburger élégant
  - Grilles 3 colonnes → 1 colonne sur mobile
  - Hero section avec hauteur adaptée et texte centré
  - Cartes de services empilées verticalement
  - Formulaire de contact en pleine largeur
  - Footer en colonnes empilées sur mobile
