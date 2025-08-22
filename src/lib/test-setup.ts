import '@testing-library/jest-dom'
import { beforeAll, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver for responsive component tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => {
  const mockUseRouter = () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })
  
  return {
    useRouter: mockUseRouter,
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => '/en',
    notFound: vi.fn(),
  }
})

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, priority, quality, sizes, placeholder, blurDataURL, onLoad, onError, style, ...props }: { 
    src: string; 
    alt: string; 
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
    sizes?: string;
    placeholder?: string;
    blurDataURL?: string;
    onLoad?: () => void;
    onError?: () => void;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }) => {
    return React.createElement('img', { 
      src, 
      alt, 
      width, 
      height,
      'data-testid': 'next-image',
      'data-priority': priority?.toString(),
      quality,
      sizes,
      placeholder,
      'data-blur': blurDataURL,
      onLoad,
      onError,
      style,
      ...props 
    })
  },
}))

// Mock next-intl
vi.mock('next-intl/navigation', () => {
  const createSharedPathnamesNavigation = () => ({
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => 
      React.createElement('a', { href, ...props }, children),
    redirect: vi.fn(),
    usePathname: () => '/en',
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
    }),
  })
  
  return { 
    createSharedPathnamesNavigation,
    createNavigation: createSharedPathnamesNavigation,
  }
})

// Note: Analytics is not globally mocked here to allow unit tests
// Individual test files can mock it as needed

// Setup environment variables for tests
beforeAll(() => {
  // Set up test environment variables
  process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN = 'test.com'
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false'
})