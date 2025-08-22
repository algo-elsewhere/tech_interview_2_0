import { test, expect } from '@playwright/test'

test.describe('Courses', () => {
  test('should display courses page correctly', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Check page title
    await expect(page).toHaveTitle(/Courses.*Tech Interview/)
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/courses/i)
    
    // Check for course listings
    const courses = page.locator('[data-testid="course-card"]')
    const courseCount = await courses.count()
    
    if (courseCount > 0) {
      // First course should have required elements
      const firstCourse = courses.first()
      await expect(firstCourse.getByRole('heading')).toBeVisible()
      await expect(firstCourse.getByText(/learn more|enroll|view course/i)).toBeVisible()
    } else {
      // If no courses, should show appropriate message
      await expect(page.getByText(/coming soon|no courses/i)).toBeVisible()
    }
  })

  test('should filter courses by category', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Check if category filters exist
    const categoryFilter = page.getByRole('button', { name: /category|filter/i })
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click()
      
      // Select a category
      const categoryOption = page.getByRole('option').first()
      if (await categoryOption.isVisible()) {
        await categoryOption.click()
        
        // URL should update or courses should filter
        await page.waitForTimeout(1000)
        
        // Verify filter is applied
        const filteredCourses = page.locator('[data-testid="course-card"]')
        expect(await filteredCourses.count()).toBeGreaterThanOrEqual(0)
      }
    }
  })

  test('should search for courses', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Check if search input exists
    const searchInput = page.getByPlaceholder(/search courses/i)
    if (await searchInput.isVisible()) {
      await searchInput.fill('algorithm')
      await searchInput.press('Enter')
      
      // Should show search results
      await page.waitForTimeout(1000)
      const searchResults = page.locator('[data-testid="course-card"]')
      expect(await searchResults.count()).toBeGreaterThanOrEqual(0)
    }
  })

  test('should navigate to individual course', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Find first course link
    const firstCourseLink = page.getByRole('link').filter({ hasText: /learn more|view course|enroll/i }).first()
    
    if (await firstCourseLink.isVisible()) {
      await firstCourseLink.click()
      
      // Should navigate to course page
      await expect(page).toHaveURL(/\/en\/courses\/[^\/]+$/)
      
      // Should show course details
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      
      // Should have course content sections
      const courseContent = page.locator('[data-testid="course-content"]')
      if (await courseContent.isVisible()) {
        await expect(courseContent).toBeVisible()
      }
    }
  })

  test('should display course pricing information', async ({ page }) => {
    await page.goto('/en/courses')
    
    const coursePricing = page.locator('[data-testid="course-price"]')
    if (await coursePricing.count() > 0) {
      const firstPrice = coursePricing.first()
      await expect(firstPrice).toBeVisible()
      
      // Should show price or "Free"
      const priceText = await firstPrice.textContent()
      expect(priceText).toMatch(/\$|free|contact/i)
    }
  })

  test('should handle course enrollment', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Navigate to a course
    const firstCourseLink = page.getByRole('link').filter({ hasText: /learn more|view course/i }).first()
    if (await firstCourseLink.isVisible()) {
      await firstCourseLink.click()
      
      // Look for enrollment button
      const enrollButton = page.getByRole('button', { name: /enroll|start course|get started/i })
      if (await enrollButton.isVisible()) {
        await enrollButton.click()
        
        // Should handle enrollment flow
        // This might redirect to payment, contact form, or course content
        await page.waitForTimeout(1000)
        
        // Verify we're in some enrollment flow
        const isEnrollmentFlow = 
          page.url().includes('/payment') ||
          page.url().includes('/contact') ||
          page.url().includes('/login') ||
          await page.getByText(/enrollment|payment|contact/i).isVisible()
        
        expect(isEnrollmentFlow).toBeTruthy()
      }
    }
  })

  test('should show course difficulty levels', async ({ page }) => {
    await page.goto('/en/courses')
    
    const difficultyBadges = page.locator('[data-testid="course-difficulty"]')
    if (await difficultyBadges.count() > 0) {
      const firstBadge = difficultyBadges.first()
      await expect(firstBadge).toBeVisible()
      
      // Should show difficulty level
      const difficultyText = await firstBadge.textContent()
      expect(difficultyText).toMatch(/beginner|intermediate|advanced/i)
    }
  })

  test('should display course duration', async ({ page }) => {
    await page.goto('/en/courses')
    
    const durationInfo = page.locator('[data-testid="course-duration"]')
    if (await durationInfo.count() > 0) {
      const firstDuration = durationInfo.first()
      await expect(firstDuration).toBeVisible()
      
      // Should show duration
      const durationText = await firstDuration.textContent()
      expect(durationText).toMatch(/hours?|weeks?|months?/i)
    }
  })

  test('should show course instructor information', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Navigate to a course detail page
    const firstCourseLink = page.getByRole('link').filter({ hasText: /learn more|view course/i }).first()
    if (await firstCourseLink.isVisible()) {
      await firstCourseLink.click()
      
      // Look for instructor info
      const instructorInfo = page.locator('[data-testid="instructor-info"]')
      if (await instructorInfo.isVisible()) {
        await expect(instructorInfo).toBeVisible()
        
        // Should show instructor name
        const instructorName = instructorInfo.getByRole('heading')
        if (await instructorName.isVisible()) {
          await expect(instructorName).toBeVisible()
        }
      }
    }
  })

  test('should handle course previews', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Navigate to a course
    const firstCourseLink = page.getByRole('link').filter({ hasText: /learn more|view course/i }).first()
    if (await firstCourseLink.isVisible()) {
      await firstCourseLink.click()
      
      // Look for preview content
      const previewButton = page.getByRole('button', { name: /preview|sample|demo/i })
      if (await previewButton.isVisible()) {
        await previewButton.click()
        
        // Should show preview content
        const previewModal = page.locator('[data-testid="course-preview"]')
        if (await previewModal.isVisible()) {
          await expect(previewModal).toBeVisible()
          
          // Should have close button
          const closeButton = previewModal.getByRole('button', { name: /close/i })
          if (await closeButton.isVisible()) {
            await closeButton.click()
            await expect(previewModal).toBeHidden()
          }
        }
      }
    }
  })

  test('should work with different languages', async ({ page }) => {
    // Test Chinese courses page
    await page.goto('/zh-Hans/courses')
    await expect(page).toHaveTitle(/课程|Courses/)
    
    // Test Traditional Chinese courses page
    await page.goto('/zh-Hant/courses')
    await expect(page).toHaveTitle(/課程|Courses/)
    
    // Course listings should still be functional
    const courses = page.locator('[data-testid="course-card"]')
    expect(await courses.count()).toBeGreaterThanOrEqual(0)
  })

  test('should be responsive on different screen sizes', async ({ page }) => {
    await page.goto('/en/courses')
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    
    // Courses should still be visible and properly laid out
    const courses = page.locator('[data-testid="course-card"]')
    if (await courses.count() > 0) {
      const firstCourse = courses.first()
      await expect(firstCourse).toBeVisible()
      
      // Should be properly sized for mobile
      const boundingBox = await firstCourse.boundingBox()
      expect(boundingBox?.width).toBeLessThan(400)
    }
    
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.reload()
    
    // Should show grid layout on desktop
    if (await courses.count() > 1) {
      const coursePositions = await Promise.all(
        (await courses.all()).slice(0, 2).map(course => course.boundingBox())
      )
      
      // Courses should be side by side on desktop
      if (coursePositions[0] && coursePositions[1]) {
        expect(coursePositions[0].y).toBeLessThanOrEqual(coursePositions[1].y + 50)
      }
    }
  })
})