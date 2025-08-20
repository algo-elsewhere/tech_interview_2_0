import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Tech Interview Consultant
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Expert preparation for algorithms, system design, and GenAI interviews
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Algorithms</CardTitle>
              <CardDescription>Master coding interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive preparation for coding challenges and algorithm problems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Design</CardTitle>
              <CardDescription>Scale with confidence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn to design robust, scalable systems for senior-level interviews.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GenAI Expertise</CardTitle>
              <CardDescription>Future-ready skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay ahead with AI/ML interview preparation and modern practices.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Get the latest interview tips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter your email" type="email" />
            <Button className="w-full">Subscribe</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}