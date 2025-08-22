import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import AboutPage from '../page'

// Mock the async metadata function
vi.mock('../page', async (importOriginal) => {
  const actual = await importOriginal() as any
  return {
    ...actual,
    generateMetadata: vi.fn().mockResolvedValue({
      title: 'About Us | Tech Interview Consultant',
      description: 'Learn about our mission to help engineers succeed in technical interviews.'
    })
  }
})

describe('About Page', () => {
  it('should render hero section correctly', () => {
    render(<AboutPage />)
    
    // Check main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Empowering Engineers/)
    
    // Check hero description
    expect(screen.getByText(/With over a decade of experience/)).toBeInTheDocument()
    
    // Check hero badges
    expect(screen.getByText('10+ Years Experience')).toBeInTheDocument()
    expect(screen.getByText('500+ Companies')).toBeInTheDocument()
    expect(screen.getByText('10K+ Students')).toBeInTheDocument()
  })

  it('should render story section', () => {
    render(<AboutPage />)
    
    // Check story heading
    expect(screen.getByRole('heading', { name: /Our Story/i })).toBeInTheDocument()
    
    // Check story content
    expect(screen.getByText(/Tech Interview Consultant was founded in 2014/)).toBeInTheDocument()
    expect(screen.getByText(/Over the years, we've worked with engineers/)).toBeInTheDocument()
    expect(screen.getByText(/Today, our alumni work at companies/)).toBeInTheDocument()
  })

  it('should render expertise section with all areas', () => {
    render(<AboutPage />)
    
    // Check expertise heading
    expect(screen.getByRole('heading', { name: /Our Areas of Expertise/i })).toBeInTheDocument()
    
    // Check all expertise areas
    expect(screen.getByRole('heading', { name: /Algorithms & Data Structures/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /System Design/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /GenAI & ML Engineering/i })).toBeInTheDocument()
    
    // Check expertise descriptions
    expect(screen.getByText(/Master coding interviews with proven strategies/)).toBeInTheDocument()
    expect(screen.getByText(/Learn to architect scalable systems/)).toBeInTheDocument()
    expect(screen.getByText(/Stay ahead with cutting-edge AI skills/)).toBeInTheDocument()
  })

  it('should render achievements section with statistics', () => {
    render(<AboutPage />)
    
    // Check achievements heading
    expect(screen.getByRole('heading', { name: /Our Impact/i })).toBeInTheDocument()
    
    // Check statistics
    expect(screen.getByText('500+')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('10+')).toBeInTheDocument()
    
    // Check statistic labels
    expect(screen.getByText('Students Helped')).toBeInTheDocument()
    expect(screen.getByText('Success Rate')).toBeInTheDocument()
    expect(screen.getByText('Partner Companies')).toBeInTheDocument()
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
  })

  it('should render philosophy section', () => {
    render(<AboutPage />)
    
    // Check philosophy heading
    expect(screen.getByRole('heading', { name: /Our Philosophy/i })).toBeInTheDocument()
    
    // Check philosophy quote
    expect(screen.getByText(/Success in technical interviews isn't just about knowing algorithms/)).toBeInTheDocument()
    
    // Check philosophy description
    expect(screen.getByText(/We believe that with the right guidance/)).toBeInTheDocument()
  })

  it('should render CTA section with buttons', () => {
    render(<AboutPage />)
    
    // Check CTA heading
    expect(screen.getByRole('heading', { name: /Ready to Start Your Journey/i })).toBeInTheDocument()
    
    // Check CTA description
    expect(screen.getByText(/Join thousands of engineers who have transformed/)).toBeInTheDocument()
    
    // Check CTA buttons
    const contactButton = screen.getByRole('link', { name: /Get in Touch/i })
    const coursesButton = screen.getByRole('link', { name: /View Courses/i })
    
    expect(contactButton).toBeInTheDocument()
    expect(coursesButton).toBeInTheDocument()
    
    // Check button links
    expect(contactButton).toHaveAttribute('href', '/en/contact')
    expect(coursesButton).toHaveAttribute('href', '/en/courses')
  })

  it('should render hero section with placeholder', () => {
    render(<AboutPage />)
    
    // Check for hero content placeholder
    const heroSection = screen.getByText('Tech Interview Consultant team')
    expect(heroSection).toBeInTheDocument()
  })

  it('should have proper semantic structure', () => {
    render(<AboutPage />)
    
    // Check main element
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    // Check multiple sections
    const sections = screen.getAllByRole('generic') // sections are generic landmarks
    expect(sections.length).toBeGreaterThan(5) // Should have multiple sections
    
    // Check heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    const h2s = screen.getAllByRole('heading', { level: 2 })
    const h3s = screen.getAllByRole('heading', { level: 3 })
    
    expect(h1).toBeInTheDocument()
    expect(h2s.length).toBeGreaterThanOrEqual(4) // Should have multiple h2s
    expect(h3s.length).toBeGreaterThanOrEqual(3) // Should have h3s for expertise areas
  })

  it('should work with different locales', () => {
    // Test with Chinese locale
    render(<AboutPage />, { locale: 'zh-Hans' })
    
    // Should render with Chinese translations
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/赋能工程师/)
    expect(screen.getByText('10年以上经验')).toBeInTheDocument()
    expect(screen.getByText('500家以上公司')).toBeInTheDocument()
    expect(screen.getByText('1万名以上学生')).toBeInTheDocument()
  })

  it('should have accessible color contrast and styling', () => {
    render(<AboutPage />)
    
    // Check that text elements have proper styling classes
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveClass('text-4xl', 'lg:text-5xl', 'font-bold')
    
    // Check that CTA buttons have proper styling
    const contactButton = screen.getByRole('link', { name: /Get in Touch/i })
    expect(contactButton).toHaveClass('bg-white', 'text-primary')
    
    const coursesButton = screen.getByRole('link', { name: /View Courses/i })
    expect(coursesButton).toHaveClass('border-2', 'border-white')
  })
})