import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import { Info, Question, CheckCircle, Warning } from '@phosphor-icons/react'

const faqs = [
  {
    question: 'Comment est calculé le poids volumétrique ?',
    answer: 'Le poids volumétrique est calculé selon la formule : (Longueur × Largeur × Hauteur en cm) / 5000. Si ce poids est supérieur au poids réel, c\'est lui qui sera facturé. Cela permet de tenir compte de l\'espace occupé par votre colis.'
  },
  {
    question: 'Que comprend l\'assurance du colis ?',
    answer: 'L\'assurance couvre les pertes ou dommages de votre colis pendant le transport. Elle représente 2% de la valeur déclarée de votre envoi avec un minimum de 2000 FCFA. En cas de sinistre, vous serez remboursé à hauteur de la valeur déclarée.'
  },
  {
    question: 'Les frais de douane sont-ils toujours applicables ?',
    answer: 'Les frais de douane de 5% s\'appliquent pour le fret maritime, aérien et régional. Ils ne s\'appliquent pas pour les envois Express DHL qui bénéficient d\'un traitement douanier accéléré inclus dans le tarif.'
  },
  {
    question: 'Quels sont les délais de livraison garantis ?',
    answer: 'Les délais varient selon le service : Fret Maritime (15-30 jours), Fret Aérien (2-5 jours), Express DHL (24-48h), Transport Sous-Région (3-7 jours). Ces délais sont indicatifs et peuvent varier selon les conditions douanières.'
  },
  {
    question: 'Puis-je suivre mon colis en temps réel ?',
    answer: 'Oui ! Tous nos services incluent un suivi en temps réel. Vous recevrez un numéro de tracking qui vous permettra de suivre votre colis depuis la prise en charge jusqu\'à la livraison finale.'
  },
  {
    question: 'Y a-t-il des articles interdits au transport ?',
    answer: 'Oui, certains articles sont interdits : produits dangereux, armes, drogues, produits périssables sans emballage spécial, contrefaçons. Consultez notre service client pour plus de détails sur les restrictions.'
  },
  {
    question: 'Comment puis-je payer mon envoi ?',
    answer: 'Nous acceptons plusieurs moyens de paiement : Orange Money, Wave, cartes bancaires (Visa, MasterCard), virement bancaire, et paiement en espèces dans nos bureaux de Dakar et Paris.'
  },
  {
    question: 'Le devis en ligne est-il définitif ?',
    answer: 'Le devis en ligne est une estimation très précise. Le tarif final peut légèrement varier selon la nature exacte du contenu, l\'emballage nécessaire et les conditions douanières spécifiques. Notre équipe vous confirmera le tarif définitif.'
  }
]

const pricingTips = [
  {
    icon: CheckCircle,
    title: 'Optimisez votre emballage',
    description: 'Utilisez des cartons adaptés à la taille de vos articles pour réduire le poids volumétrique',
    color: 'text-accent'
  },
  {
    icon: CheckCircle,
    title: 'Regroupez vos envois',
    description: 'Envoyez plusieurs articles dans un seul colis pour économiser sur les frais de base',
    color: 'text-accent'
  },
  {
    icon: CheckCircle,
    title: 'Choisissez le bon service',
    description: 'Le fret maritime est économique pour les envois non urgents, l\'express pour la rapidité',
    color: 'text-accent'
  },
  {
    icon: Warning,
    title: 'Déclarez la vraie valeur',
    description: 'Une valeur sous-estimée peut compliquer l\'indemnisation en cas de problème',
    color: 'text-primary'
  }
]

export function PricingInfo() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
            <Info size={20} weight="duotone" />
            Informations Tarifaires
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Conseils et Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour optimiser vos envois et comprendre notre tarification
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle size={28} className="text-accent" weight="duotone" />
                Conseils pour Économiser
              </h3>
              <div className="space-y-6">
                {pricingTips.map((tip, index) => {
                  const Icon = tip.icon
                  return (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Icon size={24} className={`${tip.color} flex-shrink-0 mt-0.5`} weight="duotone" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Comparaison des Services
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">🚢 Fret Maritime</span>
                    <span className="text-accent font-bold">Le + Économique</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">À partir de 5000 FCFA + 800 FCFA/kg</p>
                  <p className="text-xs text-muted-foreground">Idéal pour envois volumineux et non urgents</p>
                </div>

                <div className="p-4 bg-background rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">✈️ Fret Aérien</span>
                    <span className="text-primary font-bold">Équilibré</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">À partir de 15000 FCFA + 2500 FCFA/kg</p>
                  <p className="text-xs text-muted-foreground">Bon compromis rapidité/prix</p>
                </div>

                <div className="p-4 bg-background rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">⚡ Express DHL</span>
                    <span className="text-accent font-bold">Le + Rapide</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">À partir de 25000 FCFA + 4000 FCFA/kg</p>
                  <p className="text-xs text-muted-foreground">Livraison ultra-rapide garantie</p>
                </div>

                <div className="p-4 bg-background rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">🌍 Sous-Région</span>
                    <span className="text-primary font-bold">Proximité</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">À partir de 8000 FCFA + 1200 FCFA/kg</p>
                  <p className="text-xs text-muted-foreground">Pour l'Afrique de l'Ouest</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Question size={28} className="text-primary" weight="duotone" />
              Questions Fréquentes
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
