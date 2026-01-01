export type UserRole = 'sender' | 'transporter' | 'admin'

export type PackageSize = 'small' | 'medium' | 'large' | 'xlarge' | 'gp'

export type PackageStatus = 'pending' | 'matched' | 'in_transit' | 'delivered' | 'cancelled'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  rating: number
  totalTransactions: number
  verified: boolean
  createdAt: string
}

export interface Package {
  id: string
  senderId: string
  senderName: string
  title: string
  description: string
  size: PackageSize
  weight: number
  origin: string
  destination: string
  pickupDate: string
  deliveryDeadline: string
  price: number
  status: PackageStatus
  transporterId?: string
  createdAt: string
}

export interface Route {
  id: string
  transporterId: string
  transporterName: string
  transporterRating: number
  origin: string
  destination: string
  departureDate: string
  arrivalDate: string
  vehicleType: string
  availableCapacity: string
  pricePerKg: number
  verified: boolean
  createdAt: string
}

export interface Match {
  id: string
  packageId: string
  routeId: string
  compatibilityScore: number
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: UserRole
  receiverId: string
  content: string
  timestamp: string
  read: boolean
  packageId?: string
  routeId?: string
}

export interface Conversation {
  id: string
  participant1Id: string
  participant1Name: string
  participant1Role: UserRole
  participant2Id: string
  participant2Name: string
  participant2Role: UserRole
  lastMessage?: string
  lastMessageTime?: string
  unreadCount: number
  packageId?: string
  routeId?: string
  createdAt: string
}

export interface Review {
  id: string
  reviewerId: string
  reviewerName: string
  revieweeId: string
  rating: number
  comment: string
  transactionId: string
  createdAt: string
}

export interface AdminCredentials {
  username: string
  password: string
}

export interface UserCredentials {
  email: string
  password: string
  userId: string
  role: UserRole
}
