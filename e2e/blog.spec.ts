import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test('should display blog list page correctly', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Check page title
    await expect(page).toHaveTitle(/Tech Interview.*Blog/)
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/blog/i)
    
    // Check for blog posts (if any exist)
    const posts = page.locator('[data-testid="blog-post"]')
    const postCount = await posts.count()
    
    if (postCount > 0) {
      // Check first post has required elements
      const firstPost = posts.first()
      await expect(firstPost.getByRole('heading')).toBeVisible()
      await expect(firstPost.getByText(/read more/i)).toBeVisible()
    }
  })

  test('should filter posts by category', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Check if category filters exist
    const categoryFilter = page.getByRole('button', { name: /category/i }).first()
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click()
      
      // Select a category
      const categoryOption = page.getByRole('option').first()
      if (await categoryOption.isVisible()) {
        await categoryOption.click()
        
        // URL should update with category filter
        await expect(page).toHaveURL(/category=/)
      }
    }
  })

  test.skip('should search for posts', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Check if search input exists
    const searchInput = page.getByPlaceholder(/search/i)
    if (await searchInput.isVisible()) {
      await searchInput.fill('test')
      await searchInput.press('Enter')
      
      // Should show search results or no results message
      await expect(page.locator('text=/search results|no posts found/i')).toBeVisible()
    }
  })

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Find first blog post link
    const firstPostLink = page.getByRole('link').filter({ hasText: /read more|view post/i }).first()
    
    if (await firstPostLink.isVisible()) {
      await firstPostLink.click()
      
      // Should navigate to blog post page
      await expect(page).toHaveURL(/\/en\/blog\/[^\/]+$/)
      
      // Should show blog post content
      await expect(page.getByRole('article')).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
  })

  test('should handle pagination', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Check if pagination exists
    const pagination = page.getByRole('navigation', { name: /pagination/i })
    if (await pagination.isVisible()) {
      const nextButton = pagination.getByRole('button', { name: /next/i })
      if (await nextButton.isVisible() && await nextButton.isEnabled()) {
        await nextButton.click()
        
        // URL should update with page parameter
        await expect(page).toHaveURL(/page=/)
      }
    }
  })

  test('should share blog post', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Navigate to first post
    const firstPostLink = page.getByRole('link').filter({ hasText: /read more|view post/i }).first()
    if (await firstPostLink.isVisible()) {
      await firstPostLink.click()
      
      // Check for share buttons
      const shareButtons = page.locator('[data-testid="share-buttons"]')
      if (await shareButtons.isVisible()) {
        const twitterShare = shareButtons.getByRole('link', { name: /twitter|x/i })
        if (await twitterShare.isVisible()) {
          await expect(twitterShare).toHaveAttribute('href', /twitter\.com|x\.com/)
        }
      }
    }
  })

  test('should show related posts', async ({ page }) => {
    await page.goto('/en/blog')
    
    // Navigate to first post
    const firstPostLink = page.getByRole('link').filter({ hasText: /read more|view post/i }).first()
    if (await firstPostLink.isVisible()) {
      await firstPostLink.click()
      
      // Check for related posts section
      const relatedPosts = page.locator('[data-testid="related-posts"]')
      if (await relatedPosts.isVisible()) {
        await expect(relatedPosts.getByRole('heading')).toContainText(/related|similar/i)
      }
    }
  })

  test('should work with different languages', async ({ page }) => {
    // Test Chinese blog
    await page.goto('/zh-Hans/blog')
    await expect(page).toHaveTitle(/博客|Blog/)
    
    // Test Traditional Chinese blog
    await page.goto('/zh-Hant/blog')
    await expect(page).toHaveTitle(/部落格|Blog/)
  })
})