import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should display about page correctly', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check page title
    await expect(page).toHaveTitle(/About Us.*Tech Interview/)
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Empowering Engineers/)
    
    // Check hero section elements
    await expect(page.getByText('10+ Years Experience')).toBeVisible()
    await expect(page.getByText('500+ Companies')).toBeVisible()
    await expect(page.getByText('10K+ Students')).toBeVisible()
  })

  test('should display all main sections', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check for main sections
    await expect(page.getByRole('heading', { name: /Our Story/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Our Areas of Expertise/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Our Impact/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Our Philosophy/i })).toBeVisible()
  })

  test('should display expertise areas', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check expertise sections using more specific selectors
    await expect(page.getByRole('heading', { name: 'Algorithms & Data Structures' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'System Design' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'GenAI & ML Engineering' })).toBeVisible()
    
    // Check expertise descriptions
    await expect(page.getByText(/Master coding interviews with proven strategies/)).toBeVisible()
    await expect(page.getByText(/Learn to architect scalable systems/)).toBeVisible()
    await expect(page.getByText(/Stay ahead with cutting-edge AI skills/)).toBeVisible()
  })

  test('should display achievements statistics', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check statistics using more specific selectors within the achievements section
    const achievementsSection = page.locator('section:has(h2:has-text("Our Impact"))')
    await expect(achievementsSection.getByText('500+').first()).toBeVisible()
    await expect(achievementsSection.getByText('95%')).toBeVisible()
    await expect(achievementsSection.getByText('50+')).toBeVisible()
    await expect(achievementsSection.getByText('10+')).toBeVisible()
    
    // Check statistic labels
    await expect(page.getByText('Students Helped')).toBeVisible()
    await expect(page.getByText('Success Rate')).toBeVisible()
    await expect(page.getByText('Partner Companies')).toBeVisible()
    await expect(page.getByText('Years of Experience')).toBeVisible()
  })

  test('should display philosophy section with quote', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check philosophy section
    await expect(page.getByRole('heading', { name: /Our Philosophy/i })).toBeVisible()
    
    // Check for quote
    await expect(page.getByText(/Success in technical interviews isn't just about knowing algorithms/)).toBeVisible()
    
    // Check philosophy description
    await expect(page.getByText(/We believe that with the right guidance/)).toBeVisible()
  })

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check CTA section
    await expect(page.getByRole('heading', { name: /Ready to Start Your Journey/i })).toBeVisible()
    
    // Check CTA buttons
    const contactButton = page.getByRole('link', { name: /Get in Touch/i })
    const coursesButton = page.getByRole('link', { name: /View Courses/i })
    
    await expect(contactButton).toBeVisible()
    await expect(coursesButton).toBeVisible()
    
    // Check button links
    await expect(contactButton).toHaveAttribute('href', '/en/contact')
    await expect(coursesButton).toHaveAttribute('href', '/en/courses')
  })

  test('should work with different languages', async ({ page }) => {
    // Test Chinese about page
    await page.goto('/zh-Hans/about')
    await expect(page).toHaveTitle(/关于我们|About/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/赋能工程师/)
    
    // Test Traditional Chinese about page
    await page.goto('/zh-Hant/about')
    await expect(page).toHaveTitle(/關於我們|About/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/賦能工程師/)
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/en/about')
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Main content should still be visible and properly laid out
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('10+ Years Experience')).toBeVisible()
    
    // Expertise cards should stack vertically on mobile
    const expertiseCards = page.locator('[data-testid="expertise-card"]')
    if (await expertiseCards.count() > 0) {
      const firstCard = expertiseCards.first()
      const secondCard = expertiseCards.nth(1)
      
      if (await secondCard.isVisible()) {
        const firstBox = await firstCard.boundingBox()
        const secondBox = await secondCard.boundingBox()
        
        if (firstBox && secondBox) {
          // On mobile, cards should be stacked (second card below first)
          expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 50)
        }
      }
    }
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // All sections should be visible on desktop
    await expect(page.getByRole('heading', { name: /Our Story/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Our Areas of Expertise/i })).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /About Us/)
    
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /.+/)
  })

  test('should load images properly', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check for hero image
    const heroImage = page.getByAltText(/Tech Interview Consultant team/i)
    if (await heroImage.isVisible()) {
      await expect(heroImage).toBeVisible()
      
      // Check if image loaded successfully
      const src = await heroImage.getAttribute('src')
      expect(src).toBeTruthy()
    }
  })

  test('should have accessible content', async ({ page }) => {
    await page.goto('/en/about')
    
    // Check heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    
    const h2s = page.getByRole('heading', { level: 2 })
    const h2Count = await h2s.count()
    expect(h2Count).toBeGreaterThan(0)
    
    // Check for proper alt text on actual img elements (not SVG icons)
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      if (await image.isVisible()) {
        await expect(image).toHaveAttribute('alt')
      }
    }
    
    // Check for proper link accessibility
    const links = page.getByRole('link')
    const linkCount = await links.count()
    
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = links.nth(i)
      if (await link.isVisible()) {
        const linkText = await link.textContent()
        expect(linkText?.trim()).toBeTruthy()
      }
    }
  })
})