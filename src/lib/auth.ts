import { AdminCredentials, UserCredentials } from './types'

declare const spark: {
  kv: {
    get: <T>(key: string) => Promise<T | undefined>
    set: <T>(key: string, value: T) => Promise<void>
  }
}

const DEFAULT_ADMIN: AdminCredentials = {
  username: 'admin@mbstransport',
  password: 'MBS2024Admin!'
}

export async function initializeAdminCredentials(): Promise<void> {
  const storedAdmin = await spark.kv.get<AdminCredentials>('admin-credentials')
  
  if (!storedAdmin) {
    await spark.kv.set('admin-credentials', DEFAULT_ADMIN)
  }
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  await initializeAdminCredentials()
  
  const storedAdmin = await spark.kv.get<AdminCredentials>('admin-credentials')
  
  if (!storedAdmin) return false
  
  return storedAdmin.username === username && storedAdmin.password === password
}

export async function updateAdminCredentials(newUsername: string, newPassword: string): Promise<void> {
  const newCredentials: AdminCredentials = {
    username: newUsername,
    password: newPassword
  }
  
  await spark.kv.set('admin-credentials', newCredentials)
}

export async function registerUser(email: string, password: string, userId: string, role: 'sender' | 'transporter'): Promise<void> {
  const credentials: UserCredentials = {
    email: email.toLowerCase(),
    password,
    userId,
    role
  }
  
  const allCredentials = await spark.kv.get<UserCredentials[]>('user-credentials') || []
  
  const existingIndex = allCredentials.findIndex(c => c.email === credentials.email)
  
  if (existingIndex >= 0) {
    allCredentials[existingIndex] = credentials
  } else {
    allCredentials.push(credentials)
  }
  
  await spark.kv.set('user-credentials', allCredentials)
}

export async function verifyUserCredentials(email: string, password: string): Promise<UserCredentials | null> {
  const allCredentials = await spark.kv.get<UserCredentials[]>('user-credentials') || []
  
  const credentials = allCredentials.find(c => 
    c.email === email.toLowerCase() && c.password === password
  )
  
  return credentials || null
}

export function hashPassword(password: string): string {
  return password
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' }
  }
  
  return { valid: true }
}
