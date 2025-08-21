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
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = withNextIntl(withMDX(nextConfig))