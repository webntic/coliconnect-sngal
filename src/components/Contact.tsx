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
    <section id="contact" className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Contactez-Nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              <h3 className="text-3xl font-bold text-foreground mb-8">
                Nos Coordonnées
              </h3>
            </div>

            <Card className="group p-8 border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Phone size={24} className="text-white" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    Service Client
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 font-medium">Sénégal</div>
                        <a href="tel:+221730615015" className="text-foreground font-bold hover:text-primary text-lg transition-colors">
                          +221 73 061 50 15
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('+221730615015', 'Numéro Sénégal')}
                        className="hover:bg-primary/10"
                      >
                        {copied === 'Numéro Sénégal' ? (
                          <CheckCircle size={20} className="text-green-600" weight="fill" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 font-medium">France</div>
                        <a href="tel:+33753343539" className="text-foreground font-bold hover:text-primary text-lg transition-colors">
                          +33 7 53 34 35 39
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('+33753343539', 'Numéro France')}
                        className="hover:bg-primary/10"
                      >
                        {copied === 'Numéro France' ? (
                          <CheckCircle size={20} className="text-green-600" weight="fill" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group p-8 border-0 bg-gradient-to-br from-card to-accent/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin size={24} className="text-white" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    Nos Bureaux
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="font-bold text-foreground mb-2 text-lg">Bureau Dakar</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Ouest Foire, en face l'hôpital Philippe Senghor<br />
                        À côté de la pharmacie Ibrahima Diallo<br />
                        Dakar, Sénégal
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 hover:bg-primary/10 hover:border-primary"
                        onClick={() => copyToClipboard('Ouest Foire, en face l\'hôpital Philippe Senghor, à côté de la pharmacie Ibrahima Diallo, Dakar', 'Adresse Dakar')}
                      >
                        {copied === 'Adresse Dakar' ? <CheckCircle size={16} className="mr-2" weight="fill" /> : <Copy size={16} className="mr-2" />}
                        {copied === 'Adresse Dakar' ? 'Copié !' : 'Copier l\'adresse'}
                      </Button>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="font-bold text-foreground mb-2 text-lg">Bureau France</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        4 rue Claude Debussy<br />
                        92220 Bagneux<br />
                        France
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 hover:bg-primary/10 hover:border-primary"
                        onClick={() => copyToClipboard('4 rue Claude Debussy, 92220 Bagneux, France', 'Adresse France')}
                      >
                        {copied === 'Adresse France' ? <CheckCircle size={16} className="mr-2" weight="fill" /> : <Copy size={16} className="mr-2" />}
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
            <div className="relative h-72 rounded-3xl overflow-hidden mb-6 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=600&fit=crop&q=80" 
                alt="Contact us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h4 className="text-3xl font-bold mb-3">24/7 à votre service</h4>
                  <p className="text-white/95 text-lg">Notre équipe répond à vos questions rapidement</p>
                </div>
              </div>
            </div>
            
            <Card className="p-8 border-0 bg-gradient-to-br from-card to-secondary/5 shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Envoyez-nous un Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold">Nom Complet *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    className="mt-2 h-12 text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="mt-2 h-12 text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+221 ou +33..."
                    className="mt-2 h-12 text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre besoin..."
                    rows={5}
                    className="mt-2 text-base resize-none"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all hover:scale-[1.02]" size="lg">
                  <Envelope className="mr-2" size={22} weight="duotone" />
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
