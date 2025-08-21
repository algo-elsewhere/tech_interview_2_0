'use client'

import { useTranslations } from 'next-intl'
import { ContactForm } from './contact-form'
import { ContactInfo } from './contact-info'

export function ContactSection() {
  const t = useTranslations('contact')

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            {t('form.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('form.description')}
          </p>
        </div>
        <ContactForm />
      </div>

      {/* Contact Information */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            {t('info.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('info.description')}
          </p>
        </div>
        <ContactInfo />
      </div>
    </div>
  )
}