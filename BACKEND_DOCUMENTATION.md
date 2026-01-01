# Documentation Backend - MBS Transport

## Architecture

Cette application **n'utilise pas de serveur backend traditionnel** (Node.js, PHP, etc.). Elle fonctionne entièrement en **frontend** avec le SDK Spark pour la persistance des données.

---

## 🔧 Persistance des Données avec Spark KV

Toutes les données sont stockées localement dans le navigateur via l'API **Spark KV** (Key-Value store).

### Hooks de Persistance

#### `use-auth.ts` - Gestion de l'Authentification
**Localisation**: `/src/hooks/use-auth.ts`

**Données stockées**:
```typescript
interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'sender' | 'transporter'
  vehicleInfo?: string
  vehicleType?: string
}

// Clé KV: "mbs-current-user"
```

**Fonctionnalités**:
- `login(user)` - Connexion d'un utilisateur
- `logout()` - Déconnexion
- `updateUser(updates)` - Mise à jour du profil
- `isAuthenticated` - État de connexion
- `currentUser` - Utilisateur actuel

---

#### `use-messaging.ts` - Système de Messagerie
**Localisation**: `/src/hooks/use-messaging.ts`

**Données stockées**:
```typescript
interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  text: string
  timestamp: number
  read: boolean
}

interface Conversation {
  id: string
  senderId: string
  senderName: string
  transporterId: string
  transporterName: string
  packageId?: string
  packageTitle?: string
  routeId?: string
  routeTitle?: string
  lastMessage?: string
  lastMessageTime?: number
  unreadCount: number
}

// Clés KV:
// - "mbs-messages" - Tous les messages
// - "mbs-conversations" - Toutes les conversations
```

**Fonctionnalités**:
- `sendMessage(conversationId, text)` - Envoyer un message
- `startConversation(params)` - Démarrer une conversation
- `getConversation(id)` - Récupérer une conversation
- `getConversationMessages(id)` - Messages d'une conversation
- `markAsRead(conversationId)` - Marquer messages comme lus
- `getUserConversations()` - Conversations de l'utilisateur actuel
- `getUnreadCount()` - Nombre total de messages non lus

---

## 📦 Structures de Données

### Envois (Packages)
**Gérés dans**: `/src/components/SenderDashboard.tsx`

```typescript
interface Package {
  id: string
  senderId: string
  senderName: string
  title: string
  description: string
  size: 'small' | 'medium' | 'large' | 'gp'  // GP = Gros Poids (>50kg)
  weight: number  // en kg
  origin: string
  destination: string
  preferredDate: string
  price: number  // en FCFA
  status: 'pending' | 'in-transit' | 'delivered'
  createdAt: number
}

// Clé KV: "mbs-packages"
```

**Opérations**:
- Créer un envoi
- Lister tous les envois
- Filtrer par statut (en attente, en transit, livrés)
- Supprimer un envoi

---

### Itinéraires (Routes)
**Gérés dans**: `/src/components/TransporterDashboard.tsx`

```typescript
interface Route {
  id: string
  transporterId: string
  transporterName: string
  origin: string
  destination: string
  departureDate: string
  arrivalDate: string
  vehicleType: string
  capacity: number  // en kg
  pricePerKg: number  // Prix au kg pour GP (Gros Poids)
  status: 'upcoming' | 'completed'
  createdAt: number
}

// Clé KV: "mbs-routes"
```

**Opérations**:
- Créer un itinéraire
- Lister tous les itinéraires
- Filtrer par statut (à venir, passés)
- Supprimer un itinéraire

---

### Devis Sauvegardés
**Gérés dans**: `/src/components/QuoteCalculator.tsx`

```typescript
interface SavedQuote {
  id: string
  service: string
  destination: string
  weight: number
  length?: number
  width?: number
  height?: number
  insurance: boolean
  declaredValue?: number
  basePrice: number
  weightCost: number
  volumetricWeight?: number
  insuranceCost: number
  customsFees: number
  handlingFees: number
  total: number
  deliveryTime: string
  createdAt: number
}

// Clé KV: "mbs-saved-quotes"
// Maximum: 5 devis sauvegardés (les plus récents)
```

**Opérations**:
- Sauvegarder un devis
- Lister les devis sauvegardés (5 max)
- Supprimer un devis

---

## 🗺️ Carte Interactive

### Données Géographiques
**Localisation**: `/src/components/RouteMap.tsx`

**Villes référencées** (40+ villes):

**Sénégal**:
- Dakar, Saint-Louis, Thiès, Kaolack, Ziguinchor, Tambacounda, Louga, Diourbel

**Afrique de l'Ouest**:
- Bamako (Mali), Conakry (Guinée), Abidjan (Côte d'Ivoire), Ouagadougou (Burkina Faso)
- Niamey (Niger), Lomé (Togo), Cotonou (Bénin), Accra (Ghana), Banjul (Gambie)
- Bissau (Guinée-Bissau), Freetown (Sierra Leone), Monrovia (Liberia), Nouakchott (Mauritanie)

**Europe**:
- Paris, Marseille, Lyon, Toulouse, Bordeaux, Nantes, Lille, Strasbourg, Nice, Montpellier (France)
- Londres (UK), Madrid (Espagne), Rome (Italie), Berlin (Allemagne), Bruxelles (Belgique)

**Amérique du Nord**:
- New York, Miami, Los Angeles, Washington DC, Montréal

**Fonctionnalités de la carte**:
- Représentation stylisée des continents (SVG)
- Itinéraires tracés avec courbes de Bézier animées
- Marqueurs de villes avec animations au hover
- Légende pour différencier envois et routes
- Animations progressives avec framer-motion

---

## 🔐 Codes d'Accès de Test

**Fichier**: `/workspaces/spark-template/CODES_ACCES.md`

Ces codes peuvent être utilisés pour tester l'application avec des utilisateurs pré-configurés.

---

## 📱 API Externe

### WhatsApp Business
**Composant**: `/src/components/WhatsAppButton.tsx`

**Configuration**:
```typescript
const WHATSAPP_NUMBER = "+221730615151"  // Numéro Sénégal
const message = "Bonjour MBS Transport, j'aimerais obtenir plus d'informations sur vos services."
```

Le bouton ouvre WhatsApp Web/App avec un message pré-rempli.

---

## 🔄 Flux de Données

### 1. Authentification
```
User → AuthScreen → useAuth.login() → 
spark.kv.set("mbs-current-user") → Dashboard
```

### 2. Création d'Envoi (Expéditeur)
```
SenderDashboard → NewPackageDialog → 
spark.kv.get("mbs-packages") → 
Add new package → 
spark.kv.set("mbs-packages") → 
Mise à jour de la liste
```

### 3. Création d'Itinéraire (Transporteur)
```
TransporterDashboard → NewRouteDialog → 
spark.kv.get("mbs-routes") → 
Add new route → 
spark.kv.set("mbs-routes") → 
Mise à jour de la liste + Carte
```

### 4. Messagerie
```
User clique "Contacter" → 
startConversation() → 
spark.kv.get/set("mbs-conversations") → 
MessagingSystem → 
sendMessage() → 
spark.kv.get/set("mbs-messages") → 
Notification badge mis à jour
```

---

## 🛠️ API Spark Utilisées

### Persistance (KV Store)
```typescript
// Récupérer des données
const data = await spark.kv.get<Type>("key")

// Sauvegarder des données
await spark.kv.set("key", data)

// Supprimer des données
await spark.kv.delete("key")

// Lister toutes les clés
const keys = await spark.kv.keys()
```

### Hook React pour Persistance
```typescript
import { useKV } from '@github/spark/hooks'

const [data, setData, deleteData] = useKV("key", defaultValue)

// ✅ CORRECT - Toujours utiliser functional updates
setData((current) => [...current, newItem])

// ❌ INCORRECT - Ne pas référencer directement
setData([...data, newItem])  // data peut être périmé!
```

---

## 📊 Schéma de Données Complet

```
spark.kv
│
├─ "mbs-current-user": User | null
│
├─ "mbs-packages": Package[]
│
├─ "mbs-routes": Route[]
│
├─ "mbs-messages": Message[]
│
├─ "mbs-conversations": Conversation[]
│
└─ "mbs-saved-quotes": SavedQuote[] (max 5)
```

---

## 🚀 Évolutions Futures Possibles

Pour transformer cette application en une vraie architecture backend, vous pourriez:

### Option 1: Backend Firebase
- Firebase Authentication pour les utilisateurs
- Firestore pour les packages, routes, messages
- Cloud Functions pour la logique métier
- Firebase Hosting pour le déploiement

### Option 2: Backend Node.js + MongoDB
- Express.js pour l'API REST
- MongoDB pour la base de données
- Socket.io pour la messagerie en temps réel
- JWT pour l'authentification

### Option 3: Supabase
- Authentification intégrée
- PostgreSQL pour les données
- Realtime subscriptions pour la messagerie
- Row Level Security pour la sécurité

---

## 📝 Notes Importantes

1. **Données locales**: Toutes les données sont stockées dans le navigateur. Si l'utilisateur vide son cache, les données sont perdues.

2. **Multi-utilisateurs**: Chaque navigateur a sa propre base de données locale. Les utilisateurs ne voient pas les données des autres.

3. **Pas de synchronisation**: Les données ne sont pas synchronisées entre appareils ou navigateurs différents.

4. **Sécurité**: Il n'y a pas de validation côté serveur. N'importe qui peut modifier les données dans son navigateur.

5. **Messagerie**: Les messages sont simulés localement. Dans un environnement de production, il faudrait un vrai backend avec WebSockets ou Server-Sent Events.

---

## 🔍 Comment Inspecter les Données

### Dans la Console du Navigateur
```javascript
// Voir toutes les clés
await spark.kv.keys()

// Voir les utilisateurs
await spark.kv.get("mbs-current-user")

// Voir tous les packages
await spark.kv.get("mbs-packages")

// Voir toutes les routes
await spark.kv.get("mbs-routes")

// Voir tous les messages
await spark.kv.get("mbs-messages")

// Voir toutes les conversations
await spark.kv.get("mbs-conversations")

// Effacer toutes les données (reset)
await spark.kv.delete("mbs-current-user")
await spark.kv.delete("mbs-packages")
await spark.kv.delete("mbs-routes")
await spark.kv.delete("mbs-messages")
await spark.kv.delete("mbs-conversations")
await spark.kv.delete("mbs-saved-quotes")
```

---

## 📞 Support

Pour toute question sur le backend ou l'architecture:
- **Sénégal**: +221 730 615 15
- **France**: +33 7 53 34 35 39
- **Email**: contact@mbstransport.com
