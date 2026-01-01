import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Globe, Users, Trophy } from '@phosphor-icons/react'

export function About() {
  return (
    <section id="a-propos" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            À Propos de MBS Transport
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une entreprise sénégalaise au rayonnement international
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Mondial Bagage Services
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">MBS Transport</strong> (Mondial Bagage Services) est votre partenaire de confiance pour tous vos besoins de transport et d'expédition entre le Sénégal, la France et le reste du monde.
              </p>
              <p>
                Forte d'une expertise de plus de 15 ans dans le domaine du fret et de la logistique, notre entreprise s'est imposée comme un acteur incontournable du transport international en Afrique de l'Ouest.
              </p>
              <p>
                Nous proposons une gamme complète de services adaptés aux particuliers comme aux professionnels : fret maritime et aérien, envois express via DHL, et transport dans toute la sous-région ouest-africaine.
              </p>
              <p>
                Notre engagement : vous offrir un service de qualité, rapide, sécurisé et à des tarifs compétitifs, tout en garantissant un suivi personnalisé de vos envois.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe size={24} className="text-primary" weight="duotone" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Présence Internationale
                  </h4>
                  <p className="text-muted-foreground">
                    Des bureaux stratégiquement situés à Dakar et à Bagneux (France) pour mieux vous servir.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-accent" weight="duotone" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Service Client Dédié
                  </h4>
                  <p className="text-muted-foreground">
                    Une équipe disponible 24/7 pour répondre à toutes vos questions et suivre vos envois.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Trophy size={24} className="text-primary" weight="duotone" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Excellence & Fiabilité
                  </h4>
                  <p className="text-muted-foreground">
                    Plus de 10 000 colis livrés avec succès et une satisfaction client de 98%.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
