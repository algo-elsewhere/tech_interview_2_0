'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  company: string
  inquiryType: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  inquiryType?: string
  subject?: string
  message?: string
  general?: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  inquiryType: '',
  subject: '',
  message: ''
}

export function ContactForm() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('form.validation.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('form.validation.nameMinLength')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = t('form.validation.emailRequired')
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('form.validation.emailInvalid')
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = t('form.validation.subjectRequired')
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = t('form.validation.subjectMinLength')
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('form.validation.messageRequired')
    } else if (formData.message.trim().length < 20) {
      newErrors.message = t('form.validation.messageMinLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setFormState('error')
      return
    }

    setFormState('loading')
    setErrors({})
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would make an API call here
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // Simulate potential server error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Server error')
      }
      
      setFormState('success')
      setFormData(initialFormData)
    } catch {
      setFormState('error')
      setErrors({ general: t('form.validation.serverError') })
    }
  }

  const resetForm = () => {
    setFormState('idle')
    setFormData(initialFormData)
    setErrors({})
  }

  if (formState === 'success') {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t('form.success.title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('form.success.message')}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {t('form.success.response')}
            </p>
            <Button variant="outline" onClick={resetForm}>
              {t('form.success.sendAnother')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errors.general}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('form.fields.name')}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('form.placeholders.name')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={cn(errors.name && 'border-red-500 focus:border-red-500')}
                disabled={formState === 'loading'}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t('form.fields.email')}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('form.placeholders.email')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(errors.email && 'border-red-500 focus:border-red-500')}
                disabled={formState === 'loading'}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">
                {t('form.fields.company')}
              </Label>
              <Input
                id="company"
                type="text"
                placeholder={t('form.placeholders.company')}
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={formState === 'loading'}
              />
            </div>

            {/* Inquiry Type */}
            <div className="space-y-2">
              <Label htmlFor="inquiryType">
                {t('form.fields.inquiryType')}
              </Label>
              <Select
                value={formData.inquiryType}
                onValueChange={(value) => handleInputChange('inquiryType', value)}
                disabled={formState === 'loading'}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('form.placeholders.inquiryType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{t('form.inquiryTypes.general')}</SelectItem>
                  <SelectItem value="courses">{t('form.inquiryTypes.courses')}</SelectItem>
                  <SelectItem value="consulting">{t('form.inquiryTypes.consulting')}</SelectItem>
                  <SelectItem value="partnership">{t('form.inquiryTypes.partnership')}</SelectItem>
                  <SelectItem value="technical">{t('form.inquiryTypes.technical')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {t('form.fields.subject')}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder={t('form.placeholders.subject')}
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={cn(errors.subject && 'border-red-500 focus:border-red-500')}
              disabled={formState === 'loading'}
            />
            {errors.subject && (
              <p className="text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {t('form.fields.message')}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder={t('form.placeholders.message')}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={cn(
                'min-h-[120px] resize-none',
                errors.message && 'border-red-500 focus:border-red-500'
              )}
              disabled={formState === 'loading'}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={formState === 'loading'}
          >
            {formState === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                {t('form.sending')}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t('form.submit')}
              </>
            )}
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-muted-foreground text-center">
            {t('form.privacy')}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}