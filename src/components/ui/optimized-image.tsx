'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  onLoadComplete?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  onLoadComplete,
  onError,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoadComplete?.()
  }

  const handleError = () => {
    setHasError(true)
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(false)
    } else {
      onError?.()
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        style={{
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0,
        }}
        {...props}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div 
          className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground"
          aria-label="Image failed to load"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default OptimizedImage