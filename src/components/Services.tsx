import { Card } from '@/components/ui/card'
import { Airplane, Boat, Lightning, MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Boat,
    title: 'Fret Maritime',
    description: 'Transport de marchandises par voie maritime entre le Sénégal et l\'Europe. Idéal pour les envois volumineux et économiques.',
    features: ['Containers 20 & 40 pieds', 'Groupage', 'Suivi en temps réel', 'Assurance incluse'],
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop&q=80'
  },
  {
    icon: Airplane,
    title: 'Fret Aérien',
    description: 'Expédition rapide par avion pour vos colis urgents. Livraison express entre Dakar et Paris sous 48-72h.',
    features: ['Livraison rapide', 'Priorité douane', 'Sécurisé', 'Tracking GPS'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&q=80'
  },
  {
    icon: Lightning,
    title: 'Envoi Express DHL',
    description: 'Service de messagerie internationale premium via DHL. Pour vos documents et colis prioritaires.',
    features: ['Mondial', '24-48h', 'Porte à porte', 'Garantie'],
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=500&fit=crop&q=80'
  },
  {
    icon: MapTrifold,
    title: 'Transport Sous-Région',
    description: 'Livraison dans toute la sous-région ouest-africaine. Sénégal, Mali, Guinée, Gambie et plus.',
    features: ['CEDEAO', 'Réseau étendu', 'Prix compétitifs', 'Fiabilité'],
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop&q=80'
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions de transport adaptées à tous vos besoins, du fret maritime au transport express
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card via-card to-muted/30">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg flex items-center justify-center backdrop-blur-sm">
                      <Icon size={28} className="text-white" weight="duotone" />
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-accent/15 to-secondary/15 text-accent border border-accent/30 hover:border-accent/50 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
