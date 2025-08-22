'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button, Input } from '@/components/ui'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerSections = {
  quickLinks: [
    { key: 'home', href: '/' },
    { key: 'blog', href: '/blog' },
    { key: 'courses', href: '/courses' },
    { key: 'about', href: '/about' },
  ],
  resources: [
    { key: 'algorithms', href: '/blog/algorithms' },
    { key: 'systemDesign', href: '/blog/system-design' },
    { key: 'genai', href: '/blog/genai' },
    { key: 'mockInterview', href: '/services/mock-interview' },
  ],
  company: [
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
    { key: 'privacy', href: '/privacy' },
    { key: 'terms', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@techinterview.com', label: 'Email' },
]

export function Footer() {
  const t = useTranslations()
  const navT = useTranslations('navigation')
  const footerT = useTranslations('footer')
  const servicesT = useTranslations('services')

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log('Newsletter signup')
  }

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto max-w-screen-2xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm relative">
                <span className="relative">
                  TI
                  <sup className="absolute top-0 -right-1 text-[0.4rem] font-bold">2</sup>
                </span>
              </div>
              <span className="font-bold text-lg">
                Tech Interview 2.0
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {footerT('description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{footerT('quickLinks')}</h3>
            <ul className="space-y-3">
              {footerSections.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {navT(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{footerT('resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog/algorithms"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {servicesT('algorithms.title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/system-design"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {servicesT('systemDesign.title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/genai"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {servicesT('genai.title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mock-interview"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Mock Interview
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{footerT('company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {navT('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {navT('contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {footerT('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {footerT('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-2">{footerT('newsletter')}</h4>
              <p className="text-muted-foreground text-sm">
                {t('newsletter.description')}
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm w-full md:w-auto">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1"
                required
              />
              <Button type="submit">
                {t('newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>{footerT('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}