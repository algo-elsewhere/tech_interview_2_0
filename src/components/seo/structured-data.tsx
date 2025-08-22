interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  // Ensure consistent JSON serialization
  const jsonLd = JSON.stringify(data, null, 0)
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
      suppressHydrationWarning
    />
  )
}