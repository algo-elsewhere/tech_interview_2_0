import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText('Tech Interview Consultant')).toBeInTheDocument()
    expect(screen.getByText('Welcome to your interview preparation platform.')).toBeInTheDocument()
  })
})