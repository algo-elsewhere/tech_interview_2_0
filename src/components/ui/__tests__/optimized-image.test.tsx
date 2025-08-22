import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, act } from '@/lib/test-utils'
import { OptimizedImage } from '../optimized-image'
import type { ImageProps } from 'next/image'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, onLoad, onError, priority, ...props }: ImageProps & { onLoad?: () => void; onError?: () => void }) => {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        data-testid="next-image"
        data-priority={priority?.toString()}
        {...props}
      />
    )
  },
}))

describe('OptimizedImage', () => {
  it('should render image with basic props', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    )

    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('should show loading state initially', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    )

    // Loading spinner should be visible
    const loadingSpinners = screen.getAllByRole('generic', { hidden: true })
    const spinnerElement = loadingSpinners.find(el => el.classList.contains('animate-spin'))
    expect(spinnerElement).toHaveClass('animate-spin')
  })

  it('should hide loading state after image loads', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    )

    const image = screen.getByTestId('next-image')
    
    // Simulate image load
    await act(async () => {
      image.dispatchEvent(new Event('load'))
    })

    await waitFor(() => {
      expect(image).toHaveStyle({ opacity: '1' })
    })
  })

  it('should call onLoadComplete when image loads', async () => {
    const onLoadComplete = vi.fn()

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        onLoadComplete={onLoadComplete}
      />
    )

    const image = screen.getByTestId('next-image')
    
    await act(async () => {
      image.dispatchEvent(new Event('load'))
    })

    await waitFor(() => {
      expect(onLoadComplete).toHaveBeenCalled()
    })
  })

  it('should use fallback image on error', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        fallbackSrc="/fallback-image.jpg"
      />
    )

    const image = screen.getByTestId('next-image')
    
    // Simulate image error
    await act(async () => {
      image.dispatchEvent(new Event('error'))
    })

    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback-image.jpg')
    })
  })

  it('should show error state when no fallback provided', async () => {
    render(
      <OptimizedImage
        src="/invalid-image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    )

    const image = screen.getByTestId('next-image')
    
    // Simulate image error
    await act(async () => {
      image.dispatchEvent(new Event('error'))
    })

    await waitFor(() => {
      const errorIcon = screen.getByLabelText('Image failed to load')
      expect(errorIcon).toBeInTheDocument()
    })
  })

  it('should call onError callback when image fails', async () => {
    const onError = vi.fn()

    render(
      <OptimizedImage
        src="/invalid-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        onError={onError}
      />
    )

    const image = screen.getByTestId('next-image')
    
    await act(async () => {
      image.dispatchEvent(new Event('error'))
    })

    await waitFor(() => {
      expect(onError).toHaveBeenCalled()
    })
  })

  it('should apply correct optimization settings', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        priority={true}
      />
    )

    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('quality', '85')
    expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')
  })

  it('should have smooth transition styles', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    )

    const image = screen.getByTestId('next-image')
    expect(image).toHaveStyle({
      transition: 'opacity 0.3s ease-in-out',
      opacity: '0', // Initially hidden until loaded
    })
  })
})