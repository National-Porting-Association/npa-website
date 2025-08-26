import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DiscordCard } from "@/components/discord-card"
import { Eye, Users, MessageSquare } from "lucide-react"

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans">Join Our Community</h1>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Connect with gamers and get exclusive sneak peeks of upcoming game ports
            </p>
          </div>

          <div className="mb-16 max-w-2xl mx-auto">
            <DiscordCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <CardTitle className="text-card-foreground font-sans">Exclusive Previews</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif mb-4">
                  Get first looks at upcoming game ports, behind-the-scenes content, and development updates before
                  anyone else.
                </CardDescription>
                <ul className="text-sm text-muted-foreground font-serif space-y-2">
                  <li>• Early gameplay footage</li>
                  <li>• Development progress updates</li>
                  <li>• Port announcement previews</li>
                  <li>• Technical showcases</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <CardTitle className="text-card-foreground font-sans">Gaming Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif mb-4">
                  Connect with fellow gamers, share experiences, and discover new web-based games in our community.
                </CardDescription>
                <ul className="text-sm text-muted-foreground font-serif space-y-2">
                  <li>• Game recommendations</li>
                  <li>• Screenshots and clips</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <CardTitle className="text-card-foreground font-sans">Support & Feedback</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif mb-4">
                  Get help with technical issues, report bugs, and share feedback to help us improve our games and
                  services.
                </CardDescription>
                <ul className="text-sm text-muted-foreground font-serif space-y-2">
                  <li>• Technical support</li>
                  <li>• Bug reports</li>
                  <li>• Feature requests</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
