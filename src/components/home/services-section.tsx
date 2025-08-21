import { useTranslations } from 'next-intl'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Link } from '@/i18n/routing'
import { Code2, Network, Brain, CheckCircle, ArrowRight } from 'lucide-react'

const serviceIcons = {
  algorithms: Code2,
  systemDesign: Network,
  genai: Brain,
}

export function ServicesSection() {
  const t = useTranslations('services')

  const services = [
    {
      key: 'algorithms' as const,
      icon: serviceIcons.algorithms,
    },
    {
      key: 'systemDesign' as const,
      icon: serviceIcons.systemDesign,
    },
    {
      key: 'genai' as const,
      icon: serviceIcons.genai,
    },
  ]

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            
            return (
              <Card key={service.key} className="relative group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`${service.key}.title`)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t(`${service.key}.description`)}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6">
                    {t(`${service.key}.content`)}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {(t.raw(`${service.key}.features`) as string[]).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" asChild className="group">
            <Link href="/courses">
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}