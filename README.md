# Tech Interview 2.0

A modern, comprehensive platform for technical interview preparation and consultation services.

## 🚀 Features

- **Expert Consultation**: One-on-one interview preparation with experienced engineers
- **Comprehensive Courses**: Structured learning paths for algorithms, system design, and AI
- **Interactive Blog**: Latest insights and tips for technical interviews
- **Multi-language Support**: Available in English, Simplified Chinese, and Traditional Chinese
- **Modern Architecture**: Built with Next.js 15, TypeScript, and cutting-edge web technologies

## 📚 Documentation

Comprehensive documentation is available at our [GitHub Pages site](https://your-username.github.io/tech_interview_2_0/):

### For Developers
- **[Developer Guide](https://your-username.github.io/tech_interview_2_0/developer/)**: Complete setup and development workflow
- **[Architecture Guide](https://your-username.github.io/tech_interview_2_0/architecture/)**: System design and technical decisions
- **[Installation](https://your-username.github.io/tech_interview_2_0/developer/installation.html)**: Step-by-step setup instructions

### For Content Managers
- **[Content Manager Guide](https://your-username.github.io/tech_interview_2_0/content-manager/)**: Non-technical content management
- **[Blog Management](https://your-username.github.io/tech_interview_2_0/content-manager/blog-posts.html)**: Creating and editing blog posts
- **[Course Management](https://your-username.github.io/tech_interview_2_0/content-manager/courses.html)**: Managing educational content
- **[Translation Guide](https://your-username.github.io/tech_interview_2_0/content-manager/translations.html)**: Multi-language content management

### For Contributors
- **[SEO Guide](./docs/SEO-GUIDE.md)**: SEO optimization and testing instructions

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for blog posts and courses
- **Internationalization**: next-intl
- **Testing**: Vitest + React Testing Library + Playwright
- **Analytics**: Plausible Analytics
- **Deployment**: Vercel

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/tech_interview_2_0.git
cd tech_interview_2_0

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## 🌍 Multi-Language Support

The platform supports three languages:

- **English** (`/en/`)
- **Simplified Chinese** (`/zh-Hans/`)
- **Traditional Chinese** (`/zh-Hant/`)

All content, including blog posts, courses, and UI text, can be managed in multiple languages.

## 🤝 Contributing

We welcome contributions! Please see our documentation for detailed guides:

1. **Developers**: Start with the [Developer Guide](https://your-username.github.io/tech_interview_2_0/developer/)
2. **Content Creators**: Check the [Content Manager Guide](https://your-username.github.io/tech_interview_2_0/content-manager/)
3. **Translators**: Review the [Translation Guide](https://your-username.github.io/tech_interview_2_0/content-manager/translations.html)

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📊 Performance & SEO

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **SEO**: Comprehensive metadata, structured data, and multi-language sitemap
- **Accessibility**: WCAG 2.1 AA compliant

## 🔧 Environment Setup

Create a `.env.local` file:

```bash
# Required for development
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_DOMAIN=your-domain.com

# Optional: Contact form
CONTACT_EMAIL=your-email@domain.com
```

## 📁 Project Structure

```
tech_interview_2_0/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   ├── lib/                    # Utility functions
│   ├── content/               # MDX blog posts and courses
│   └── messages/              # Internationalization files
├── docs/                      # Documentation (GitHub Pages)
├── tests/                     # Test files
├── public/                    # Static assets
└── config files
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📈 Analytics

The platform includes privacy-focused analytics with Plausible. Configure in your environment variables:

```bash
NEXT_PUBLIC_ANALYTICS_DOMAIN=your-site.com
NEXT_PUBLIC_ANALYTICS_SITE_ID=your-plausible-site-id
```

## 🧪 Testing

### Unit Tests
```bash
npm run test              # Run tests once
npm run test:watch        # Run in watch mode
npm run test:coverage     # Generate coverage report
```

### End-to-End Tests
```bash
npm run test:e2e          # Run E2E tests
npm run test:e2e:headed   # Run with browser UI
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: Check our [comprehensive guides](https://your-username.github.io/tech_interview_2_0/)
- **Issues**: Report bugs and request features via [GitHub Issues](https://github.com/your-username/tech_interview_2_0/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/your-username/tech_interview_2_0/discussions)

## 📞 Contact

For business inquiries or questions:
- **Email**: contact@techinterview2.com
- **Website**: [https://techinterview2.com](https://techinterview2.com)

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.

