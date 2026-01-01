import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Globe, Users, Trophy } from '@phosphor-icons/react'

export function About() {
  return (
    <section id="a-propos" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,127,80,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            À Propos de MBS Transport
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une entreprise sénégalaise au rayonnement international
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=800&fit=crop&q=80" 
                  alt="Warehouse logistics"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="relative h-72 rounded-3xl overflow-hidden mt-12 shadow-xl hover:shadow-2xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=800&fit=crop&q=80" 
                  alt="Cargo ship"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
              </div>
            </div>
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=600&fit=crop&q=80" 
                alt="Global logistics"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-4xl font-bold text-foreground mb-8">
              Mondial Bagage Services
            </h3>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                <strong className="text-foreground font-semibold">MBS Transport</strong> (Mondial Bagage Services) est votre partenaire de confiance pour tous vos besoins de transport et d'expédition entre le Sénégal, la France et le reste du monde.
              </p>
              <p>
                Forte d'une expertise de plus de 15 ans dans le domaine du fret et de la logistique, notre entreprise s'est imposée comme un acteur incontournable du transport international en Afrique de l'Ouest.
              </p>
              <p>
                Nous proposons une gamme complète de services adaptés aux particuliers comme aux professionnels : fret maritime et aérien, envois express via DHL, et transport dans toute la sous-région ouest-africaine.
              </p>
              <p className="text-foreground font-medium">
                Notre engagement : vous offrir un service de qualité, rapide, sécurisé et à des tarifs compétitifs, tout en garantissant un suivi personnalisé de vos envois.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group p-8 border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Globe size={32} className="text-white" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-3">
                      Présence Internationale
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Des bureaux stratégiquement situés à Dakar et à Bagneux (France) pour mieux vous servir.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="group p-8 border-0 bg-gradient-to-br from-card to-accent/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Users size={32} className="text-white" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-3">
                      Service Client Dédié
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Une équipe disponible 24/7 pour répondre à toutes vos questions et suivre vos envois.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="group p-8 border-0 bg-gradient-to-br from-card to-secondary/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Trophy size={32} className="text-white" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-3">
                      Excellence & Fiabilité
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Plus de 10 000 colis livrés avec succès et une satisfaction client de 98%.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
