import { useState, useEffect } from 'react'
import { Route, Package as PackageType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface RouteMapProps {
  routes?: Route[]
  packages?: PackageType[]
  selectedRoute?: Route | null
  selectedPackage?: PackageType | null
  onRouteSelect?: (route: Route) => void
  onPackageSelect?: (pkg: PackageType) => void
}

interface CityCoordinates {
  [key: string]: { x: number; y: number; label: string }
}

const cityCoordinates: CityCoordinates = {
  'dakar': { x: 320, y: 280, label: 'Dakar' },
  'senegal': { x: 320, y: 280, label: 'Sénégal' },
  'paris': { x: 480, y: 120, label: 'Paris' },
  'france': { x: 480, y: 120, label: 'France' },
  'bagneux': { x: 475, y: 125, label: 'Bagneux' },
  'ziguinchor': { x: 310, y: 310, label: 'Ziguinchor' },
  'thies': { x: 340, y: 275, label: 'Thiès' },
  'saint-louis': { x: 330, y: 240, label: 'Saint-Louis' },
  'kaolack': { x: 350, y: 290, label: 'Kaolack' },
  'touba': { x: 355, y: 270, label: 'Touba' },
  'mbour': { x: 335, y: 285, label: 'Mbour' },
  'tambacounda': { x: 420, y: 290, label: 'Tambacounda' },
  'kolda': { x: 380, y: 305, label: 'Kolda' },
  'bamako': { x: 450, y: 305, label: 'Bamako' },
  'mali': { x: 450, y: 305, label: 'Mali' },
  'abidjan': { x: 400, y: 350, label: 'Abidjan' },
  'cote d\'ivoire': { x: 400, y: 350, label: 'Côte d\'Ivoire' },
  'conakry': { x: 360, y: 330, label: 'Conakry' },
  'guinee': { x: 360, y: 330, label: 'Guinée' },
  'banjul': { x: 300, y: 290, label: 'Banjul' },
  'gambie': { x: 300, y: 290, label: 'Gambie' },
  'bissau': { x: 290, y: 305, label: 'Bissau' },
  'guinee-bissau': { x: 290, y: 305, label: 'Guinée-Bissau' },
  'nouakchott': { x: 280, y: 240, label: 'Nouakchott' },
  'mauritanie': { x: 280, y: 240, label: 'Mauritanie' },
  'accra': { x: 430, y: 360, label: 'Accra' },
  'ghana': { x: 430, y: 360, label: 'Ghana' },
  'lome': { x: 440, y: 360, label: 'Lomé' },
  'togo': { x: 440, y: 360, label: 'Togo' },
  'cotonou': { x: 460, y: 360, label: 'Cotonou' },
  'benin': { x: 460, y: 360, label: 'Bénin' },
  'lagos': { x: 480, y: 365, label: 'Lagos' },
  'nigeria': { x: 480, y: 365, label: 'Nigeria' },
  'london': { x: 460, y: 100, label: 'Londres' },
  'royaume-uni': { x: 460, y: 100, label: 'Royaume-Uni' },
  'bruxelles': { x: 490, y: 110, label: 'Bruxelles' },
  'belgique': { x: 490, y: 110, label: 'Belgique' },
  'madrid': { x: 450, y: 150, label: 'Madrid' },
  'espagne': { x: 450, y: 150, label: 'Espagne' },
  'rome': { x: 520, y: 150, label: 'Rome' },
  'italie': { x: 520, y: 150, label: 'Italie' },
  'berlin': { x: 520, y: 100, label: 'Berlin' },
  'allemagne': { x: 520, y: 100, label: 'Allemagne' },
  'lisbonne': { x: 420, y: 160, label: 'Lisbonne' },
  'portugal': { x: 420, y: 160, label: 'Portugal' },
  'casablanca': { x: 400, y: 180, label: 'Casablanca' },
  'maroc': { x: 400, y: 180, label: 'Maroc' },
  'alger': { x: 470, y: 170, label: 'Alger' },
  'algerie': { x: 470, y: 170, label: 'Algérie' },
  'tunis': { x: 510, y: 165, label: 'Tunis' },
  'tunisie': { x: 510, y: 165, label: 'Tunisie' },
  'new york': { x: 150, y: 140, label: 'New York' },
  'usa': { x: 150, y: 180, label: 'USA' },
  'etats-unis': { x: 150, y: 180, label: 'États-Unis' },
  'montreal': { x: 170, y: 120, label: 'Montréal' },
  'canada': { x: 170, y: 120, label: 'Canada' },
  'default': { x: 400, y: 250, label: 'Autre' }
}

function getCityCoordinates(location: string): { x: number; y: number; label: string } {
  const normalized = location.toLowerCase().trim()
  
  for (const [key, coords] of Object.entries(cityCoordinates)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coords
    }
  }
  
  return cityCoordinates.default
}

function generatePathBetweenPoints(
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number
): string {
  const midX = (x1 + x2) / 2
  const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.3
  
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`
}

export function RouteMap({
  routes = [],
  packages = [],
  selectedRoute,
  selectedPackage,
  onRouteSelect,
  onPackageSelect
}: RouteMapProps) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  const allRoutes = routes.map(route => {
    const origin = getCityCoordinates(route.origin)
    const destination = getCityCoordinates(route.destination)
    const path = generatePathBetweenPoints(origin.x, origin.y, destination.x, destination.y)
    
    return {
      ...route,
      originCoords: origin,
      destinationCoords: destination,
      path
    }
  })

  const allPackages = packages.map(pkg => {
    const origin = getCityCoordinates(pkg.origin)
    const destination = getCityCoordinates(pkg.destination)
    const path = generatePathBetweenPoints(origin.x, origin.y, destination.x, destination.y)
    
    return {
      ...pkg,
      originCoords: origin,
      destinationCoords: destination,
      path
    }
  })

  const uniqueCities = new Set<string>()
  allRoutes.forEach(route => {
    uniqueCities.add(route.origin.toLowerCase())
    uniqueCities.add(route.destination.toLowerCase())
  })
  allPackages.forEach(pkg => {
    uniqueCities.add(pkg.origin.toLowerCase())
    uniqueCities.add(pkg.destination.toLowerCase())
  })

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin size={24} className="text-primary" />
          Carte des Itinéraires
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full bg-gradient-to-br from-blue-50 via-orange-50 to-blue-50 overflow-hidden">
          <svg
            viewBox="0 0 800 500"
            className="w-full h-auto"
            style={{ minHeight: '400px' }}
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(0,0,0,0.02)"
                  strokeWidth="1"
                />
              </pattern>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="oklch(0.42 0.15 240)"
                />
              </marker>

              <marker
                id="arrowhead-package"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="oklch(0.72 0.19 50)"
                />
              </marker>
            </defs>

            <rect width="800" height="500" fill="url(#grid)" />

            <g className="continents" opacity="0.15">
              <path
                d="M 250 100 Q 350 120 450 100 Q 550 80 600 110 L 600 200 Q 550 220 500 210 Q 450 200 400 190 Q 350 180 300 200 L 250 180 Z"
                fill="oklch(0.42 0.15 240)"
              />
              
              <path
                d="M 250 220 Q 300 240 350 260 Q 400 280 450 300 Q 500 320 520 360 L 480 390 Q 440 380 400 370 Q 350 360 300 340 Q 260 320 240 280 Z"
                fill="oklch(0.42 0.15 240)"
              />
              
              <path
                d="M 100 120 Q 150 140 180 160 Q 200 180 210 210 L 180 240 Q 160 220 130 200 Q 100 180 80 160 Z"
                fill="oklch(0.42 0.15 240)"
              />
            </g>

            <g className="package-routes">
              {allPackages.map((pkg, index) => {
                const isHovered = hoveredPackage === pkg.id
                const isSelected = selectedPackage?.id === pkg.id
                const opacity = isHovered || isSelected ? 1 : 0.4
                
                return (
                  <g key={`package-${pkg.id}`}>
                    <motion.path
                      d={pkg.path}
                      fill="none"
                      stroke="oklch(0.72 0.19 50)"
                      strokeWidth={isHovered || isSelected ? "3" : "2"}
                      strokeDasharray="8,4"
                      opacity={opacity}
                      markerEnd="url(#arrowhead-package)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: opacity,
                        strokeWidth: isHovered || isSelected ? 3 : 2
                      }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.1,
                        ease: "easeInOut"
                      }}
                      onMouseEnter={() => setHoveredPackage(pkg.id)}
                      onMouseLeave={() => setHoveredPackage(null)}
                      onClick={() => onPackageSelect?.(pkg)}
                      className="cursor-pointer"
                      filter={isHovered || isSelected ? "url(#glow)" : undefined}
                    />
                  </g>
                )
              })}
            </g>

            <g className="transport-routes">
              {allRoutes.map((route, index) => {
                const isHovered = hoveredRoute === route.id
                const isSelected = selectedRoute?.id === route.id
                const opacity = isHovered || isSelected ? 1 : 0.6
                
                return (
                  <g key={`route-${route.id}`}>
                    <motion.path
                      d={route.path}
                      fill="none"
                      stroke="oklch(0.42 0.15 240)"
                      strokeWidth={isHovered || isSelected ? "4" : "2.5"}
                      opacity={opacity}
                      markerEnd="url(#arrowhead)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: opacity,
                        strokeWidth: isHovered || isSelected ? 4 : 2.5
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.15,
                        ease: "easeInOut"
                      }}
                      onMouseEnter={() => setHoveredRoute(route.id)}
                      onMouseLeave={() => setHoveredRoute(null)}
                      onClick={() => onRouteSelect?.(route)}
                      className="cursor-pointer"
                      filter={isHovered || isSelected ? "url(#glow)" : undefined}
                    />
                  </g>
                )
              })}
            </g>

            <g className="city-markers">
              {Array.from(uniqueCities).map(cityKey => {
                const coords = getCityCoordinates(cityKey)
                const hasRoute = allRoutes.some(
                  r => r.origin.toLowerCase() === cityKey || r.destination.toLowerCase() === cityKey
                )
                const hasPackage = allPackages.some(
                  p => p.origin.toLowerCase() === cityKey || p.destination.toLowerCase() === cityKey
                )
                
                return (
                  <g key={cityKey}>
                    <motion.circle
                      cx={coords.x}
                      cy={coords.y}
                      r={hasRoute || hasPackage ? 8 : 6}
                      fill={hasRoute ? "oklch(0.42 0.15 240)" : hasPackage ? "oklch(0.72 0.19 50)" : "oklch(0.55 0.01 240)"}
                      stroke="white"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="drop-shadow-lg"
                    />
                    <motion.text
                      x={coords.x}
                      y={coords.y - 15}
                      textAnchor="middle"
                      fill="oklch(0.25 0.01 240)"
                      fontSize="12"
                      fontWeight="600"
                      initial={{ opacity: 0, y: coords.y - 10 }}
                      animate={{ opacity: 1, y: coords.y - 15 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="drop-shadow"
                    >
                      {coords.label}
                    </motion.text>
                  </g>
                )
              })}
            </g>
          </svg>
        </div>

        <div className="p-4 border-t bg-muted/30">
          <div className="flex flex-wrap gap-4 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-primary"></div>
              <span className="text-muted-foreground">Itinéraires Transporteurs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-accent border-t-2 border-dashed border-accent"></div>
              <span className="text-muted-foreground">Demandes d'Envoi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-white"></div>
              <span className="text-muted-foreground">Villes Desservies</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
