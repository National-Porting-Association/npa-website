import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe, Gamepad2, Zap } from "lucide-react"

const gamingSites = [
  {
    name: "gn-math",
    description: "Play unbl*cked games like Crazy Cattle 3D and DriveMad on GN-Math. Fast, free, no downloads—perfect for school or home.",
    url: "https://gn-math.github.io/",
    category: "Gaming",
    icon: <Gamepad2 className="w-6 h-6" />,
  },
    {
    name: "Truffled",
    description: "Truffled, the best game site you can ever use.",
    url: "https://truffled.lol/",
    category: "Gaming",
    icon: <Gamepad2 className="w-6 h-6" />,
  }
]

export default function SitesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans">Gaming Sites</h1>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Discover platforms that host our web ports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gamingSites.map((site, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{site.icon}</div>
                    <div>
                      <CardTitle className="text-lg font-sans group-hover:text-primary transition-colors">
                        {site.name}
                      </CardTitle>
                      <div className="text-xs text-muted-foreground font-serif bg-muted px-2 py-1 rounded-full inline-block">
                        {site.category}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-serif mb-4 text-sm leading-relaxed">
                    {site.description}
                  </CardDescription>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
