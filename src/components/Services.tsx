import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Airplane, Boat, Lightning, MapTrifold, CheckCircle, ArrowRight, Package } from '@phosphor-icons/react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect } from 'react'

const services = [
  {
    icon: Boat,
    title: 'Fret Maritime',
    description: 'Transport de marchandises par voie maritime entre le Sénégal et l\'Europe. Idéal pour les envois volumineux et économiques.',
    features: ['Containers 20 & 40 pieds', 'Groupage', 'Suivi en temps réel', 'Assurance incluse'],
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop&q=80',
    stats: { value: 5000, label: 'Tonnes transportées/mois', suffix: '+' },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Airplane,
    title: 'Fret Aérien',
    description: 'Expédition rapide par avion pour vos colis urgents. Livraison express entre Dakar et Paris sous 48-72h.',
    features: ['Livraison rapide', 'Priorité douane', 'Sécurisé', 'Tracking GPS'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&q=80',
    stats: { value: 48, label: 'Heures de livraison', suffix: 'h' },
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Lightning,
    title: 'Envoi Express DHL',
    description: 'Service de messagerie internationale premium via DHL. Pour vos documents et colis prioritaires.',
    features: ['Mondial', '24-48h', 'Porte à porte', 'Garantie'],
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=500&fit=crop&q=80',
    stats: { value: 220, label: 'Pays desservis', suffix: '+' },
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: MapTrifold,
    title: 'Transport Sous-Région',
    description: 'Livraison dans toute la sous-région ouest-africaine. Sénégal, Mali, Guinée, Gambie et plus.',
    features: ['CEDEAO', 'Réseau étendu', 'Prix compétitifs', 'Fiabilité'],
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop&q=80',
    stats: { value: 15, label: 'Pays de la CEDEAO', suffix: '' },
    color: 'from-green-500 to-emerald-500'
  },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" })
      return controls.stop
    }
  }, [inView, count, value])

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest))
  }, [rounded])

  return (
    <span className="text-4xl font-bold">
      {displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function Services() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-full mb-6"
          >
            <Package size={24} weight="duotone" className="text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Excellence en Transport
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Nos Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Des solutions de transport adaptées à tous vos besoins, du fret maritime au transport express. 
            Rapidité, sécurité et transparence garanties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            const isActive = activeService === index
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setActiveService(index)}
                onHoverEnd={() => setActiveService(null)}
              >
                <Card className="group relative overflow-hidden h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-700 bg-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative h-72 overflow-hidden">
                    <motion.img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: isActive ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                      style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                    />

                    <motion.div
                      className={`absolute top-6 right-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} shadow-2xl flex items-center justify-center backdrop-blur-sm`}
                      animate={{
                        rotate: isActive ? 360 : 0,
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.7 }}
                    >
                      <Icon size={32} className="text-white" weight="duotone" />
                    </motion.div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <AnimatedCounter 
                          value={service.stats.value} 
                          suffix={service.stats.suffix}
                          inView={true}
                        />
                        <p className="text-white/90 text-sm font-medium mt-1">
                          {service.stats.label}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="relative p-8 space-y-5">
                    <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.span
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * featureIndex }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-accent/10 to-secondary/10 text-accent border border-accent/20 hover:border-accent/40 hover:scale-105 transition-all duration-300"
                        >
                          <CheckCircle size={16} weight="fill" />
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      className="pt-4"
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        En savoir plus
                        <ArrowRight size={20} weight="bold" className="ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white font-bold px-12 py-8 text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            onClick={() => {
              const element = document.getElementById('contact')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Demander un Devis Gratuit
            <ArrowRight size={24} weight="bold" className="ml-3" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
