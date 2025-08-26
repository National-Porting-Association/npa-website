import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Have a Port Idea?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
            Ask on our Discord server for a port of your favorite game.
          </p>
        </div>
      </div>
    </section>
  )
}
