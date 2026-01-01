import { User, Route } from './types'

export async function seedTestDepartures() {
  const spark = window.spark
  
  const existingUsers = await spark.kv.get<User[]>('users') || []
  const existingRoutes = await spark.kv.get<Route[]>('routes') || []
  
  const testTransporters: User[] = [
    {
      id: 'test-transporter-1',
      name: 'Amadou Diallo',
      email: 'amadou.diallo@test.com',
      phone: '+221 77 123 45 67',
      role: 'transporter',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 4.8,
      totalTransactions: 45,
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'test-transporter-2',
      name: 'Fatou Seck',
      email: 'fatou.seck@test.com',
      phone: '+221 77 234 56 78',
      role: 'transporter',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4.9,
      totalTransactions: 62,
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'test-transporter-3',
      name: 'Moussa Kane',
      email: 'moussa.kane@test.com',
      phone: '+221 77 345 67 89',
      role: 'transporter',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 4.7,
      totalTransactions: 38,
      verified: true,
      createdAt: new Date().toISOString()
    }
  ]

  const updatedUsers = [...existingUsers]
  
  testTransporters.forEach(transporter => {
    const existingIndex = updatedUsers.findIndex(u => u.id === transporter.id)
    if (existingIndex >= 0) {
      updatedUsers[existingIndex] = transporter
    } else {
      updatedUsers.push(transporter)
    }
  })
  
  await spark.kv.set('users', updatedUsers)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  
  const nextTwoWeeks = new Date(today)
  nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14)

  const testRoutes: Route[] = [
    {
      id: 'test-route-1',
      transporterId: 'test-transporter-1',
      transporterName: 'Amadou Diallo',
      transporterRating: 4.8,
      origin: 'Paris (France)',
      destination: 'Dakar (Sénégal)',
      departureDate: new Date(nextWeek.setHours(14, 30, 0, 0)).toISOString(),
      arrivalDate: new Date(nextWeek.setHours(20, 15, 0, 0)).toISOString(),
      vehicleType: 'Avion - Vol Air France AF718',
      availableCapacity: '25 kg disponibles',
      pricePerKg: 8.5,
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'test-route-2',
      transporterId: 'test-transporter-2',
      transporterName: 'Fatou Seck',
      transporterRating: 4.9,
      origin: 'Lyon (France)',
      destination: 'Dakar (Sénégal)',
      departureDate: new Date(nextTwoWeeks.setHours(10, 0, 0, 0)).toISOString(),
      arrivalDate: new Date(nextTwoWeeks.setHours(16, 30, 0, 0)).toISOString(),
      vehicleType: 'Avion - Vol Turkish Airlines TK1830',
      availableCapacity: '30 kg disponibles',
      pricePerKg: 7.9,
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'test-route-3',
      transporterId: 'test-transporter-3',
      transporterName: 'Moussa Kane',
      transporterRating: 4.7,
      origin: 'Madrid (Espagne)',
      destination: 'Dakar (Sénégal)',
      departureDate: new Date(tomorrow.setDate(tomorrow.getDate() + 5)).toISOString(),
      arrivalDate: new Date(tomorrow.setHours(tomorrow.getHours() + 5)).toISOString(),
      vehicleType: 'Avion - Vol Iberia IB3321',
      availableCapacity: '20 kg disponibles',
      pricePerKg: 9.2,
      verified: true,
      createdAt: new Date().toISOString()
    }
  ]

  const updatedRoutes = [...existingRoutes]
  
  testRoutes.forEach(route => {
    const existingIndex = updatedRoutes.findIndex(r => r.id === route.id)
    if (existingIndex >= 0) {
      updatedRoutes[existingIndex] = route
    } else {
      updatedRoutes.push(route)
    }
  })
  
  await spark.kv.set('routes', updatedRoutes)

  return {
    transportersAdded: testTransporters.length,
    routesAdded: testRoutes.length
  }
}
