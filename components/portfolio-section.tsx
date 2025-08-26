import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PortfolioSection() {
  const projects = [
    {
      title: "Strategy Empire",
      description: "Complex RTS game successfully ported with full multiplayer support",
      image: "/strategy-game-scene.png",
      status: "Live",
    },
    {
      title: "Pixel Adventures",
      description: "Indie platformer with perfect pixel-perfect rendering on web",
      image: "/pixel-art-platformer.png",
      status: "Live",
    },
    {
      title: "Racing Thunder",
      description: "High-performance racing game with 60fps web gameplay",
      image: "/racing-game-screenshot.png",
      status: "In Progress",
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
            Showcasing our successful game porting achievements
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-card-foreground font-sans">{project.title}</CardTitle>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === "Live"
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif mb-4">{project.description}</CardDescription>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
