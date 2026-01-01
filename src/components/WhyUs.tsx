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
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Pourquoi Choisir MBS Transport ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des avantages qui font la différence pour vos envois internationaux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            const gradients = [
              'from-primary to-secondary',
              'from-secondary to-accent',
              'from-accent to-primary',
              'from-primary via-accent to-secondary',
              'from-secondary via-primary to-accent',
              'from-accent via-secondary to-primary',
            ]
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group p-8 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center border-0 bg-gradient-to-br from-card to-muted/30">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[index]} mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={36} className="text-white" weight="duotone" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
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
