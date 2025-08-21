import { render, screen } from '@/lib/test-utils'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders homepage content', () => {
    render(<HomePage />)
    expect(screen.getByText('Tech Interview Consultant')).toBeInTheDocument()
    expect(screen.getByText('Expert preparation for algorithms, system design, and GenAI interviews')).toBeInTheDocument()
  })

  it('renders service cards', () => {
    render(<HomePage />)
    expect(screen.getByText('Algorithms')).toBeInTheDocument()
    expect(screen.getByText('System Design')).toBeInTheDocument()
    expect(screen.getByText('GenAI Expertise')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<HomePage />)
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument()
  })

  it('renders email subscription form', () => {
    render(<HomePage />)
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })
})