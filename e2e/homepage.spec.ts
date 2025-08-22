import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/en')
    
    // Check page title
    await expect(page).toHaveTitle(/Tech Interview.*Consultant/)
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/en')
    
    // Check navigation links
    const nav = page.getByRole('navigation')
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Courses' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()
    
    // Test navigation to blog
    await nav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL('/en/blog')
  })

  test.skip('should have working CTAs', async ({ page }) => {
    await page.goto('/en')
    
    // Check for CTA buttons
    const getStartedButton = page.getByRole('link', { name: /get started/i }).first()
    await expect(getStartedButton).toBeVisible()
    
    // Click should navigate to courses
    await getStartedButton.click()
    await expect(page).toHaveURL('/en/courses')
  })

  test.skip('should display stats section', async ({ page }) => {
    await page.goto('/en')
    
    // Check for stats
    await expect(page.getByText(/students/i)).toBeVisible()
    await expect(page.getByText(/success/i)).toBeVisible()
    await expect(page.getByText(/companies/i)).toBeVisible()
  })

  test('should have language switcher', async ({ page }) => {
    await page.goto('/en')
    
    // Check language switcher
    const languageButton = page.getByLabel('Switch language')
    await expect(languageButton).toBeVisible()
    
    // Should show current language
    await expect(languageButton.getByText('English')).toBeVisible()
  })

  test('should load without accessibility violations', async ({ page }) => {
    await page.goto('/en')
    
    // Check for proper heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    
    // Check for alt text on images
    const images = page.getByRole('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      await expect(image).toHaveAttribute('alt')
    }
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/en')
    
    // Mobile menu should be visible
    const mobileMenuButton = page.getByLabel('Menu')
    await expect(mobileMenuButton).toBeVisible()
    
    // Desktop navigation should be hidden
    const desktopNav = page.locator('nav.hidden.md\\:flex')
    await expect(desktopNav).toBeHidden()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/en')
    
    // Desktop navigation should be visible
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Home' })).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/en')
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
    
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /.+/)
  })

  test('should have working footer', async ({ page }) => {
    await page.goto('/en')
    
    // Scroll to footer
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded()
    
    // Check footer content
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
  })
})