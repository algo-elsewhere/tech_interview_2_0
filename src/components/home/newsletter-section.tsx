'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input, Card } from '@/components/ui'
import { Mail, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSection() {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormState('error')
      return
    }

    setFormState('loading')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make an API call here
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      setFormState('success')
      setEmail('')
    } catch {
      setFormState('error')
    }
  }

  const resetForm = () => {
    setFormState('idle')
    setEmail('')
  }

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="bg-primary text-primary-foreground p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {t('title')}
                  </h2>
                </div>
                
                <p className="text-primary-foreground/90 mb-8">
                  {t('description')}
                </p>

                {/* Benefits */}
                <ul className="space-y-4">
                  {(t.raw('benefits') as string[]).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-primary-foreground/90">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side - Form */}
              <div className="p-8 lg:p-12">
                {formState === 'success' ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Success!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t('success')}
                    </p>
                    <Button variant="outline" onClick={resetForm}>
                      Subscribe Another Email
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t('title')}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Join our community today!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder={t('placeholder')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={cn(
                            formState === 'error' && 'border-red-500 focus:border-red-500'
                          )}
                          disabled={formState === 'loading'}
                        />
                        {formState === 'error' && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {t('error')}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={formState === 'loading'}
                      >
                        {formState === 'loading' ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {t('subscribe')}
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      {t('privacy')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}