import { Card } from '@/components/ui/card'
import { CheckCircle, Shield, Clock, CurrencyDollar, Headset, TrendUp } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const advantages = [
  {
    icon: Shield,
    title: 'Sécurité Garantie',
    description: 'Tous vos colis sont assurés et suivis du départ à l\'arrivée pour une tranquillité totale.',
  },
  {
    icon: Clock,
    title: 'Rapidité',
    description: 'Des délais de livraison optimisés avec nos solutions express et nos routes directes.',
  },
  {
    icon: CurrencyDollar,
    title: 'Tarifs Compétitifs',
    description: 'Les meilleurs prix du marché sans compromis sur la qualité du service.',
  },
  {
    icon: Headset,
    title: 'Support 24/7',
    description: 'Notre équipe est disponible à tout moment pour vous accompagner et vous conseiller.',
  },
  {
    icon: TrendUp,
    title: 'Suivi en Temps Réel',
    description: 'Suivez votre colis à chaque étape grâce à notre système de tracking avancé.',
  },
  {
    icon: CheckCircle,
    title: 'Fiabilité Prouvée',
    description: '15 ans d\'expérience et des milliers de clients satisfaits en Afrique et en Europe.',
  },
]

export function WhyUs() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pourquoi Choisir MBS Transport ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des avantages qui font la différence pour vos envois internationaux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                    <Icon size={32} className="text-white" weight="duotone" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
