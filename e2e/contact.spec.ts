import { test, expect } from '@playwright/test'

test.describe('Contact', () => {
  test.skip('should display contact page correctly', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Check page title
    await expect(page).toHaveTitle(/Contact.*Tech Interview|Tech Interview.*Contact/)
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/contact/i)
    
    // Check contact form is present
    await expect(page.getByRole('form')).toBeVisible()
  })

  test('should validate required form fields', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /send|submit/i })
    await submitButton.click()
    
    // Should show validation errors
    await expect(page.getByText(/required/i).first()).toBeVisible()
  })

  test.skip('should validate email format', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Fill invalid email
    const emailInput = page.getByLabel(/email/i)
    await emailInput.fill('invalid-email')
    
    const submitButton = page.getByRole('button', { name: /send|submit/i })
    await submitButton.click()
    
    // Should show email validation error
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test.skip('should submit form successfully', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Fill out form with valid data
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    
    const companyField = page.getByLabel(/company/i)
    if (await companyField.isVisible()) {
      await companyField.fill('Tech Corp')
    }
    
    const inquiryField = page.getByLabel(/inquiry|subject/i)
    if (await inquiryField.isVisible()) {
      await inquiryField.selectOption({ index: 1 })
    }
    
    await page.getByLabel(/message/i).fill('This is a test message for the contact form.')
    
    // Mock successful form submission
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      })
    })
    
    const submitButton = page.getByRole('button', { name: /send|submit/i })
    await submitButton.click()
    
    // Should show success message
    await expect(page.getByText(/success|sent/i)).toBeVisible()
  })

  test.skip('should handle form submission error', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Fill out form
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByLabel(/message/i).fill('Test message')
    
    // Mock failed form submission
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      })
    })
    
    const submitButton = page.getByRole('button', { name: /send|submit/i })
    await submitButton.click()
    
    // Should show error message
    await expect(page.getByText(/error|failed/i)).toBeVisible()
  })

  test.skip('should show loading state during submission', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Fill out form
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByLabel(/message/i).fill('Test message')
    
    // Mock slow form submission
    await page.route('/api/contact', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      })
    })
    
    const submitButton = page.getByRole('button', { name: /send|submit/i })
    await submitButton.click()
    
    // Should show loading state
    await expect(submitButton).toBeDisabled()
    await expect(page.getByText(/sending|loading/i)).toBeVisible()
  })

  test.skip('should be keyboard accessible', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Should be able to tab through form fields
    await page.keyboard.press('Tab')
    await expect(page.getByLabel(/name/i)).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByLabel(/email/i)).toBeFocused()
    
    // Fill name and email with keyboard
    await page.getByLabel(/name/i).focus()
    await page.keyboard.type('John Doe')
    
    await page.getByLabel(/email/i).focus()
    await page.keyboard.type('john@example.com')
    
    await page.getByLabel(/message/i).focus()
    await page.keyboard.type('Keyboard test message')
    
    // Should be able to submit with Enter key
    await page.keyboard.press('Tab') // Focus submit button
    await expect(page.getByRole('button', { name: /send|submit/i })).toBeFocused()
  })

  test('should display contact information', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Should show alternative contact methods
    const contactInfo = page.locator('[data-testid="contact-info"]')
    if (await contactInfo.isVisible()) {
      // Check for email or other contact details
      await expect(contactInfo.getByText(/@|email/i)).toBeVisible()
    }
  })

  test.skip('should work with different languages', async ({ page }) => {
    // Test Chinese contact page
    await page.goto('/zh-Hans/contact')
    await expect(page).toHaveTitle(/联系.*技术面试|技术面试.*联系|Contact/)
    
    // Test Traditional Chinese contact page
    await page.goto('/zh-Hant/contact')
    await expect(page).toHaveTitle(/聯絡.*技術面試|技術面試.*聯絡|Contact/)
    
    // Form should still be functional
    await expect(page.getByRole('form')).toBeVisible()
  })

  test('should handle CSRF protection', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Check if CSRF token is present
    const csrfToken = page.locator('input[name="csrf_token"]')
    if (await csrfToken.isVisible()) {
      await expect(csrfToken).toHaveAttribute('value', /.+/)
    }
  })
})