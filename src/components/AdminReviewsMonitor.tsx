import { useMemo, useState } from 'react'
import { Review, User } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Star, UserCircle, Truck, Calendar } from '@phosphor-icons/react'

interface AdminReviewsMonitorProps {
  reviews: Review[]
  users: User[]
  searchQuery: string
}

export function AdminReviewsMonitor({ reviews, users, searchQuery }: AdminReviewsMonitorProps) {
  const [ratingFilter, setRatingFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent')

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(review =>
        review.reviewerName.toLowerCase().includes(query) ||
        review.comment.toLowerCase().includes(query) ||
        review.id.includes(query)
      )
    }

    if (ratingFilter !== 'all') {
      const targetRating = parseInt(ratingFilter)
      filtered = filtered.filter(review => review.rating === targetRating)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [reviews, searchQuery, ratingFilter, sortBy])

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            weight={star <= rating ? 'fill' : 'regular'}
            className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
          />
        ))}
      </div>
    )
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600'
    if (rating >= 3) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star size={24} />
              Moniteur d'Avis
            </CardTitle>
            <CardDescription>
              {filteredAndSortedReviews.length} avis affiché{filteredAndSortedReviews.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={ratingFilter} onValueChange={(v) => setRatingFilter(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Note" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les notes</SelectItem>
                <SelectItem value="5">5 étoiles</SelectItem>
                <SelectItem value="4">4 étoiles</SelectItem>
                <SelectItem value="3">3 étoiles</SelectItem>
                <SelectItem value="2">2 étoiles</SelectItem>
                <SelectItem value="1">1 étoile</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Évaluateur</TableHead>
                <TableHead>Évalué</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun avis trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedReviews.map(review => {
                  const reviewer = getUserById(review.reviewerId)
                  const reviewee = getUserById(review.revieweeId)

                  return (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {reviewer?.role === 'sender' ? (
                              <UserCircle className="text-primary" size={18} />
                            ) : (
                              <Truck className="text-primary" size={18} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{review.reviewerName}</p>
                            {reviewer && (
                              <Badge variant="outline" className="text-xs">
                                {reviewer.role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            {reviewee?.role === 'sender' ? (
                              <UserCircle className="text-accent" size={18} />
                            ) : (
                              <Truck className="text-accent" size={18} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {reviewee?.name || 'Utilisateur inconnu'}
                            </p>
                            {reviewee && (
                              <Badge variant="outline" className="text-xs">
                                {reviewee.role === 'sender' ? 'Expéditeur' : 'Transporteur'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {renderStars(review.rating)}
                          <div className={`text-xl font-bold ${getRatingColor(review.rating)}`}>
                            {review.rating}/5
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                          {review.comment}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                          {review.transactionId.slice(0, 12)}...
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span>
                            {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
