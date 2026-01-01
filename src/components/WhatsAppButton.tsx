import { WhatsappLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBERS = {
  senegal: '221773061515',
  france: '33753343539'
}

const getWhatsAppUrl = (number: string) => {
  const message = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur vos services MBS Transport.')
  return `https://wa.me/${number}?text=${message}`
}

export function WhatsAppButton() {
  const handleWhatsAppClick = (country: 'senegal' | 'france') => {
    const url = getWhatsAppUrl(WHATSAPP_NUMBERS[country])
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <WhatsappLogo size={32} weight="fill" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="text-base">
            Contacter par WhatsApp
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleWhatsAppClick('senegal')}
            className="cursor-pointer py-3 flex items-start gap-3"
          >
            <WhatsappLogo size={24} weight="fill" className="text-[#25D366] flex-shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Sénégal</span>
              <span className="text-xs text-muted-foreground">+221 77 306 15 15</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleWhatsAppClick('france')}
            className="cursor-pointer py-3 flex items-start gap-3"
          >
            <WhatsappLogo size={24} weight="fill" className="text-[#25D366] flex-shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">France</span>
              <span className="text-xs text-muted-foreground">+33 7 53 34 35 39</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
