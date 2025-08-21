const createNextIntlPlugin = require('next-intl/plugin')
const createMDX = require('@next/mdx')

const withNextIntl = createNextIntlPlugin()

const withMDX = createMDX({
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      [
        require('rehype-pretty-code'),
        {
          theme: 'github-dark',
          keepBackground: false,
        },
      ],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // Performance optimizations
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  
  // Enable compression
  compress: true,
  
  // Enable React strict mode for better performance
  reactStrictMode: true,
  
  // Bundle analyzer (disabled by default)
  ...(process.env.ANALYZE === 'true' && {
    experimental: {
      bundleAnalyzer: {
        enabled: true,
      },
    },
  }),
  
  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}

module.exports = withNextIntl(withMDX(nextConfig))