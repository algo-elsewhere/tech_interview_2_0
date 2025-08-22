import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@/lib/test-utils'
import { userEvent } from '@/lib/test-utils'
import { ContactForm } from '../contact-form'

// Mock the tracking hook
vi.mock('@/hooks/use-tracking', () => ({
  useTracking: () => ({
    trackForm: vi.fn(),
  }),
}))

describe('ContactForm', () => {
  it('should render all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/inquiry type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('should show validation errors for required fields', async () => {
    const user = await userEvent()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  it('should validate email format', async () => {
    const user = await userEvent()
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })

  it('should accept valid form data', async () => {
    const user = await userEvent()
    render(<ContactForm />)

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/company/i), 'Tech Corp')
    await user.selectOptions(screen.getByLabelText(/inquiry type/i), 'consultation')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/sending/i)).toBeInTheDocument()
    })
  })

  it('should handle successful form submission', async () => {
    const user = await userEvent()
    
    // Mock successful API response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<ContactForm />)

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })
  })

  it('should handle form submission error', async () => {
    const user = await userEvent()
    
    // Mock API error
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' }),
    })

    render(<ContactForm />)

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
    })
  })

  it('should reset form after successful submission', async () => {
    const user = await userEvent()
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)

    // Fill out the form
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })

    // Form should be reset
    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(messageInput).toHaveValue('')
  })

  it('should disable submit button when form is submitting', async () => {
    const user = await userEvent()
    
    // Mock slow API response
    global.fetch = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      }), 1000))
    )

    render(<ContactForm />)

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Button should be disabled while submitting
    expect(submitButton).toBeDisabled()
  })

  it('should be keyboard accessible', async () => {
    const user = await userEvent()
    render(<ContactForm />)

    // Should be able to tab through form fields
    await user.tab()
    expect(screen.getByLabelText(/name/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/email/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/company/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/inquiry type/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/message/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: /send message/i })).toHaveFocus()
  })

  it('should work with different locales', () => {
    render(<ContactForm />, { locale: 'zh-Hans' })

    // Should render Chinese labels (assuming they exist in messages)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})