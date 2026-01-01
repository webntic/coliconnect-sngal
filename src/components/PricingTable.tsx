import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, X } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const services = [
  {
    name: 'Fret Maritime',
    icon: '🚢',
    basePrice: '5,000',
    perKg: '800',
    delivery: '15-30 jours',
    recommended: false,
    features: [
      { name: 'Suivi en temps réel', included: true },
      { name: 'Assurance optionnelle', included: true },
      { name: 'Conteneurs 20/40 pieds', included: true },
      { name: 'Groupage possible', included: true },
      { name: 'Priorité douane', included: false },
      { name: 'Livraison express', included: false },
    ]
  },
  {
    name: 'Fret Aérien',
    icon: '✈️',
    basePrice: '15,000',
    perKg: '2,500',
    delivery: '2-5 jours',
    recommended: true,
    features: [
      { name: 'Suivi en temps réel', included: true },
      { name: 'Assurance optionnelle', included: true },
      { name: 'Conteneurs 20/40 pieds', included: false },
      { name: 'Groupage possible', included: true },
      { name: 'Priorité douane', included: true },
      { name: 'Livraison express', included: false },
    ]
  },
  {
    name: 'Express DHL',
    icon: '⚡',
    basePrice: '25,000',
    perKg: '4,000',
    delivery: '24-48h',
    recommended: false,
    features: [
      { name: 'Suivi en temps réel', included: true },
      { name: 'Assurance optionnelle', included: true },
      { name: 'Conteneurs 20/40 pieds', included: false },
      { name: 'Groupage possible', included: false },
      { name: 'Priorité douane', included: true },
      { name: 'Livraison express', included: true },
    ]
  },
  {
    name: 'Sous-Région',
    icon: '🌍',
    basePrice: '8,000',
    perKg: '1,200',
    delivery: '3-7 jours',
    recommended: false,
    features: [
      { name: 'Suivi en temps réel', included: true },
      { name: 'Assurance optionnelle', included: true },
      { name: 'Conteneurs 20/40 pieds', included: false },
      { name: 'Groupage possible', included: true },
      { name: 'Priorité douane', included: false },
      { name: 'Livraison express', included: false },
    ]
  },
]

export function PricingTable() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comparaison des Tarifs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le service qui correspond le mieux à vos besoins et votre budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-6 h-full relative ${service.recommended ? 'border-2 border-accent shadow-lg' : ''}`}>
                {service.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1">
                      Recommandé
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {service.basePrice} <span className="text-base text-muted-foreground">FCFA</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    + {service.perKg} FCFA/kg
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {service.delivery}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-2">
                      {feature.included ? (
                        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" weight="fill" />
                      ) : (
                        <X size={18} className="text-muted-foreground/40 flex-shrink-0 mt-0.5" weight="bold" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            * Tous les tarifs sont en FCFA et peuvent varier selon la destination et les frais additionnels (assurance, douane, manutention)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
