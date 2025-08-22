import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { ReactElement, ReactNode } from 'react'
import { AnalyticsProvider } from '@/components/analytics'
import enMessages from '../../messages/en.json'
import zhHansMessages from '../../messages/zh-Hans.json'
import zhHantMessages from '../../messages/zh-Hant.json'

const messages = {
  en: enMessages,
  'zh-Hans': zhHansMessages,
  'zh-Hant': zhHantMessages,
}

interface AllTheProvidersProps {
  children: ReactNode
  locale?: keyof typeof messages
}

const AllTheProviders = ({ children, locale = 'en' }: AllTheProvidersProps) => {
  return (
    <AnalyticsProvider domain="test.com">
      <NextIntlClientProvider messages={messages[locale]} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </AnalyticsProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: keyof typeof messages
}

const customRender = (
  ui: ReactElement,
  { locale, ...options }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders locale={locale}>{children}</AllTheProviders>
  )
  
  return render(ui, { wrapper: Wrapper, ...options })
}

// Helper function to render with different locales
export const renderWithLocale = (
  ui: ReactElement,
  locale: keyof typeof messages,
  options?: Omit<RenderOptions, 'wrapper'>
) => customRender(ui, { locale, ...options })

// Helper function to create mock content
export const createMockPost = (overrides = {}) => ({
  slug: 'test-post',
  locale: 'en',
  meta: {
    title: 'Test Post',
    description: 'A test blog post',
    publishedAt: '2024-01-01',
    author: 'Test Author',
    category: 'algorithms',
    tags: ['test', 'example'],
    featured: false,
    ...overrides,
  },
  content: 'This is test content',
  excerpt: 'Test excerpt',
})

export const createMockCourse = (overrides = {}) => ({
  slug: 'test-course',
  locale: 'en',
  meta: {
    title: 'Test Course',
    description: 'A test course',
    publishedAt: '2024-01-01',
    author: 'Test Instructor',
    category: 'system-design',
    tags: ['test', 'course'],
    price: 99,
    currency: 'USD',
    duration: '4 weeks',
    level: 'intermediate' as const,
    ...overrides,
  },
  content: 'This is test course content',
})

// Helper to mock intersection observer
export const mockIntersectionObserver = (isIntersecting = true) => {
  const mockObserver = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }
  
  global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
    callback([{ isIntersecting, target: document.createElement('div') }])
    return mockObserver
  })
  
  return mockObserver
}

// Helper to simulate user interactions
export const userEvent = async () => {
  const { userEvent } = await import('@testing-library/user-event')
  return userEvent.setup()
}

export * from '@testing-library/react'
export { customRender as render }