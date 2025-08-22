# Testing Infrastructure

This document describes the comprehensive testing infrastructure implemented for the Tech Interview Consultant website.

## Overview

Our testing strategy follows a multi-layered approach to ensure code quality, functionality, and performance:

1. **Unit Tests** - Test individual functions and components in isolation
2. **Integration Tests** - Test component interactions and user flows
3. **End-to-End (E2E) Tests** - Test complete user journeys across browsers
4. **Performance Tests** - Monitor Core Web Vitals and performance metrics
5. **Security Audits** - Check for vulnerabilities and security issues

## Testing Framework Stack

- **Unit/Integration Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Performance Tests**: Lighthouse
- **Coverage**: V8 Coverage Provider
- **CI/CD**: GitHub Actions

## Running Tests

### Local Development

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests only

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui

# Run performance tests
npm run perf
```

### CI/CD Pipeline

```bash
# Run complete CI test suite
npm run ci:test

# Run E2E tests in CI mode
npm run ci:e2e
```

## Test Structure

```
src/
├── lib/__tests__/              # Unit tests for utilities
├── components/*/__tests__/     # Component unit tests
├── tests/integration/          # Integration tests
└── lib/test-utils.tsx         # Testing utilities

e2e/                           # End-to-end tests
├── homepage.spec.ts
├── blog.spec.ts
├── contact.spec.ts
├── courses.spec.ts
└── navigation.spec.ts
```

## Unit Tests

Unit tests are located alongside the code they test in `__tests__` directories. They test:

- Utility functions (SEO, analytics, performance)
- Component rendering and props
- Hook behavior
- Form validation and submission

### Example Unit Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { BlogCard } from '../blog-card'
import { createMockPost } from '@/lib/test-utils'

describe('BlogCard', () => {
  it('should render blog post correctly', () => {
    const mockPost = createMockPost({
      meta: { title: 'Test Post', author: 'John Doe' }
    })
    
    render(<BlogCard post={mockPost} />)
    
    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
```

## Integration Tests

Integration tests verify component interactions and user flows:

- Blog filtering and pagination
- Form submissions with validation
- Navigation between pages
- Language switching

### Example Integration Test

```typescript
describe('Blog User Flow Integration', () => {
  it('should filter posts by category', () => {
    render(<BlogList posts={mockPosts} currentCategory="algorithms" />)
    
    expect(screen.getByText('Complete Algorithms Guide')).toBeInTheDocument()
    expect(screen.queryByText('React Testing Best Practices')).not.toBeInTheDocument()
  })
})
```

## End-to-End Tests

E2E tests use Playwright to test complete user journeys across multiple browsers:

- Homepage functionality and navigation
- Blog reading and filtering
- Contact form submission
- Course browsing
- Multi-language support
- Responsive design

### Browser Matrix

Tests run on:
- Chromium (Desktop & Mobile)
- Firefox
- WebKit (Safari)
- Mobile viewports (iPhone, Pixel)

### Example E2E Test

```typescript
test('should submit contact form successfully', async ({ page }) => {
  await page.goto('/en/contact')
  
  await page.getByLabel(/name/i).fill('John Doe')
  await page.getByLabel(/email/i).fill('john@example.com')
  await page.getByLabel(/message/i).fill('Test message')
  
  await page.getByRole('button', { name: /send/i }).click()
  
  await expect(page.getByText(/success/i)).toBeVisible()
})
```

## Performance Tests

Performance tests monitor:
- Core Web Vitals (LCP, FID, CLS)
- Bundle size analysis
- Lighthouse scores
- Resource loading optimization

## Coverage Requirements

Minimum coverage thresholds:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

Coverage reports are generated in HTML format and uploaded to CI artifacts.

## Mocking Strategy

### Next.js Mocks
- `next/navigation` - Router, searchParams, pathname
- `next/image` - Optimized image component
- Analytics tracking functions

### Test Utilities
- `createMockPost()` - Generate blog post mock data
- `createMockCourse()` - Generate course mock data
- `userEvent()` - User interaction helper
- Multi-locale rendering support

## CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline runs on:
- Push to `main` or `develop` branches
- Pull requests to `main`

#### Pipeline Jobs

1. **Lint & Type Check** - ESLint and TypeScript validation
2. **Unit Tests** - Run Vitest with coverage
3. **Build** - Next.js production build
4. **E2E Tests** - Playwright across browser matrix
5. **Performance Tests** - Lighthouse audits
6. **Security Audit** - npm audit and dependency checks
7. **Bundle Analysis** - Size analysis on PRs

#### Artifacts

- Coverage reports
- E2E test results and screenshots
- Performance metrics
- Bundle analysis reports
- Build artifacts

## Writing Tests

### Unit Test Guidelines

1. Use descriptive test names
2. Follow AAA pattern (Arrange, Act, Assert)
3. Test both happy path and edge cases
4. Mock external dependencies
5. Keep tests focused and isolated

### E2E Test Guidelines

1. Test user journeys, not implementation details
2. Use semantic locators (roles, labels)
3. Handle async operations with proper waits
4. Test across different viewport sizes
5. Mock external APIs when needed

### Best Practices

- Write tests before or alongside code
- Maintain test data consistency
- Use page object models for complex E2E flows
- Keep tests independent and idempotent
- Update tests when requirements change

## Debugging Tests

### Local Debugging

```bash
# Run specific test file
npm test BlogCard.test.tsx

# Debug with UI (E2E)
npm run test:e2e:ui

# Run tests with verbose output
npm test -- --reporter=verbose
```

### CI Debugging

- Check uploaded artifacts for screenshots and reports
- Use GitHub Actions logs for detailed output
- Review coverage reports for missed cases

## Continuous Improvement

Regular testing improvements include:
- Monitoring test execution times
- Updating browser versions
- Adding new test scenarios
- Optimizing CI pipeline performance
- Reviewing and updating coverage thresholds

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)