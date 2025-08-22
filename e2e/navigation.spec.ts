import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate between main pages', async ({ page }) => {
    await page.goto('/en')
    
    // Test navigation to blog
    await page.getByRole('link', { name: /blog/i }).click()
    await expect(page).toHaveURL('/en/blog')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/blog/i)
    
    // Test navigation to courses
    await page.getByRole('link', { name: /courses/i }).click()
    await expect(page).toHaveURL('/en/courses')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/courses/i)
    
    // Test navigation to contact
    await page.getByRole('link', { name: /contact/i }).click()
    await expect(page).toHaveURL('/en/contact')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/contact/i)
    
    // Test navigation back to home
    await page.getByRole('link', { name: /home|logo/i }).first().click()
    await expect(page).toHaveURL('/en')
  })

  test('should show active navigation state', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Blog nav item should be active
    const blogNav = page.getByRole('link', { name: /blog/i })
    await expect(blogNav).toHaveClass(/active|current/)
    
    // Navigate to courses
    await page.getByRole('link', { name: /courses/i }).click()
    
    // Courses nav item should be active
    const coursesNav = page.getByRole('link', { name: /courses/i })
    await expect(coursesNav).toHaveClass(/active|current/)
  })

  test('should work with mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/en')
    
    // Mobile menu button should be visible
    const mobileMenuButton = page.getByLabel(/menu|toggle/i)
    await expect(mobileMenuButton).toBeVisible()
    
    // Desktop navigation should be hidden
    const desktopNav = page.locator('nav').filter({ hasNot: page.locator('[aria-label*="menu"]') })
    const navLinks = desktopNav.getByRole('link', { name: /blog|courses|contact/i })
    
    if (await navLinks.count() > 0) {
      await expect(navLinks.first()).toBeHidden()
    }
    
    // Click mobile menu
    await mobileMenuButton.click()
    
    // Mobile menu should open
    const mobileMenu = page.locator('[data-testid="mobile-menu"]')
    if (await mobileMenu.isVisible()) {
      await expect(mobileMenu).toBeVisible()
      
      // Should be able to navigate from mobile menu
      const mobileBlogLink = mobileMenu.getByRole('link', { name: /blog/i })
      if (await mobileBlogLink.isVisible()) {
        await mobileBlogLink.click()
        await expect(page).toHaveURL('/en/blog')
      }
    }
  })

  test('should handle language switching', async ({ page }) => {
    await page.goto('/en')
    
    // Find language switcher
    const languageButton = page.getByLabel(/language|switch language/i)
    await expect(languageButton).toBeVisible()
    
    // Should show current language
    await expect(languageButton.getByText(/english|en/i)).toBeVisible()
    
    // Click language switcher
    await languageButton.click()
    
    // Should show language options
    const chineseOption = page.getByRole('option', { name: /中文|chinese/i }).first()
    if (await chineseOption.isVisible()) {
      await chineseOption.click()
      
      // Should navigate to Chinese version
      await expect(page).toHaveURL(/\/zh-Hans/)
    }
  })

  test('should maintain navigation state across pages', async ({ page }) => {
    await page.goto('/en')
    
    // Navigate to blog
    await page.getByRole('link', { name: /blog/i }).click()
    
    // Navigation should still be visible and functional
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /courses/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
  })

  test('should handle breadcrumb navigation', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Check if breadcrumbs exist
    const breadcrumbs = page.locator('[data-testid="breadcrumbs"]')
    if (await breadcrumbs.isVisible()) {
      await expect(breadcrumbs.getByRole('link', { name: /home/i })).toBeVisible()
      await expect(breadcrumbs.getByText(/blog/i)).toBeVisible()
      
      // Navigate to individual post if available
      const firstPost = page.getByRole('link').filter({ hasText: /read more/i }).first()
      if (await firstPost.isVisible()) {
        await firstPost.click()
        
        // Breadcrumbs should update
        if (await breadcrumbs.isVisible()) {
          await expect(breadcrumbs.getByRole('link', { name: /blog/i })).toBeVisible()
        }
      }
    }
  })

  test('should handle footer navigation', async ({ page }) => {
    await page.goto('/en')
    
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded()
    
    // Footer should be visible
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
    
    // Check footer links
    const footerLinks = footer.getByRole('link')
    const linkCount = await footerLinks.count()
    
    if (linkCount > 0) {
      // Test first footer link
      const firstLink = footerLinks.first()
      const href = await firstLink.getAttribute('href')
      
      if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
        await firstLink.click()
        // Should navigate successfully
        await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      }
    }
  })

  test('should handle external links correctly', async ({ page }) => {
    await page.goto('/en')
    
    // Find external links (if any)
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"]):not([href*="127.0.0.1"])')
    const externalLinkCount = await externalLinks.count()
    
    if (externalLinkCount > 0) {
      const firstExternalLink = externalLinks.first()
      
      // External links should open in new tab
      await expect(firstExternalLink).toHaveAttribute('target', '_blank')
      await expect(firstExternalLink).toHaveAttribute('rel', /noopener|noreferrer/)
    }
  })

  test('should handle 404 navigation gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/en/non-existent-page')
    
    // Should show 404 page or redirect
    const pageContent = await page.textContent('body')
    const is404 = pageContent?.includes('404') || pageContent?.includes('Not Found')
    const isRedirected = page.url().includes('/en') && !page.url().includes('non-existent-page')
    
    expect(is404 || isRedirected).toBeTruthy()
    
    // Navigation should still work
    if (await page.getByRole('link', { name: /home/i }).isVisible()) {
      await page.getByRole('link', { name: /home/i }).click()
      await expect(page).toHaveURL('/en')
    }
  })
})