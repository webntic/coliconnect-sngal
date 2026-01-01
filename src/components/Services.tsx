import { Card } from '@/components/ui/card'
import { Airplane, Boat, Lightning, MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Boat,
    title: 'Fret Maritime',
    description: 'Transport de marchandises par voie maritime entre le Sénégal et l\'Europe. Idéal pour les envois volumineux et économiques.',
    features: ['Containers 20 & 40 pieds', 'Groupage', 'Suivi en temps réel', 'Assurance incluse'],
  },
  {
    icon: Airplane,
    title: 'Fret Aérien',
    description: 'Expédition rapide par avion pour vos colis urgents. Livraison express entre Dakar et Paris sous 48-72h.',
    features: ['Livraison rapide', 'Priorité douane', 'Sécurisé', 'Tracking GPS'],
  },
  {
    icon: Lightning,
    title: 'Envoi Express DHL',
    description: 'Service de messagerie internationale premium via DHL. Pour vos documents et colis prioritaires.',
    features: ['Mondial', '24-48h', 'Porte à porte', 'Garantie'],
  },
  {
    icon: MapTrifold,
    title: 'Transport Sous-Région',
    description: 'Livraison dans toute la sous-région ouest-africaine. Sénégal, Mali, Guinée, Gambie et plus.',
    features: ['CEDEAO', 'Réseau étendu', 'Prix compétitifs', 'Fiabilité'],
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
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={28} className="text-primary" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                      >
                        {feature}
                      </span>
                    ))}
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
