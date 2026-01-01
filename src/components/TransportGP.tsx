import { Card } from '@/components/ui/card'
import { Shield, Receipt, Clock, MapPin, Package, Truck, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const advantages = [
  {
    icon: Shield,
    title: 'Sécurité Garantie',
    description: 'Chaque colis est inspecté et étiqueté pour un suivi rigoureux.',
  },
  {
    icon: Receipt,
    title: 'Tarifs Transparents',
    description: 'Pas de frais cachés. Vous payez au poids ou au volume selon une grille claire.',
  },
  {
    icon: Clock,
    title: 'Rapidité',
    description: 'Nous respectons nos délais de livraison pour que vos activités ne s\'arrêtent jamais.',
  },
  {
    icon: MapPin,
    title: 'Expertise Locale',
    description: 'Basés à Dakar (HLM Grand Médine), nous maîtrisons parfaitement le terrain et les formalités douanières.',
  },
]

const processSteps = [
  {
    icon: Package,
    number: '01',
    title: 'Dépôt',
    description: 'Déposez votre colis dans l\'un de nos points de collecte (Paris, Lyon, Madrid, etc.) ou demandez un enlèvement.',
    color: 'from-primary to-secondary',
  },
  {
    icon: Truck,
    number: '02',
    title: 'Transport',
    description: 'Votre marchandise est expédiée via le mode de transport choisi. Vous recevez une notification à l\'embarquement.',
    color: 'from-secondary to-accent',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Retrait/Livraison',
    description: 'Récupérez votre colis à notre agence de Dakar ou faites-vous livrer directement à domicile.',
    color: 'from-accent to-primary',
  },
]

export function TransportGP() {
  return (
    <section id="transport-gp" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Transport GP
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Service de transport de colis entre particuliers avec suivi et sécurité garantis
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi nous choisir ?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des avantages qui font toute la différence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <Card className="group p-6 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center border-0 bg-gradient-to-br from-card to-muted/30">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={28} className="text-white" weight="duotone" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {advantage.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {advantage.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un processus simple en 3 étapes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 -z-10" />
            
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <Card className="group p-8 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center border-0 bg-gradient-to-br from-card to-muted/30 relative overflow-hidden">
                    <div className={`absolute top-4 right-4 text-8xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-10`}>
                      {step.number}
                    </div>
                    
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                      <Icon size={36} className="text-white" weight="duotone" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors relative z-10">
                      {step.title}
                    </h4>
                    
                    <p className="text-muted-foreground leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
            <h4 className="text-2xl font-bold text-foreground mb-4">
              Prêt à expédier vos colis ?
            </h4>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits qui nous font confiance pour leurs envois internationaux
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/221773068652"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Contactez-nous
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
