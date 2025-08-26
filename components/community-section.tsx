import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Join Our Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
            Connect with developers, gamers, and industry professionals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">Developer Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-serif mb-4">
                Technical discussions, best practices, and collaboration opportunities for game developers.
              </CardDescription>
              <Button variant="outline" className="w-full bg-transparent">
                Join Forum
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">Gaming Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-serif mb-4">
                Connect with fellow gamers, share experiences, and discover new web-based games.
              </CardDescription>
              <Button variant="outline" className="w-full bg-transparent">
                Join Community
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-serif mb-4">
                Stay updated with the latest porting technologies, industry news, and project announcements.
              </CardDescription>
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">Subscribe</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
