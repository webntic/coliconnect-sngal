import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Package as PackageType, User } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, MapPin, Calendar, Package as PackageIcon, CurrencyDollar } from '@phosphor-icons/react'
import { NewPackageDialog } from './NewPackageDialog'
import { PackageCard } from './PackageCard'

interface SenderDashboardProps {
  user: User
}

export function SenderDashboard({ user }: SenderDashboardProps) {
  const [packages, setPackages] = useKV<PackageType[]>('packages', [])
  const [showNewPackage, setShowNewPackage] = useState(false)

  const userPackages = (packages || []).filter(pkg => pkg.senderId === user.id)
  const pendingPackages = userPackages.filter(pkg => pkg.status === 'pending')
  const activePackages = userPackages.filter(pkg => ['matched', 'in_transit'].includes(pkg.status))
  const completedPackages = userPackages.filter(pkg => pkg.status === 'delivered')

  const handleAddPackage = (newPackage: Omit<PackageType, 'id' | 'senderId' | 'senderName' | 'status' | 'createdAt'>) => {
    const packageToAdd: PackageType = {
      ...newPackage,
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    setPackages((current) => [...(current || []), packageToAdd])
    setShowNewPackage(false)
  }

  return (
    <div className="container max-w-7xl px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Packages</h2>
          <p className="text-muted-foreground mt-1">
            Manage your shipments and track deliveries
          </p>
        </div>
        <Button onClick={() => setShowNewPackage(true)} size="lg" className="gap-2 font-semibold">
          <Plus size={20} weight="bold" />
          New Package
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <PackageIcon size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPackages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{pendingPackages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <MapPin size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activePackages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CurrencyDollar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedPackages.length}</div>
          </CardContent>
        </Card>
      </div>

      {userPackages.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <PackageIcon size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No packages yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Create your first package request and connect with transporters going to your destination
            </p>
            <Button onClick={() => setShowNewPackage(true)} size="lg" className="gap-2">
              <Plus size={20} weight="bold" />
              Create First Package
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {activePackages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Active Shipments</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {activePackages.map(pkg => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </div>
          )}

          {pendingPackages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Awaiting Match</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pendingPackages.map(pkg => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </div>
          )}

          {completedPackages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Completed</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {completedPackages.slice(0, 4).map(pkg => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <NewPackageDialog
        open={showNewPackage}
        onClose={() => setShowNewPackage(false)}
        onSubmit={handleAddPackage}
      />
    </div>
  )
}
