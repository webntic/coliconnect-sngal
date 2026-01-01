import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Envelope, MapPin, Copy, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    toast.success(`${label} copié !`)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message envoyé ! Nous vous répondrons rapidement.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contactez-Nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Nos Coordonnées
              </h3>
            </div>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-primary" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-3">
                    Service Client
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Sénégal</div>
                        <a href="tel:+221730615015" className="text-foreground font-semibold hover:text-primary">
                          +221 73 061 50 15
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('+221730615015', 'Numéro Sénégal')}
                      >
                        {copied === 'Numéro Sénégal' ? (
                          <CheckCircle size={18} className="text-green-600" weight="fill" />
                        ) : (
                          <Copy size={18} />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">France</div>
                        <a href="tel:+33753343539" className="text-foreground font-semibold hover:text-primary">
                          +33 7 53 34 35 39
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('+33753343539', 'Numéro France')}
                      >
                        {copied === 'Numéro France' ? (
                          <CheckCircle size={18} className="text-green-600" weight="fill" />
                        ) : (
                          <Copy size={18} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-accent" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-3">
                    Nos Bureaux
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-foreground mb-1">Bureau Dakar</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Ouest Foire, en face l'hôpital Philippe Senghor<br />
                        À côté de la pharmacie Ibrahima Diallo<br />
                        Dakar, Sénégal
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard('Ouest Foire, en face l\'hôpital Philippe Senghor, à côté de la pharmacie Ibrahima Diallo, Dakar', 'Adresse Dakar')}
                      >
                        {copied === 'Adresse Dakar' ? 'Copié !' : 'Copier l\'adresse'}
                      </Button>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="font-semibold text-foreground mb-1">Bureau France</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        4 rue Claude Debussy<br />
                        92220 Bagneux<br />
                        France
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard('4 rue Claude Debussy, 92220 Bagneux, France', 'Adresse France')}
                      >
                        {copied === 'Adresse France' ? 'Copié !' : 'Copier l\'adresse'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=600&fit=crop&q=80" 
                alt="Contact us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h4 className="text-2xl font-bold mb-2">24/7 à votre service</h4>
                  <p className="text-white/90">Notre équipe répond à vos questions rapidement</p>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Envoyez-nous un Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom Complet *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+221 ou +33..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre besoin..."
                    rows={5}
                    className="mt-1.5"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Envelope className="mr-2" size={20} weight="duotone" />
                  Envoyer le Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
