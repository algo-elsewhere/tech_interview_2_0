import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  const t = useTranslations()
  
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('hero.description')}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg">{t('hero.getStarted')}</Button>
            <Button variant="outline" size="lg">{t('hero.learnMore')}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{t('services.algorithms.title')}</CardTitle>
              <CardDescription>{t('services.algorithms.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('services.algorithms.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('services.systemDesign.title')}</CardTitle>
              <CardDescription>{t('services.systemDesign.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('services.systemDesign.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('services.genai.title')}</CardTitle>
              <CardDescription>{t('services.genai.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('services.genai.content')}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{t('newsletter.title')}</CardTitle>
            <CardDescription>{t('newsletter.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder={t('newsletter.placeholder')} type="email" />
            <Button className="w-full">{t('newsletter.subscribe')}</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}