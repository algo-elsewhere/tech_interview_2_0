import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Phone,
  Globe,
  Calendar,
  Users
} from 'lucide-react'

export function ContactInfo() {
  const t = useTranslations('contact')

  const contactMethods = [
    {
      icon: Mail,
      title: t('info.methods.email.title'),
      description: t('info.methods.email.description'),
      value: 'hello@techinterview.dev',
      action: 'mailto:hello@techinterview.dev'
    },
    {
      icon: MessageCircle,
      title: t('info.methods.chat.title'),
      description: t('info.methods.chat.description'),
      value: t('info.methods.chat.value'),
      action: '#'
    },
    {
      icon: Phone,
      title: t('info.methods.phone.title'),
      description: t('info.methods.phone.description'),
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    }
  ]

  const businessInfo = [
    {
      icon: Clock,
      title: t('info.business.hours.title'),
      value: t('info.business.hours.value')
    },
    {
      icon: MapPin,
      title: t('info.business.location.title'),
      value: t('info.business.location.value')
    },
    {
      icon: Globe,
      title: t('info.business.timezone.title'),
      value: t('info.business.timezone.value')
    }
  ]

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="space-y-4">
        {contactMethods.map((method, index) => {
          const Icon = method.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <a 
                      href={method.action}
                      className="text-primary hover:underline font-medium"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Business Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('info.business.title')}
          </h3>
          <div className="space-y-4">
            {businessInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium">{info.title}:</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {info.value}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 mx-auto mb-4 opacity-90" />
          <h3 className="font-semibold mb-2">
            {t('info.cta.title')}
          </h3>
          <p className="text-sm opacity-90 mb-4">
            {t('info.cta.description')}
          </p>
          <a 
            href="https://calendly.com/techinterview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-md hover:bg-primary-foreground/90 transition-colors text-sm font-medium"
          >
            <Calendar className="h-4 w-4" />
            {t('info.cta.button')}
          </a>
        </CardContent>
      </Card>
    </div>
  )
}